# **LimeAura API Documentation**

## **Overview**

This document outlines the REST API endpoints available in the LimeAura platform. All API requests must be authenticated using a Bearer token.

**Base URL:** https://api.limeaura.com/api/v1

## **Authentication**

### **Login**

Authenticates a user and returns an access token.

* **Endpoint:** POST /auth/login  
* **Body:**  
  {  
    "email": "user@example.com",  
    "password": "securepassword"  
  }

* **Response:**  
  {  
    "accessToken": "jwt\_token\_string",  
    "refreshToken": "refresh\_token\_string",  
    "user": { ... }  
  }

## **Tasks**

### **List Tasks**

Retrieves a paginated list of tasks.

* **Endpoint:** GET /tasks  
* **Query Parameters:**  
  * page: Page number (default: 1\)  
  * limit: Items per page (default: 20\)  
  * status: Filter by status (e.g., todo, in\_progress)  
  * assignee\_id: Filter by user ID  
* **Response:**  
  {  
    "data": \[  
      {  
        "id": "uuid",  
        "title": "Task Title",  
        "status": "todo",  
        ...  
      }  
    \],  
    "meta": {  
      "current\_page": 1,  
      "total\_pages": 5,  
      "total\_items": 100  
    }  
  }

### **Create Task**

Creates a new task.

* **Endpoint:** POST /tasks  
* **Body:**  
  {  
    "project\_id": "uuid",  
    "title": "New Task",  
    "priority": "high"  
  }

### **Update Task**

Updates an existing task.

* **Endpoint:** PATCH /tasks/:id  
* **Body:** (Partial Task object)

### **Delete Task**

Deletes a task (soft delete).

* **Endpoint:** DELETE /tasks/:id

## **Projects**

### **Get Project Details**

* **Endpoint:** GET /projects/:id

## **Error Handling**

The API returns standard HTTP status codes:

* 200: Success  
* 400: Bad Request (Validation error)  
* 401: Unauthorized (Invalid/missing token)  
* 403: Forbidden (Insufficient permissions)  
* 404: Not Found  
* 500: Internal Server Error

Error Response Format:

{  
  "errors": \[  
    {  
      "status": 400,  
      "code": "validation\_error",  
      "title": "Invalid Input",  
      "detail": "Email is required."  
    }  
  \]  
}  
