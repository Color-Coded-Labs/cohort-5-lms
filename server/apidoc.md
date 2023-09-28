# API Documentation

Local IP

- localhost:8000/api/v1.0

Production Server

- https://cohort-5-lms.onrender.com/api/v1/

## Users

### Register a User

**Method:** `POST`

**Path:** `/users/register`

**Request Body:**

```json
{
  "username": "exampleUser",
  "password": "examplePassword"
}
```

**Responses:**

- 200 (Success)
  - Description: User registered successfully
- 400 (Bad Request)
  - Description: Username already exists
- 500 (Internal Server Error)
  - Description: Internal server error

### Login as a User

**Method:** POST

**Path:** /users/login

**Request Body:**

```json
{
  "username": "exampleUser",
  "password": "examplePassword"
}
```

**Responses:**

- 200 (Success)
  - Description: Logged in successfully

**Body:**

```json
{
  "message": "Logged in successfully",
  "userId": "user_id_here"
}
```

- 400 (Bad Request)
  - Description: Invalid username or password
- 500 (Internal Server Error)
  - Description: Internal server error

### Update User

**Method:** PUT

**Path:** /users/:userId

**Parameters:**

- userId (string): The ID of the user to update.

**Request Body:**

```json
{
  "username": "newUsername",
  "password": "newPassword"
}
```

**Responses:**

- 200 (Success)
  - Description: User updated successfully
- 400 (Bad Request)
  - Description: Send both username and password
- 404 (Not Found)
  - Description: User not found
- 500 (Internal Server Error)
  - Description: Internal server error

### Delete User

**Method:** DELETE

**Path:** /users/:userId

**Parameters:**

- userId (string): The ID of the user to delete.

**Responses:**

- 200 (Success)
  - Description: User successfully deleted
- 404 (Not Found)
  - Description: User not found
- 500 (Internal Server Error)
  - Description: Internal server error

### Get All Users

**Method:** GET

**Path:** /users

**Responses:**

- 200 (Success)
  - Description: A list of users
- 404 (Not Found)
  - Description: No users found
- 500 (Internal Server Error)
  - Description: Internal server error

## Topics

### Create a New Topic

**Method:** POST

**Path:** /topics/create

**Request Body:**

```json
{
  "courseName": "exampleCourseName",
  "title": "exampleTopicTitle",
  "content": "exampleTopicContent"
}
```

**Responses:**

- 200 (Success)
  - Description: Topic added successfully
- 404 (Not Found)
  - Description: Course not found
- 500 (Internal Server Error)
  - Description: Internal server error

### Get All Topics

**Method:** GET

**Path:** /topics

**Responses:**

- 200 (Success)
  - Description: A list of topics
- 500 (Internal Server Error)
  - Description: Internal server error

### Get One Topic

**Method:** GET

**Path:** /topics/:topicId

**Parameters:**

- topicId (string): The ID of the topic to retrieve.

**Responses:**

- 200 (Success)
  - Description: The topic with the specified ID
- 500 (Internal Server Error)
  - Description: Internal server error

### Update Topic

**Method:** PUT

**Path:** /topics/:courseId/:topicId

**Parameters:**

- courseId (string): The ID of the course containing the topic.

- topicId (string): The ID of the topic to update.

**Request Body:**

```json
{
  "title": "newTopicTitle",
  "description": "newTopicDescription"
}
```

**Responses:**

- 200 (Success)
  - Description: Topic updated successfully
- 404 (Not Found)
  - Description: Course or topic not found
- 500 (Internal Server Error)
  - Description: Internal server error

### Delete Topic

**Method:** DELETE

**Path:** /topics/:courseId/:topicId

**Parameters:**

- courseId (string): The ID of the course containing the topic.
- topicId (string): The ID of the topic to delete.

**Responses:**

- 200 (Success)
  - Description: Topic successfully deleted
- 404 (Not Found)
  - Description: Course or topic not found
- 500 (Internal Server Error)
  - Description: Internal server error

## Courses

### Create a New Course

**Method:** POST

**Path:** /courses/create

**Request Body:**

```json
{
  "title": "exampleCourseTitle",
  "description": "exampleCourseDescription"
}
```

**Responses:**

- 200 (Success)
  - Description: The created course
- 400 (Bad Request)
  - Description: Please include a title and description
- 500 (Internal Server Error)
  - Description: Internal server error

### Get One Course

**Method:** GET

**Path:** /courses/:courseId

**Parameters:**

- courseId (string): The ID of the course to retrieve.

**Responses:**

- 200 (Success)
  - Description: The course with the specified ID
- 500 (Internal Server Error)
  - Description: Internal server error

### Get All Courses

**Method:** GET

**Path:** /courses

**Responses:**

- 200 (Success)
  - Description: A list of courses
- 500 (Internal Server Error)
  - Description: Internal server error

### Update Course

**Method:** PUT

**Path:** /courses/:courseId

**Parameters:**

- courseId (string): The ID of the course to update.

**Request Body:**

```json
{
  "title": "newCourseTitle",
  "description": "newCourseDescription",
  "topics": [
    {
      "title": "newTopicTitle",
      "description": "newTopicDescription"
    }
  ]
}
```

**Responses:**

- 200 (Success)
  - Description: Course updated successfully
- 400 (Bad Request)
  - Description: Please include a title, description, and topics
- 404 (Not Found)
  - Description: Course not found
- 500 (Internal Server Error)
  - Description: Internal server error

### Delete Course

**Method:** DELETE

**Path:** /courses/:courseId

**Parameters:**

- courseId (string): The ID of the course to delete.

**Responses:**

- 200 (Success)
  - Description: Course successfully deleted
- 404 (Not Found)
  - Description: Course not found
- 500 (Internal Server Error)
  - Description: Internal server error
