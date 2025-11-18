/**
 * @file apps/web/src/features/tasks/hooks/useTasks.ts
 * @purpose Hook for fetching and mutating task data.
 * @interface Task data management
 * @phase 7
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@limeaura/api-client';
import { Task, ApiListResponse, CreateTaskDTO, UpdateTaskDTO } from '@limeaura/types';

// --- Query Keys ---
const TASK_QUERY_KEYS = {
  all: ['tasks'] as const,
  lists: () => [...TASK_QUERY_KEYS.all, 'list'] as const,
  list: (filters: any) => [...TASK_QUERY_KEYS.lists(), filters] as const,
  details: () => [...TASK_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...TASK_QUERY_KEYS.details(), id] as const,
};

// --- API Functions ---
const fetchTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get<ApiListResponse<Task>>('/tasks');
  return response.data;
};

const createTask = async (task: CreateTaskDTO): Promise<Task> => {
  const response = await apiClient.post<Task>('/tasks', task);
  return response;
};

const updateTask = async (
  id: string,
  updates: UpdateTaskDTO
): Promise<Task> => {
  const response = await apiClient.patch<Task>(`/tasks/${id}`, updates);
  return response;
};

// --- React Query Hooks ---

/**
 * Fetches a list of tasks.
 */
export function useTasks(filters?: any) {
  return useQuery<Task[], Error>({
    queryKey: TASK_QUERY_KEYS.list(filters || {}),
    queryFn: () => fetchTasks(), // TODO: Pass filters to fetchTasks
  });
}

/**
 * Creates a new task.
 */
export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, CreateTaskDTO>({
    mutationFn: createTask,
    onSuccess: () => {
      // Invalidate and refetch all task lists
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.lists() });
    },
    // TODO: Add optimistic updates
  });
}

/**
 * Updates an existing task.
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, { id: string; updates: UpdateTaskDTO }>({
    mutationFn: ({ id, updates }) => updateTask(id, updates),
    onSuccess: (updatedTask) => {
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.lists() });
      // Update the specific task in cache
      queryClient.setQueryData(
        TASK_QUERY_KEYS.detail(updatedTask.id),
        updatedTask
      );
    },
    // TODO: Add optimistic updates
  });
}
