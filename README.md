
# BookingService

### Requirements

- [Git](https://www.odoo.com/documentation/15.0/contributing/documentation.html#install-git)
- [Node JS >= 14.15](https://nodejs.org/en/blog/release/v14.17.3/)
- [MongoDb Driver](https://www.mongodb.com/docs) (Optional)
- [MongoDb Atlas](https://www.mongodb.com/cloud/atlas/register).
- [Ajv](https://ajv.js.org/guide/getting-started.html)
- [Docker and Docker Compose](https://docs.docker.com/get-docker/) (Optional)
- [Postman](https://learning.postman.com/docs/getting-started/introduction/)


I dont finish the Unit Test yet, but i have provided all the API serive including test case for every `endpoints` in folder [/postman](https://github.com/mrbontor/booking-service/tree/main/postman)

### Settings & Configuring

#### App config


Please check the file `env.example` and change to `.env`

```env
APP_ENV             = development
APP_PORT            = 3000
APP_ISSUER          = gitbub.com/mrbontor

....

```

#### Database config

This service is using [MongoDb Cloud Atlas](https://www.mongodb.com/cloud/atlas/register).
If you are going to use your local MongoDb, please change the connection url [/app/libraries/db/mongoDb/index.js Line 12](https://github.com/mrbontor/booking-service/blob/71decb14f60ad968421d02563617330e7608a7b2/app/libraries/db/mongoDb/index.js#L12)

```js
const mongoUrl = `mongodb+srv://....`
//to
const mongoUrl = `mongodb://...`

```

example existing user:

`admin`
```js
username: "superadmin"
password: "Haruslolos123!"
```

`admin`
```js
username: "masalalu"
password: "Haruslolos123!"
```

### Deployment && Testing

#### Deployment && Usage

By default, you can run this service following command below:

```sh
# install dependencies
$ npm install

# run app
$ npm start

# or
$ node index.js
```

And you can also running thi service using `Docker` and `Docker-Compose`

```sh
# start
$ docker-compose up

# stop
$ docker-compose down

# remove
$ docker-compose down -v
```
#### Running the test

As i mentioned before, the `Unit Test Code` not finish yet, but already finish with documentation in [/postman](https://github.com/mrbontor/booking-service/tree/main/postman)


how to run:

```sh
# start
$ npm test
```

#### Running in Postman

Please follow this [Postman Doc Import Api](https://learning.postman.com/docs/designing-and-developing-your-api/importing-an-api/) for better information





## Endpoints

* [AUTH](#auth)
    1. [LOGIN](#1-login)
        * [Success](#i-example-request-success)
        * [Wrong Password](#ii-example-request-wrong-password)
        * [Wrong Username](#iii-example-request-wrong-username)
    1. [REFRESH](#2-refresh)
        * [Success](#i-example-request-success-1)
        * [UnAuthorize](#ii-example-request-unauthorize)
    1. [LOGOUT](#3-logout)
        * [Success](#i-example-request-success-2)
        * [UnAuthorize](#ii-example-request-unauthorize-1)
* [USER](#user)
    1. [CREATE](#1-create)
        * [Success](#i-example-request-success-3)
        * [Validation error](#ii-example-request-validation-error)
    1. [GET ALL](#2-get-all)
        * [Success](#i-example-request-success-4)
        * [Success with filter](#ii-example-request-success-with-filter)
    1. [GET TABLE](#3-get-table)
        * [Success](#i-example-request-success-5)
        * [No user found](#ii-example-request-no-user-found)
    1. [GET ONE](#4-get-one)
        * [Success](#i-example-request-success-6)
        * [User not found](#ii-example-request-user-not-found)
    1. [PUT](#5-put)
        * [Success](#i-example-request-success-7)
        * [Validation Error](#ii-example-request-validation-error-1)
        * [User not found](#iii-example-request-user-not-found)
    1. [PATCH CREDENTIAL](#6-patch-credential)
        * [Success](#i-example-request-success-8)
        * [Wrong Password](#ii-example-request-wrong-password-1)
        * [validation error](#iii-example-request-validation-error)
        * [Validation error other field](#iv-example-request-validation-error-other-field)
        * [User not found](#v-example-request-user-not-found)
    1. [PATCH USER STATUS](#7-patch-user-status)
        * [Success](#i-example-request-success-9)
        * [Validation error](#ii-example-request-validation-error-2)
        * [User not found](#iii-example-request-user-not-found-1)
    1. [DELETE](#8-delete)
        * [Success](#i-example-request-success-10)
        * [User not found](#ii-example-request-user-not-found-1)
        * [Url not found](#iii-example-request-url-not-found)
* [OPENLIBRARY](#openlibrary)
    1. [GET BY  SUBJECT](#1-get-by--subject)
        * [Success](#i-example-request-success-11)
        * [Succes with limit](#ii-example-request-succes-with-limit)
        * [No book(s) found](#iii-example-request-no-books-found)
    1. [GET DETAIL](#2-get-detail)
        * [Success](#i-example-request-success-12)
        * [Not book detail found](#ii-example-request-not-book-detail-found)
* [BOOKINGS](#bookings)
    1. [CREATE](#1-create-1)
        * [Success booking](#i-example-request-success-booking)
        * [Invalid Date ranges](#ii-example-request-invalid-date-ranges)
        * [Duplciate book and not return yet](#iii-example-request-duplciate-book-and-not-return-yet)
        * [Invali Long borrowing date](#iv-example-request-invali-long-borrowing-date)
        * [Validation Error Empty Item](#v-example-request-validation-error-empty-item)
        * [Validation error field required](#vi-example-request-validation-error-field-required)
    1. [GET ALL](#2-get-all-1)
        * [Success without filter](#i-example-request-success-without-filter)
        * [Success with filter search](#ii-example-request-success-with-filter-search)
        * [Filter not match to any](#iii-example-request-filter-not-match-to-any)
    1. [GET ONE](#3-get-one)
        * [Success](#i-example-request-success-13)
        * [Not found](#ii-example-request-not-found)
    1. [GET TABLE](#4-get-table)
        * [Success without default data](#i-example-request-success-without-default-data)
        * [Success with filter userIds](#ii-example-request-success-with-filter-userids)
        * [Success filter nested list](#iii-example-request-success-filter-nested-list)
        * [Success but no data found](#iv-example-request-success-but-no-data-found)
    1. [UPDATE](#5-update)
        * [Success](#i-example-request-success-14)
        * [Validation Error on Items](#ii-example-request-validation-error-on-items)
        * [Validation error required](#iii-example-request-validation-error-required)
        * [Invalid maximal days](#iv-example-request-invalid-maximal-days)
        * [Validation error additional field](#v-example-request-validation-error-additional-field)
    1. [PATCH BOOKING STATUS](#6-patch-booking-status)
        * [Success Approved](#i-example-request-success-approved)
        * [Success Done](#ii-example-request-success-done)
        * [Success Cancelled](#iii-example-request-success-cancelled)
        * [Validation error when rejected](#iv-example-request-validation-error-when-rejected)
        * [Invalid to rollback approved-> pending](#v-example-request-invalid-to-rollback-approved--pending)
        * [Invalid to rollback approved-> rejected](#vi-example-request-invalid-to-rollback-approved--rejected)
        * [Invalid to rollback approved-> cancelled](#vii-example-request-invalid-to-rollback-approved--cancelled)
        * [Invalid, cannot modify status done](#viii-example-request-invalid-cannot-modify-status-done)
        * [Success rejected](#ix-example-request-success-rejected)
    1. [DELETE](#7-delete)
        * [Success delete](#i-example-request-success-delete)
        * [Not found id](#ii-example-request-not-found-id)
        * [Invalid when status apprvoed](#iii-example-request-invalid-when-status-apprvoed)

--------



## AUTH

User admin need to authenticate before accessing all API



### 1. LOGIN


User login with `username` and `password`

`Login API` will return `` accessToken and `refreshToken` ``

`accessToken` provided in Response \`body\` where `refreshToken` in \`Cookies \`


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{local}}/v1/auth/login
```



***Body:***

```js        
{
    "username": "superadmin",
    "password": "Haruslolos123!"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "username": "superadmin",
    "password": "Haruslolos123!"
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjYzOGIzNDJlN2ZkYzBjZGY5NWY2MTcxMCIsInVzZXJuYW1lIjoic3VwZXJhZG1pbiIsImZpcnN0TmFtZSI6InN1cGVyIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlzQWN0aXZlIjp0cnVlLCJpc0FkbWluIjp0cnVlfSwiaWF0IjoxNjcwMjA5NDI0LCJleHAiOjE2NzAyMDk1NDQsImF1ZCI6ImNvc21hcnQuY28uaWQiLCJpc3MiOiJjb3NtYXJ0LmNvLmlkIn0.16Qz04MPVgjgiTIvqOebIf9xWZO-Ta8VUXH-9a0R0hk"
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Wrong Password



***Body:***

```js        
{
    "username": "superadmin",
    "password": "Haruslolos123!!"
}
```



#### II. Example Response: Wrong Password
```js
{
    "status": false,
    "message": "Un Authorized!"
}
```


***Status Code:*** 401

<br>



#### III. Example Request: Wrong Username



***Body:***

```js        
{
    "username": "superadmins",
    "password": "Haruslolos123!"
}
```



#### III. Example Response: Wrong Username
```js
{
    "status": false,
    "message": "Un Authorized!"
}
```


***Status Code:*** 401

<br>



### 2. REFRESH


Fetch new Token as a refresh token


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/auth/refresh-token
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjYzOGIzNDJlN2ZkYzBjZGY5NWY2MTcxMCIsInVzZXJuYW1lIjoic3VwZXJhZG1pbiIsImZpcnN0TmFtZSI6InN1cGVyIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlzQWN0aXZlIjp0cnVlLCJpc0FkbWluIjp0cnVlfSwiaWF0IjoxNjcwMjA5NzkxLCJleHAiOjE2NzAyMDk5MTEsImF1ZCI6ImNvc21hcnQuY28uaWQiLCJpc3MiOiJjb3NtYXJ0LmNvLmlkIn0.qslAe_3dioFs0bOtN1wOpfhuLwNsAE7UAf50Fj7ueIM"
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: UnAuthorize



***Body: None***



#### II. Example Response: UnAuthorize
```js
Unauthorized
```


***Status Code:*** 401

<br>



### 3. LOGOUT


User Logout and remove token, cookies etc


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/auth/logout
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| allDevices | true | true or false |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| allDevices | true | true or false |



***Body: None***



***Status Code:*** 204

<br>



#### II. Example Request: UnAuthorize



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| allDevices | true | true or false |



***Body: None***



#### II. Example Response: UnAuthorize
```js
Unauthorized
```


***Status Code:*** 401

<br>



## USER

`Users` directory contains all the user related APIs. For authentication these apis requrie `BasicAuth`



### 1. CREATE


Create user use `JSON` payload to create a user


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{local}}/v1/users
```



***Body:***

```js        
{
    "firstName": "super1",
    "lastName": "admin2",
    "username": "superadmin1",
    "email": "superadmin1@gmail.com",
    "password": "Haruslolos123!",
    "address": "di hati cosmart"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "firstName": "need",
    "lastName": "job",
    "username": "needjob",
    "email": "needjob@gmail.com",
    "password": "Haruslolos123!",
    "address": "di hati cosmart"
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": "638cdb32cf642a10585cef4c"
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Validation error



***Body:***

```js        
{
    "firstName": 132,
    "lastName": "admin",
    "username": "superadmin",
    "email": "superadmin@gmail.com",
    "password": "123",
    "address": "di hati cosmart"
}
```



#### II. Example Response: Validation error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "firstName",
            "key": "type",
            "message": "Firstname must be string"
        },
        {
            "param": "password",
            "key": "minLength",
            "message": "Password should be greater than 6"
        },
        {
            "param": "password",
            "key": "format",
            "message": "Password should be including 1 Uppercase, 1 number and 1 special character(#?!@$%^&*-)"
        }
    ]
}
```


***Status Code:*** 400

<br>



### 2. GET ALL


Fetch all list users

can be filtered by user fields

``` javascript
[
    "userId",
     "firstName",
     "username",
     "email",
     "isActive",
]

```


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/users
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "_id": "638c85b7bedda18dfa65fdd8",
            "firstName": "masa",
            "username": "masalalu",
            "email": "masalalu@gmail.com",
            "isActive": true
        },
        {
            "_id": "638cdb32cf642a10585cef4c",
            "firstName": "need",
            "username": "needjob",
            "email": "needjob@gmail.com",
            "isActive": true
        },
        {
            "_id": "638b342e7fdc0cdf95f61710",
            "firstName": "super",
            "username": "superadmin",
            "email": "superadmin@gmail.com",
            "isActive": true
        }
    ]
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Success with filter



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| userId | 638c85b7bedda18dfa65fdd8,638b342e7fdc0cdf95f61710 |  |



***Body: None***



#### II. Example Response: Success with filter
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "_id": "638c85b7bedda18dfa65fdd8",
            "firstName": "masa",
            "username": "masalalu",
            "email": "masalalu@gmail.com",
            "isActive": true
        },
        {
            "_id": "638b342e7fdc0cdf95f61710",
            "firstName": "super",
            "username": "superadmin",
            "email": "superadmin@gmail.com",
            "isActive": true
        }
    ]
}
```


***Status Code:*** 200

<br>



### 3. GET TABLE


Fetch `User` using pagination

allowed filter/search by multiple fields

- firstName
- username
- email
- status
    

can be sorted by those fields as well

`sortBy` = status

`sortType` = `desc` or `asc`


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/users/table
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| sortBy | status | firstName, username, email, status |
| sortType | desc | asc, desc and/or  0, 1 |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| sortBy | status |  |
| sortType | desc |  |



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "sort": {
            "status": "DESC"
        },
        "page": 1,
        "size": 10,
        "totalRecord": 3,
        "totalPage": 1,
        "data": [
            {
                "_id": "638b342e7fdc0cdf95f61710",
                "firstName": "super",
                "username": "superadmin",
                "email": "superadmin@gmail.com",
                "isActive": true,
                "updatedAt": "2022-12-04T19:53:20.387Z"
            },
            {
                "_id": "638c85b7bedda18dfa65fdd8",
                "firstName": "masa",
                "username": "masalalu",
                "email": "masalalu@gmail.com",
                "isActive": true,
                "updatedAt": "2022-12-04T11:34:15.729Z"
            },
            {
                "_id": "638cdb32cf642a10585cef4c",
                "firstName": "need",
                "username": "needjob",
                "email": "needjob@gmail.com",
                "isActive": false,
                "updatedAt": "2022-12-04T17:38:58.088Z"
            }
        ]
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: No user found



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| sortBy | status |  |
| sortType | desc |  |
| search | nothing |  |



***Body: None***



#### II. Example Response: No user found
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "sort": {
            "status": "DESC"
        },
        "page": 1,
        "size": 10,
        "totalRecord": 0,
        "totalPage": 1,
        "data": []
    }
}
```


***Status Code:*** 200

<br>



### 4. GET ONE


Fetch a single user using `id with ObjectId format`


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/users/638b342e7fdc0cdf95f61710
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "_id": "638b342e7fdc0cdf95f61710",
        "firstName": "super",
        "lastName": "admin",
        "username": "superadmin",
        "email": "superadmin@gmail.com",
        "address": "di hati cosmart",
        "isActive": true,
        "infoLogin": {
            "hash": "d7d53541df690651e8b6748a587003010b39dd77e14f97fd6b81e5c7f22012dfd9fa69b7b0c11a76d4de5bd8f7f72e19fa7bca1a5ef6bca91b9d3b076b97747c",
            "salt": "qt1Sa7e3d5DGj/mVv2PIJOB0t6ofhKzJ+rhdBAIMbhrzgzNpz3rPKEjjmTuEb8yNX2intdE7NesGuznqmLMY9qwS/9DZJ7YrBu/9Dz3xyTUzStV5EZHglyCLR2YS/XNcHMMiIw6t7XMMN3yHCDuQ4dyRZnT+vyPD7VW84Pl1WXI=",
            "iterations": 8912
        },
        "updatedAt": "2022-12-04T19:53:20.387Z",
        "gender": "Man"
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: User not found



***Body: None***



#### II. Example Response: User not found
```js
{
    "status": false,
    "message": "User not found!"
}
```


***Status Code:*** 400

<br>



### 5. PUT


Update user use `JSON` payload to update a user

Note: only below field can be updated using `PUT`.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{local}}/v1/users/638b342e7fdc0cdf95f61710
```



***Body:***

```js        
{
    "firstName": "super",
    "lastName": "admin",    
    "address": "di hati cosmart",
    "gender": "Man"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "firstName": "super",
    "lastName": "admin",    
    "address": "di hati cosmart",
    "gender": "Man"
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "_id": "638b342e7fdc0cdf95f61710",
        "firstName": "super",
        "lastName": "admin",
        "username": "superadmin",
        "email": "superadmin@gmail.com",
        "address": "di hati cosmart",
        "isActive": false,
        "infoLogin": {
            "hash": "f6cd5fad5b1c120fce3e1f87961d1ff65021e873e3e49be587671f7157369c4ccd2467bc98f069b2a7997d2fa1fe047f8896cc96bb2f186202feb5943dce9977",
            "salt": "87Om/3NARWYw4gb1NLoHd8wDPax68kA8qkjtV1hk34E2zyvQ9bGzUrvkPF/3ZWmdijWLZfBEvKxVmyFfCbJiFA1bwrSuMwk2TOXyiwqEF60lNTIbwBwaRZ45LLXyVggnUaVW1A4B+sYczxc7VooHPS3qTO7ClJinANgWkTVsL1U=",
            "iterations": 1434
        },
        "updatedAt": "2022-12-04T19:53:20.387Z",
        "gender": "Man"
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Validation Error



***Body:***

```js        
{
    "firstName": 123,
    "lastName": "admin",    
    "address": "di hati cosmart",
    "gender": "Man",
    
    "other": "oalah"
}
```



#### II. Example Response: Validation Error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "other",
            "key": "additionalProperties",
            "message": "must NOT have additional properties"
        },
        {
            "param": "firstName",
            "key": "type",
            "message": "Firstname must be string."
        }
    ]
}
```


***Status Code:*** 400

<br>



#### III. Example Request: User not found



***Body:***

```js        
{
    "firstName": "super",
    "lastName": "admin",    
    "address": "di hati cosmart",
    "gender": "Man"
}
```



#### III. Example Response: User not found
```js
{
    "status": false,
    "message": "User not found!"
}
```


***Status Code:*** 400

<br>



### 6. PATCH CREDENTIAL


Update user **password** use `JSON` payload to update a user


***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: {{local}}/v1/users/638b342e7fdc0cdf95f61710
```



***Body:***

```js        
{
    "password": "Haruslolos123!",
    "newPassword": "!Haruslolos123"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "password": "Haruslolos123!",
    "newPassword": "!Haruslolos123"
}
```



***Status Code:*** 204

<br>



#### II. Example Request: Wrong Password



***Body:***

```js        
{
    "password": "!Haruslolos123",
    "newPassword": "Haruslolos123!"
}
```



#### II. Example Response: Wrong Password
```js
{
    "status": false,
    "message": "Incorect Password"
}
```


***Status Code:*** 400

<br>



#### III. Example Request: validation error



***Body:***

```js        
{
    
}
```



#### III. Example Response: validation error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "password",
            "key": "required",
            "message": "Password is required"
        },
        {
            "param": "newPassword",
            "key": "required",
            "message": "New Password is required"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### IV. Example Request: Validation error other field



***Body:***

```js        
{
    "password": "Haruslolos123!",
    "newPassword": "!Haruslolos123",

    "otherfield": "lol"
}
```



#### IV. Example Response: Validation error other field
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "otherfield",
            "key": "additionalProperties",
            "message": "must NOT have additional properties"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### V. Example Request: User not found



***Body:***

```js        
{
    "password": "Haruslolos123!",
    "newPassword": "!Haruslolos123"
}
```



#### V. Example Response: User not found
```js
{
    "status": false,
    "message": "User not found!"
}
```


***Status Code:*** 400

<br>



### 7. PATCH USER STATUS


Update user status use `JSON` payload to update


***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: {{local}}/v1/users/status/638b342e7fdc0cdf95f61710
```



***Body:***

```js        
{
    "isActive": true
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "isActive": true
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "isActive": true
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Validation error



***Body:***

```js        
{
    "isActive": "true"
}
```



#### II. Example Response: Validation error
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "isActive",
            "key": "type",
            "message": "Status should be boolean"
        },
        {
            "param": "isActive",
            "key": "enum",
            "message": "Please select one from the options"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### III. Example Request: User not found



***Body:***

```js        
{
    "isActive": true
}
```



#### III. Example Response: User not found
```js
{
    "status": false,
    "message": "User not found!"
}
```


***Status Code:*** 400

<br>



### 8. DELETE


Delete a single user using `id`


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{local}}/v1/users/638cfdd0e18440b7d43ddbcd
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



***Status Code:*** 204

<br>



#### II. Example Request: User not found



***Body: None***



#### II. Example Response: User not found
```js
{
    "status": false,
    "message": "User not found!"
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Url not found



***Body: None***



#### III. Example Response: Url not found
```js
Not Found
```


***Status Code:*** 404

<br>



## OPENLIBRARY

OpenLibrary API

this is an open source library

for more detail. follow this link

[Open Library API](https://openlibrary.org/dev/docs/api)



### 1. GET BY  SUBJECT


Fetch list book by `Subject` from [Open Library API](https://openlibrary.org/dev/docs/api)

Use param `Search` to get list subject

can also using `limit` where limit default to `10`


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/books
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| search | love | string |
| limit | 1 | number |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| search | love |  |



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "key": "/works/OL21177W",
            "title": "Wuthering Heights",
            "authors": [
                {
                    "key": "/authors/OL4327048A",
                    "name": "Emily Brontë"
                }
            ],
            "edition_count": 1608,
            "cover_id": 12818862
        },
        {
            "key": "/works/OL362427W",
            "title": "Romeo and Juliet",
            "authors": [
                {
                    "key": "/authors/OL9388A",
                    "name": "William Shakespeare"
                }
            ],
            "edition_count": 969,
            "cover_id": 8257991
        },
        {
            "key": "/works/OL98501W",
            "title": "Ethan Frome",
            "authors": [
                {
                    "key": "/authors/OL20188A",
                    "name": "Edith Wharton"
                }
            ],
            "edition_count": 718,
            "cover_id": 8303480
        },
        {
            "key": "/works/OL27776452W",
            "title": "The Importance of Being Earnest",
            "authors": [
                {
                    "key": "/authors/OL20646A",
                    "name": "Oscar Wilde"
                }
            ],
            "edition_count": 442,
            "cover_id": 1260453
        },
        {
            "key": "/works/OL267096W",
            "title": "Anna Karénina",
            "authors": [
                {
                    "key": "/authors/OL26783A",
                    "name": "Lev Nikolaevič Tolstoy"
                }
            ],
            "edition_count": 388,
            "cover_id": 2560652
        },
        {
            "key": "/works/OL8193420W",
            "title": "The Republic",
            "authors": [
                {
                    "key": "/authors/OL189658A",
                    "name": "Πλάτων"
                },
                {
                    "key": "/authors/OL2933723A",
                    "name": "G.M.A. Grube"
                }
            ],
            "edition_count": 349,
            "cover_id": 8235511
        },
        {
            "key": "/works/OL551668W",
            "title": "Cyrano de Bergerac",
            "authors": [
                {
                    "key": "/authors/OL39281A",
                    "name": "Edmond Rostand"
                }
            ],
            "edition_count": 307,
            "cover_id": 8236320
        },
        {
            "key": "/works/OL10264W",
            "title": "Le Petit Prince",
            "authors": [
                {
                    "key": "/authors/OL31901A",
                    "name": "Antoine de Saint-Exupéry"
                }
            ],
            "edition_count": 267,
            "cover_id": 10708272
        },
        {
            "key": "/works/OL15100036W",
            "title": "The Dialogues of Plato",
            "authors": [
                {
                    "key": "/authors/OL189658A",
                    "name": "Πλάτων"
                }
            ],
            "edition_count": 246,
            "cover_id": 8236248
        },
        {
            "key": "/works/OL239940W",
            "title": "कामसूत्र",
            "authors": [
                {
                    "key": "/authors/OL2531003A",
                    "name": "Vātsyāyana"
                }
            ],
            "edition_count": 236,
            "cover_id": 8003766
        }
    ]
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Succes with limit



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| search | love |  |
| limit | 1 |  |



***Body: None***



#### II. Example Response: Succes with limit
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "key": "/works/OL21177W",
            "title": "Wuthering Heights",
            "authors": [
                {
                    "key": "/authors/OL4327048A",
                    "name": "Emily Brontë"
                }
            ],
            "edition_count": 1608,
            "cover_id": 12818862
        }
    ]
}
```


***Status Code:*** 200

<br>



#### III. Example Request: No book(s) found



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| search | layoff |  |
| limit | 1 |  |



***Body: None***



#### III. Example Response: No book(s) found
```js
{
    "status": false,
    "message": "No book(s) found!"
}
```


***Status Code:*** 404

<br>



### 2. GET DETAIL


Fetch detail book from `Subject` from [Open Library API](https://openlibrary.org/dev/docs/api)

Use param `key` to get detail of the book.

Noted : need to request to Api Book first than use field `key` from the array

exe: `?key=/works/OL21177W`


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/books/detail
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| key | /works/OL21177W | data.key |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| key | /works/OL21177W |  |



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "key": "/works/OL21177W",
        "title": "Wuthering Heights",
        "authors": [
            {
                "author": {
                    "key": "/authors/OL4327048A"
                },
                "type": {
                    "key": "/type/author_role"
                }
            }
        ],
        "description": "Wuthering Heights is an 1847 novel by Emily Brontë, initially published under the pseudonym Ellis Bell. It concerns two families of the landed gentry living on the West Yorkshire moors, the Earnshaws and the Lintons, and their turbulent relationships with Earnshaw's adopted son, Heathcliff. The novel was influenced by Romanticism and Gothic fiction.",
        "first_sentence": {
            "type": "/type/text",
            "value": "1801.-I have just returned from a visit to my landlord-the solitary neighbour that I shall be troubled with."
        },
        "first_publish_date": "April 1, 2000",
        "links": [
            {
                "url": "https://en.wikipedia.org/wiki/Wuthering_Heights",
                "title": "Wuthering Heights - Wikipedia",
                "type": {
                    "key": "/type/link"
                }
            },
            {
                "url": "https://www.cliffsnotes.com/literature/w/wuthering-heights/wuthering-heights-at-a-glance",
                "title": "Wuthering Heights at a glance (cliffsnotes.com)",
                "type": {
                    "key": "/type/link"
                }
            },
            {
                "url": "https://www.theguardian.com/books/2013/dec/16/emily-bronte-wuthering-heights-100-best",
                "title": "The 100 best novels: No 13 – Wuthering Heights by Emily Brontë (1847) (theguardian.com)",
                "type": {
                    "key": "/type/link"
                }
            },
            {
                "title": "The reader's guide to Emily Bronte's classic 'Wuthering Heights' (wuthering-heights.co.uk)",
                "url": "https://www.wuthering-heights.co.uk/",
                "type": {
                    "key": "/type/link"
                }
            },
            {
                "url": "https://thegreatestbooks.org/items/108",
                "title": "thegreatestbooks.org/items/108",
                "type": {
                    "key": "/type/link"
                }
            }
        ],
        "revision": 101
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Not book detail found



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| key | /works/OL21177W1 |  |



***Body: None***



#### II. Example Response: Not book detail found
```js
{
    "status": false,
    "message": "Request failed with status code 404"
}
```


***Status Code:*** 404

<br>



## BOOKINGS

This API have more logic to implemented

- user need to register first and must be active
- should can't choose date in the previous day
- there are limitation for cook count, book booking and how long book can be borrowed
    

Info:

there are 3 uri for GET,

- `/v1/bookings`
- `/v1/bookings/{bookingId}`
- `/v1/bookings/table`
    

ill suggest to use table version bacause it support pagination, search, filter by etc.



### 1. CREATE


Create `Booking` use `JSON` payload to create a booking/appointment

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{local}}/v1/bookings
```



***Body:***

```js        
{
    "userId": "638d3fb01ae7b78318c8dd00",
    "startDate": "2022-12-12 12:00:00",
    "endDate": "2022-12-15 02:00:00",
    "list": [
        {
            "bookKey": "/works/OL1859783W",
            "bookTitle": "The Artificial Kingdom"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        }
    ]
}
```



***More example Requests/Responses:***


#### I. Example Request: Success booking



***Body:***

```js        
{
    "userId": "638cdb32cf642a10585cef4c",
    "startDate": "2022-12-05 12:00:00",
    "endDate": "2022-12-08 02:00:00",
    "list": [
        {
            "bookKey": "/works/OL1859783W",
            "bookTitle": "The Artificial Kingdom"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        }
    ]
}
```



#### I. Example Response: Success booking
```js
{
    "status": true,
    "message": "Success",
    "data": "638d205a766f97ff1c40d8e6"
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Invalid Date ranges



***Body:***

```js        
{
    "userId": "638cdb32cf642a10585cef4c",
    "startDate": "2022-12-05 02:00:00",
    "endDate": "2022-12-08 02:00:00",
    "list": [
        {
            "bookKey": "/works/OL1859783W",
            "bookTitle": "The Artificial Kingdom"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        }
    ]
}
```



#### II. Example Response: Invalid Date ranges
```js
{
    "status": false,
    "message": "Dont stuck in the past, there is still a lot of sand in the ocean"
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Duplciate book and not return yet



***Body:***

```js        
{
    "userId": "638cdb32cf642a10585cef4c",
    "startDate": "2022-12-05 12:00:00",
    "endDate": "2022-12-08 02:00:00",
    "list": [
        {
            "bookKey": "/works/OL1859783W",
            "bookTitle": "The Artificial Kingdom"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        }
    ]
}
```



#### III. Example Response: Duplciate book and not return yet
```js
{
    "status": false,
    "message": "Please check you list, one/some of them is still you borrowed"
}
```


***Status Code:*** 422

<br>



#### IV. Example Request: Invali Long borrowing date



***Body:***

```js        
{
    "userId": "638cdb32cf642a10585cef4c",
    "startDate": "2022-12-05 12:00:00",
    "endDate": "2022-12-18 02:00:00",
    "list": [
        {
            "bookKey": "/works/OL1859783W",
            "bookTitle": "The Artificial Kingdom"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        }
    ]
}
```



#### IV. Example Response: Invali Long borrowing date
```js
{
    "status": false,
    "message": "You can only borrow maximal for 3 days"
}
```


***Status Code:*** 400

<br>



#### V. Example Request: Validation Error Empty Item



***Body:***

```js        
{
    "userId": "638cdb32cf642a10585cef4c",
    "startDate": "2022-12-05 12:00:00",
    "endDate": "2022-12-18 02:00:00",
    "list": []
}
```



#### V. Example Response: Validation Error Empty Item
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "list",
            "key": "minItems",
            "message": "Please pick at least one book!"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### VI. Example Request: Validation error field required



***Body:***

```js        
{
    "userId": "638cdb32cf642a10585cef4c",
    "startDate": "2022-12-05 12:00:00",
    "endDate": "2022-12-18 02:00:00",
    "list": [
        {
            "bookKey": "/works/OL1859783W"
            
        }
    ]
}
```



#### VI. Example Response: Validation error field required
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "bookTitle",
            "key": "required",
            "message": "Book Title required!"
        }
    ]
}
```


***Status Code:*** 400

<br>



### 2. GET ALL


Fetch all list `booking/appointment`

also support for filtering/search

available fields:

- bookingId
- status
- search
- limit1


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/bookings
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| bookingId | 638d205a766f97ff1c40d8e6 | ObjectId |



***More example Requests/Responses:***


#### I. Example Request: Success without filter



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| search | neighborhood | for field bookKey and bookTitle |



***Body: None***



#### I. Example Response: Success without filter
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "_id": "638d205a766f97ff1c40d8e6",
            "userId": {
                "_id": "638cdb32cf642a10585cef4c",
                "fullname": "need job"
            },
            "startDate": "2022-12-05T12:00:00+07:00",
            "endDate": "2022-12-08T02:00:00+07:00",
            "list": [
                {
                    "bookKey": "/works/OL1859783W",
                    "bookTitle": "The Artificial Kingdom"
                },
                {
                    "bookKey": "/works/OL4279057W",
                    "bookTitle": "The Old Neighborhood"
                }
            ],
            "status": "pending"
        }
    ]
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Success with filter search



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| search | neighborhood |  |



***Body: None***



#### II. Example Response: Success with filter search
```js
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "_id": "638d205a766f97ff1c40d8e6",
            "userId": {
                "_id": "638cdb32cf642a10585cef4c",
                "fullname": "need job"
            },
            "startDate": "2022-12-05T12:00:00+07:00",
            "endDate": "2022-12-08T02:00:00+07:00",
            "list": [
                {
                    "bookKey": "/works/OL1859783W",
                    "bookTitle": "The Artificial Kingdom"
                },
                {
                    "bookKey": "/works/OL4279057W",
                    "bookTitle": "The Old Neighborhood"
                }
            ],
            "status": "pending"
        }
    ]
}
```


***Status Code:*** 200

<br>



#### III. Example Request: Filter not match to any



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| search | begadang | for field bookKey and bookTitle |



***Body: None***



#### III. Example Response: Filter not match to any
```js
{
    "status": false,
    "message": "No Data booking found!"
}
```


***Status Code:*** 404

<br>



### 3. GET ONE


Fetch a single booking using `id with ObjectId format`


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/bookings/638d205a766f97ff1c40d8e6
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "_id": "638d205a766f97ff1c40d8e6",
        "userId": "638cdb32cf642a10585cef4c",
        "startDate": "2022-12-05T12:00:00+07:00",
        "endDate": "2022-12-08T02:00:00+07:00",
        "list": [
            {
                "bookKey": "/works/OL1859783W",
                "bookTitle": "The Artificial Kingdom"
            },
            {
                "bookKey": "/works/OL4279057W",
                "bookTitle": "The Old Neighborhood"
            }
        ],
        "status": "pending",
        "createdAt": "2022-12-05T05:34:02+07:00"
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Not found



***Body: None***



#### II. Example Response: Not found
```js
{
    "status": false,
    "message": "Booking Id is not found!"
}
```


***Status Code:*** 404

<br>



### 4. GET TABLE


Fetch `Bookings` using pagination

allowed filter/search by multiple fields

- userId
- list.bookKey
- list.bookTitle
- status
    

can be sorted by those fields as well

`sortBy` = status

`sortType` = `desc` or `asc`

noted: API will always return `200`


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{local}}/v1/bookings/table
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| status | done, cancelled | approved, rejected, pending, done, cancelled |



***More example Requests/Responses:***


#### I. Example Request: Success without default data



***Body: None***



#### I. Example Response: Success without default data
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "sort": {
            "updatedAt": "ASC"
        },
        "page": 1,
        "size": 10,
        "totalRecord": 3,
        "totalPage": 1,
        "data": [
            {
                "_id": "638c8691b1a20b1247f0ede0",
                "userId": {
                    "_id": "638c85b7bedda18dfa65fdd8",
                    "fullname": "masa lalu"
                },
                "list": [
                    {
                        "bookKey": "/works/OL1859783W",
                        "bookTitle": "The Artificial Kingdom"
                    }
                ],
                "startDate": "2022-12-06T02:00:00+07:00",
                "endDate": "2022-12-08T02:00:00+07:00",
                "status": "pending"
            },
            {
                "_id": "638cd3e390b9b62be62a87e3",
                "userId": {
                    "_id": "638cdb32cf642a10585cef4c",
                    "fullname": "need job"
                },
                "startDate": "2022-12-06T02:00:00+07:00",
                "endDate": "2022-11-08T02:00:00+07:00",
                "list": [
                    {
                        "bookKey": "/works/OL1859783W",
                        "bookTitle": "The Artificial Kingdom"
                    },
                    {
                        "bookKey": "/works/OL16800971W",
                        "bookTitle": "Die Zeit, die Zeit"
                    }
                ],
                "status": "done"
            },
            {
                "_id": "638d205a766f97ff1c40d8e6",
                "userId": {
                    "_id": "638cdb32cf642a10585cef4c",
                    "fullname": "need job"
                },
                "startDate": "2022-12-05T12:00:00+07:00",
                "endDate": "2022-12-08T02:00:00+07:00",
                "list": [
                    {
                        "bookKey": "/works/OL1859783W",
                        "bookTitle": "The Artificial Kingdom"
                    },
                    {
                        "bookKey": "/works/OL4279057W",
                        "bookTitle": "The Old Neighborhood"
                    }
                ],
                "status": "pending"
            }
        ]
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Success with filter userIds



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| userId | 638c85b7bedda18dfa65fdd8,638b342e7fdc0cdf95f61710 | string array |



***Body: None***



#### II. Example Response: Success with filter userIds
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "sort": {
            "updatedAt": "ASC"
        },
        "page": 1,
        "size": 10,
        "totalRecord": 3,
        "totalPage": 1,
        "data": [
            {
                "_id": "638c8691b1a20b1247f0ede0",
                "userId": {
                    "_id": "638c85b7bedda18dfa65fdd8",
                    "fullname": "masa lalu"
                },
                "list": [
                    {
                        "bookKey": "/works/OL1859783W",
                        "bookTitle": "The Artificial Kingdom"
                    }
                ],
                "startDate": "2022-12-06T02:00:00+07:00",
                "endDate": "2022-12-08T02:00:00+07:00",
                "status": "pending"
            }
        ]
    }
}
```


***Status Code:*** 200

<br>



#### III. Example Request: Success filter nested list



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| search | Neighborhood | bookKey or bookTtitle of list's field |



***Body: None***



#### III. Example Response: Success filter nested list
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "sort": {
            "updatedAt": "ASC"
        },
        "page": 1,
        "size": 10,
        "totalRecord": 3,
        "totalPage": 1,
        "data": [
            {
                "_id": "638d205a766f97ff1c40d8e6",
                "userId": {
                    "_id": "638cdb32cf642a10585cef4c",
                    "fullname": "need job"
                },
                "startDate": "2022-12-05T12:00:00+07:00",
                "endDate": "2022-12-08T02:00:00+07:00",
                "list": [
                    {
                        "bookKey": "/works/OL1859783W",
                        "bookTitle": "The Artificial Kingdom"
                    },
                    {
                        "bookKey": "/works/OL4279057W",
                        "bookTitle": "The Old Neighborhood"
                    }
                ],
                "status": "pending"
            }
        ]
    }
}
```


***Status Code:*** 200

<br>



#### IV. Example Request: Success but no data found



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| search | begadang |  |



***Body: None***



#### IV. Example Response: Success but no data found
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "sort": {
            "updatedAt": "ASC"
        },
        "page": 1,
        "size": 10,
        "totalRecord": 0,
        "totalPage": 1,
        "data": []
    }
}
```


***Status Code:*** 200

<br>



### 5. UPDATE


Update Booking use `JSON` payload to update booking

Or you can just replace those field from `GET` `../detail/{id}`

Note: only below field can be updated using `PUT`


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{local}}/v1/bookings/638d205a766f97ff1c40d8e6
```



***Body:***

```js        
{
    "userId": "638cdb32cf642a10585cef4c",
    "startDate": "2022-12-05 02:00:00",
    "endDate": "2022-12-08 02:00:00",
    "list": [
        {
            "bookKey": "/works/OL1859783W",
            "bookTitle": "The Artificial Kingdom"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        }
    ]
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "userId": "638cdb32cf642a10585cef4c",
    "startDate": "2022-12-05 02:00:00",
    "endDate": "2022-12-08 02:00:00",
    "list": [
        {
            "bookKey": "/works/OL1859783W",
            "bookTitle": "The Artificial Kingdom"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        }
    ] 
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "_id": "638d205a766f97ff1c40d8e6",
        "userId": "638cdb32cf642a10585cef4c",
        "startDate": "2022-12-05T02:00:00+07:00",
        "endDate": "2022-12-08T02:00:00+07:00",
        "list": [
            {
                "bookKey": "/works/OL1859783W",
                "bookTitle": "The Artificial Kingdom"
            },
            {
                "bookKey": "/works/OL4279057W",
                "bookTitle": "The Old Neighborhood"
            }
        ],
        "status": "pending",
        "createdAt": "2022-12-05T07:23:11+07:00"
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Validation Error on Items



***Body:***

```js        
{
    "userId": "638cdb32cf642a10585cef4c",
    "startDate": "2022-12-05 02:00:00",
    "endDate": "2022-12-08 02:00:00",
    "list": [] 
}
```



#### II. Example Response: Validation Error on Items
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "list",
            "key": "minItems",
            "message": "Please pick at least one book!"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Validation error required



***Body:***

```js        
{
    "userId": "638cdb32cf642a10585cef4c",
    "startDate": "2022-12-05 02:00:00",
    "endDate": "2022-12-08 02:00:00",
    "list": [
        {
            "bookKey": "/works/OL1859783W"
        }
    ] 
}
```



#### III. Example Response: Validation error required
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "bookTitle",
            "key": "required",
            "message": "Book Title required!"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### IV. Example Request: Invalid maximal days



***Body:***

```js        
{
    "userId": "638cdb32cf642a10585cef4c",
    "startDate": "2022-12-05 02:00:00",
    "endDate": "2022-12-20 02:00:00",
    "list": [
        {
            "bookKey": "/works/OL1859783W",
            "bookTitle": "The Artificial Kingdom"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        }
    ] 
}
```



#### IV. Example Response: Invalid maximal days
```js
{
    "status": false,
    "message": "You can only borrow maximal for 3 days"
}
```


***Status Code:*** 400

<br>



#### V. Example Request: Validation error additional field



***Body:***

```js        
{
    "userId": "638cdb32cf642a10585cef4c",
    "startDate": "2022-12-05 02:00:00",
    "endDate": "2022-12-08 02:00:00",
    "list": [
        {
            "bookKey": "/works/OL1859783W",
            "bookTitle": "The Artificial Kingdom"
        },
        {
            "bookKey": "/works/OL4279057W",
            "bookTitle": "The Old Neighborhood"
        }
    ],
    "status": ""
}
```



#### V. Example Response: Validation error additional field
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "status",
            "key": "additionalProperties",
            "message": "must NOT have additional properties"
        }
    ]
}
```


***Status Code:*** 400

<br>



### 6. PATCH BOOKING STATUS


This is used to handle `booking status`

`list status`

- pending,
- rejected,
- approved,
- done,
- cancelled


***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: {{local}}/v1/bookings/status/638d41cfb8b5e4ba794fe9bf
```



***Body:***

```js        
{
    "status": "approved",
    "reason": "oke, take them all"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success Approved



***Body:***

```js        
{
    "status": "approved"
}
```



#### I. Example Response: Success Approved
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "status": "approved"
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Success Done



***Body:***

```js        
{
    "status": "done"
}
```



#### II. Example Response: Success Done
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "status": "done"
    }
}
```


***Status Code:*** 200

<br>



#### III. Example Request: Success Cancelled



***Body:***

```js        
{
    "status": "cancelled"
}
```



#### III. Example Response: Success Cancelled
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "status": "cancelled"
    }
}
```


***Status Code:*** 200

<br>



#### IV. Example Request: Validation error when rejected



***Body:***

```js        
{
    "status": "rejected"
}
```



#### IV. Example Response: Validation error when rejected
```js
{
    "status": false,
    "message": "Validation Error!",
    "errors": [
        {
            "param": "reason",
            "key": "required",
            "message": "must have required property 'reason'"
        },
        {
            "key": "if",
            "message": "must match \"then\" schema"
        },
        {
            "key": "oneOf",
            "message": "must match exactly one schema in oneOf"
        }
    ]
}
```


***Status Code:*** 400

<br>



#### V. Example Request: Invalid to rollback approved-> pending



***Body:***

```js        
{
    "status": "pending"
}
```



#### V. Example Response: Invalid to rollback approved-> pending
```js
{
    "status": false,
    "message": "The Booking is already approved, please return our book for new booking"
}
```


***Status Code:*** 422

<br>



#### VI. Example Request: Invalid to rollback approved-> rejected



***Body:***

```js        
{
    "status": "rejected",
    "reason": "no employee"
}
```



#### VI. Example Response: Invalid to rollback approved-> rejected
```js
{
    "status": false,
    "message": "The Booking is already approved, please return our book for new booking"
}
```


***Status Code:*** 422

<br>



#### VII. Example Request: Invalid to rollback approved-> cancelled



***Body:***

```js        
{
    "status": "cancelled"
}
```



#### VII. Example Response: Invalid to rollback approved-> cancelled
```js
{
    "status": false,
    "message": "The Booking is already approved, please return our book for new booking"
}
```


***Status Code:*** 422

<br>



#### VIII. Example Request: Invalid, cannot modify status done



***Body:***

```js        
{
    "status": "done"
}
```



#### VIII. Example Response: Invalid, cannot modify status done
```js
{
    "status": false,
    "message": "You cannot modify this boking anymore"
}
```


***Status Code:*** 422

<br>



#### IX. Example Request: Success rejected



***Body:***

```js        
{
    "status": "rejected",
    "reason": "malas"
}
```



#### IX. Example Response: Success rejected
```js
{
    "status": true,
    "message": "Success",
    "data": {
        "status": "rejected",
        "reason": "malas"
    }
}
```


***Status Code:*** 200

<br>



### 7. DELETE


Delete a single `booking` using `id`

Note: cannot delete booking with status `approved`, but API will alway re


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{local}}/v1/bookings/638d41cfb8b5e4ba794fe9bf
```



***More example Requests/Responses:***


#### I. Example Request: Success delete



***Body: None***



***Status Code:*** 204

<br>



#### II. Example Request: Not found id



***Body: None***



#### II. Example Response: Not found id
```js
{
    "status": false,
    "message": "Booking Id not found!"
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Invalid when status apprvoed



***Body: None***



#### III. Example Response: Invalid when status apprvoed
```js
{
    "status": false,
    "message": "Booking Id is not found or book(s) still borrowed!"
}
```


***Status Code:*** 400

<br>



---
[Back to top](#BookingService)
