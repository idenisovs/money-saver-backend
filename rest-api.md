# REST API

## Auth

* `GET /api/auth` - request the user authentication information.
    * Response: `{ "user": {...} | null }`
* `POST /api/auth` - try to authenticate.
    * `Content-Type: application/json` 
    * `{ "username": "aaa", "password": "bbb" }`

