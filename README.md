## CRUD API

Task is to implement simple CRUD API using in-memory database underneath.

### Getting Started

#### Installation

1. Clone this repository:

```ruby
git clone <repository-url>
```

2. Navigate to the project directory and switch to `development` branch:

```ruby
git checkout development
```

3. Install the dependencies:

```ruby
npm install
```

#### Configuration

##### Running the server

- To start the server in development mode, run:

```ruby
npm run start:dev
```

- To start the server in production mode, run:

```ruby
npm run start:prod
```

The server will be running on `http://localhost:{port}`.

##### API Endpoints

* **GET** `api/users` is used to get all persons
  - Server should answer with status code 200 and all users records
* **GET** `api/users/{userId}`
  - Server should answer with status code 200 and record with id === userId if it exists
  - Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  - Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
* **POST** `api/users` is used to create record about new user and store it in database
  - Server should answer with status code 201 and newly created record
  - Server should answer with status code 400 and corresponding message if request body does not contain required fields
* **PUT** `api/users/{userId}` is used to update existing user
  - Server should answer with status code 200 and updated record
  - Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  - Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
* **DELETE** `api/users/{userId}` is used to delete existing user from database
  - Server should answer with status code 204 if the record is found and deleted
  - Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  - Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

##### Running Tests

```ruby
npm run test
```