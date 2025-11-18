LimeAura API DocumentationOverviewThis document outlines the REST API endpoints available in the LimeAura platform. All API requests must be authenticated using a Bearer token.Base URL: https://api.limeaura.com/api/v1AuthenticationLoginAuthenticates a user and returns an access token.Endpoint: POST /auth/loginBody:{
  "email": "user@example.com",
  "password": "securepassword"
}
Response:{
  "accessToken": "jwt_token_string",
  "refreshToken": "refresh_token_string",
  "user": { ... }
}
TasksList TasksRetrieves a paginated list of tasks.Endpoint: GET /tasksQuery Parameters:page: Page number (default: 1)limit: Items per page (default: 20)status: Filter by status (e.g., todo, in_progress)assignee_id: Filter by user IDResponse:{
  "data": [
    {
      "id": "uuid",
      "title": "Task Title",
      "status": "todo",
      ...
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 100
  }
}
Create TaskCreates a new task.Endpoint: POST /tasksBody:{
  "project_id": "uuid",
  "title": "New Task",
  "priority": "high"
}
Update TaskUpdates an existing task.Endpoint: PATCH /tasks/:idBody: (Partial Task object)Delete TaskDeletes a task (soft delete).Endpoint: DELETE /tasks/:idProjectsGet Project DetailsEndpoint: GET /projects/:idError HandlingThe API returns standard HTTP status codes:200: Success400: Bad Request (Validation error)401: Unauthorized (Invalid/missing token)403: Forbidden (Insufficient permissions)404: Not Found500: Internal Server ErrorError Response Format:{
  "errors": [
    {
      "status": 400,
      "code": "validation_error",
      "title": "Invalid Input",
      "detail": "Email is required."
    }
  ]
}
