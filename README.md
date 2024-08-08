[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15508280&assignment_repo_type=AssignmentRepo)
# Individual Project Phase 2

# Individual Project Naufaldillah (World Wide of Football News) API Documentation

## Endpoints

List of available endpoints:

### Users
- `POST /add-user`
- `POST /login`
- `POST /google-login`
- `PATCH /user-upload`

### Articles

- `GET /articles`
- `GET /articles/:ArticleId`

### Bookmakrs
- `POST /bookmarks`
- `GET /bookmarks`
- `GET /bookmakrs/user`
- `DELETE /bookmarks/:ArticleId`

## 1. POST /add-user

Description:
- Creating a new user with full name, email, and password as the request body

Request:

- body:
```json
{
    "fullname": "string",
    "email": "string",
    "password": "string",
}
```

_Response (201 - Created)_
```json
{
    "id": "integer",
    "fullname": "string",
    "email": "string",
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "Name is Required"
}
OR
{
    "message": "Email is Required"
}
OR
{
    "message": "Invalid Email Format"
}
OR
{
    "message": "The Email is Already in Use"
}
OR
{
    "message": "Password is Required"
}
OR
{
    "message": "Minimum Password Length is 4"
}
```

## 2. POST /login

Description:
- Creating access token for login.

Request:

- body:
```json
{
    "email": "string",
    "password": "string",
}
```

_Response (201 - Created)_
```json
{
    "access_token": "string",
    "fullname": "string",
    "imageUrl": "string",
}
```

Response (400 - Bad Request)_
```json
{
    "message": "Email is Required"
}
OR
{
    "message": "Password is Required"
}
```

_Response (401 - Unauthorized)_
```json
{
    "message": "Email or Password is Inavlid"
}
```

## 3. POST /google

Description:
- Creating access token for login via Google sign in, if there's no account available. It will create one.

Request:

- headers:
```json
{
    "google_token": "string"
}
```

_Response (201 - Created)_
```json
{
    "access_token": "string",
    "fullname": "string",
    "imageUrl": "string",
}
```

Response (400 - Bad Request)_
```json
{
    "message": "Email is already registered"
}
```

## 4. PATCH /user-upload

Description:
- Upload User Profile Image.

- headers:
```json
{
    "access_token": "string"
}
```

- body:
```json
{
    "image": "image"
}
```

_Response (200 - OK)_

```json
{
    "message": "User Image success to update",
    "uploadedImage": "string"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Cannot read properties of undefined (reading 'buffer')",
}
```

## 5. PUT /bookmarks

Description:
- Creating a new bookmark.

- headers:
```json
{
    "access_token": "string"
}
```

- body:
```json
{
    "Article_Id": "string"
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "UserId": "integer",
    "ArticleId": "string"
}
```

Response (400 - Bad Request)_
```json
{
    "message": "Article ID is Required"
}
```

## 6. GET /bookmarks

Description:
- Fetching all bookmarked articles from newsData.io.

- headers:
```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "status": "success",
    "totalResults": 20626,
    "results": [
        {
            "article_id": "string",
            "title": "string",
            "link": "string",
            "keywords": [
                "string"
            ],
            "creator": [
                "string"
            ],
            "video_url": "string",
            "description": "string",
            "content": "string",
            "pubDate": "date",
            "image_url": "string",
            "source_id": "string",
            "source_priority": "integer",
            "source_name": "string",
            "source_url": "string",
            "source_icon": "string",
            "language": "string",
            "country": [
                "string"
            ],
            "category": [
                "string"
            ],
            "ai_tag": "string",
            "sentiment": "string",
            "sentiment_stats": "string",
            "ai_region": "string",
            "ai_org": "string",
            "duplicate": "boolean"
        }
        ...
    ],
    "nextpage": "longInteger"
}
```

_Response (422 - Unprocessable Entity)_

```json
{
  "message": "Unprocessable Entity"
}
```

_Response (429 - Too Many Request)_

```json
{
  "message": "Too Many Request"
}
```

## 7. GET /bookmarks/user

Description:
- Fetching all boomarks data from logged in user.

- headers:

```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "UserId": "integer",
        "ArticleId": "string"
    }
    ...
]
```

## 8. DELETE /bookmarks/:ArticleId

Description:
- Delete bookmark from database.

- headers:

```json
{
    "access_token": "string"
}
```

- params:

```json
{
    "ArticleId": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Bookmark Success to Delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## 9. GET /articles

Description:
- Fetching the latest articles from newsData.io.

- headers:
```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "status": "success",
    "totalResults": 20626,
    "results": [
        {
            "article_id": "string",
            "title": "string",
            "link": "string",
            "keywords": [
                "string"
            ],
            "creator": [
                "string"
            ],
            "video_url": "string",
            "description": "string",
            "content": "string",
            "pubDate": "date",
            "image_url": "string",
            "source_id": "string",
            "source_priority": "integer",
            "source_name": "string",
            "source_url": "string",
            "source_icon": "string",
            "language": "string",
            "country": [
                "string"
            ],
            "category": [
                "string"
            ],
            "ai_tag": "string",
            "sentiment": "string",
            "sentiment_stats": "string",
            "ai_region": "string",
            "ai_org": "string",
            "duplicate": "boolean"
        }
        ...
    ],
    "nextpage": "longInteger"
}
```

_Response (422 - Unprocessable Entity)_

```json
{
  "message": "Unprocessable Entity"
}
```

_Response (429 - Too Many Request)_

```json
{
  "message": "Too Many Request"
}
```

## 10. GET /articles/:ArticleId

Description:
- Fetching articles from newsData.io and summarize it with Google Gemini AI.

- headers:
```json
{
    "access_token": "string"
}
```

- params:

```json
{
    "ArticleId": "string"
}
```

_Response (200 - OK)_

```json
{
    "articleId": "integer",
    "articleTitle": "string",
    "articleImageUrl": "string",
    "articleDescription": "string",
    "articlePubDate": "date",
    "summaryText": "string"
}
```

_Response (422 - Unprocessable Entity)_

```json
{
  "message": "Unprocessable Entity"
}
```

_Response (429 - Too Many Request)_

```json
{
  "message": "Too Many Request"
}
```


## Global Errors

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (403 - Forbiddedn)_

```json
{
  "message": "You're not authorized for this action"
}
```


_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```