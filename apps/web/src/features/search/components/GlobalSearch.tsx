/**
 * @file apps/web/src/features/search/components/GlobalSearch.tsx
 * @purpose Wrapper for the CommandPalette with data logic.
 * @interface Search interface
 * @phase 7
 */
import React from 'react';
import { CommandPalette } from '@limeaura/ui';
// import { useQuery } from '@tanstack/react-query';

// const fetchSearchResults = async (query: string) => {
//   // const results = await apiClient.get('/search', { params: { q: query } });
//   // return results;
//   return [
//     { id: 't-1', title: 'Task 1', group: 'Tasks' },
//     { id: 'p-1', title: 'Project LimeAura', group: 'Projects' },
//   ];
// };

export interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  isOpen,
  onClose,
}) => {
  // const [query, setQuery] = useState('');
  // const { data: results } = useQuery({
  //   queryKey: ['search', query],
  //   queryFn: () => fetchSearchResults(query),
  //   enabled: query.length > 1,
  // });

  // This component will just render the UI component for now.
  // Data logic will be wired up in Phase 8/9.
  return <CommandPalette isOpen={isOpen} onClose={onClose} />;
};
