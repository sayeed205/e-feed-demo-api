# efeed API demo

A RESTful API for demonstrating express, mongodb, and jwt.

### Demo API URL

https://e-feed.onrender.com

## Requirements

-   [Node.js](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/en/)
-   [MongoDB](https://www.mongodb.com/)
-   [Postman](https://www.getpostman.com/) (optional)

## Getting Started

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/sayeed205/e-feed-demo-api.git
cd efeed-api-demo
yarn
```

## Environment Variables

The following environment variables need to be set:

-   `PORT`: The port number on which the server will run.
-   `MONGO_URI`: The URI of the MongoDB instance.
-   `NODE_ENV`: The environment the server is running in (`production` or `development`).
-   `BACKEND_URL`: The base URL of the backend.
-   `JWT_SECRET`: The secret key to sign and verify JSON Web Tokens.
    Sure, here's the updated table:

| HTTP Method | Endpoint         | Description                             | Request Body                                                                                                                                      | Query Parameters                                                                                                                                                                                                                                                            | Response                                                                                                                                                                        |
| ----------- | ---------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST        | /api/auth/signup | Registers a new user.                   | `email` (string): The user's email.<br>`password` (string): The user's password.                                                                  |                                                                                                                                                                                                                                                                             | `ok` (boolean): Whether the operation was successful.<br>`data` (object): An object containing:<br> `msg` (string): A message indicating the operation was successful.          |
| POST        | /api/auth/login  | Authenticates a user and returns a JWT. | `email` (string): The user's email.<br>`password` (string): The user's password.                                                                  |                                                                                                                                                                                                                                                                             | `ok` (boolean): Whether the operation was successful.<br>`data` (object): An object containing:<br> `user` (object): The user object.<br> `token` (string): The JSON Web Token. |
| GET         | /api/books       | Retrieves a list of books.              |                                                                                                                                                   | `page` (number): The page number. Defaults to 1.<br>`limit` (number): The number of items per page. Defaults to 10.<br>`q` (string): The search query. Defaults to an empty string. If set then it will search for books containing the query by author email or book title | `ok` (boolean): Whether the operation was successful.<br>`data` (array): Contains the paginated list of books.                                                                  |
| POST        | /api/books       | Adds a new book to the database.        | `title` (string): The book's title.<br>`description` (string): The book's description.                                                            |                                                                                                                                                                                                                                                                             | `ok` (boolean): Whether the operation was successful.<br>`data` (object): An object containing:<br> `msg` (string): A message indicating the operation was successful.          |
| PUT         | /api/books/:id   | Updates a book in the database.         | At least one of the following fields should be present:<br>`title` (string): The book's title.<br>`description` (string): The book's description. |                                                                                                                                                                                                                                                                             | `ok` (boolean): Whether the operation was successful.<br>`data` (object): An object containing:<br> `msg` (string): A message indicating the operation was successful.          |
| DELETE      | /api/books/:id   | Deletes a book from the database.       |                                                                                                                                                   |                                                                                                                                                                                                                                                                             | `ok` (boolean): Whether the operation was successful.<br>`data` (object): An object containing:<br> `msg` (string): A message indicating the operation was successful.          |

## Running the Server

To start the dev server, run:

```bash
yarn run dev
```

## License

[MIT](LICENSE)
