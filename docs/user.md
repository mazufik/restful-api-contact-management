# User API Specification

## Register User API

Endpoint : `POST /api/users`

Request Body :

```json
{
  "username": "user1",
  "password": "secret",
  "name": "User Programmer"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "user1",
    "name": "User Programmer"
  }
}
```

Response Body Error :

```json
{
  "error": "Username already registered"
}
```

## Login User API

Endpoint : `POST /api/users/Login`

Request Body :

```json
{
  "username": "user1",
  "password": "secret"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "error": "Username or password wrong"
}
```

## Update User API

Endpoint : `PATCH /api/users/current`

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "User Programmer Baru", // optional
  "password": "new password" // optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "user1",
    "name": "User Programmer Baru"
  }
}
```

Response Body Error :

```json
{
  "error": "Name length max 100"
}
```

## Get User API

Endpoint : `GET /api/users/current`

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "user1",
    "name": "User Programmer"
  }
}
```

Response Body Error :

```json
{
  "error": "Unauthorized"
}
```

## Logout User API

Endpoint : `DELETE /api/users/logout`

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "error": "Unauthorized"
}
```
