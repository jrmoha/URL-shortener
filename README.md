
# Overview

A URL shortener service creates a short url/aliases/tiny url against a long url.Moreover, when user click on the tiny url, he gets redirected to original url.

Tiny url are exceedingly handy to share through sms/tweets (where there is limit to number of characters that can be messaged/tweeted) and also when they are printed in books/magazines etc.(Less character implies less printing cost). In addition, it is easy and less error prone to type a short url when compared to its longer version.


## Design Issues

![alt text](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*mParFcnj7wO_-Srp3IalKg.png)

Problems with above design :

There is only one WebServer which is single point of failure (SPOF)
System is not scalable
There is only single database which might not be sufficient for 60 TB of storage and high load of 8000/s read requests
## Alternative Design
![alt text](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*HeDm_FpLVoR3d97NKdKNLw.png)
## API Reference

#### Create new user

```http
  POST /app/users/api/create
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |
| `passwordConfirmation` | `string` | **Required**. Your password confirmation |

#### Get API_KEY

```http
  POST /app/users/api/login
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email |
| `password`      | `string` | **Required**. password |

#### Assign new short-url

```http
  POST /app/api/create
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `API_KEY`      | `string` | **Required**. Your API_KEY |
| `URL`      | `string` | **Required**. URL to be shorten |

#### Redirect to original_url

```http
  GET /${SHORT_URL}
```

| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `SHORT_URL`      | `string` | **Required**.  the SHORT_URL assigned with original one|


##  Repository Structure

```sh
└── URL-shortener/
    ├── config/
    │   └── default.ts
    ├── src/
    │   ├── controllers/
    │   │   ├── url.controller.ts
    │   │   └── user.controller.ts
    │   ├── errors/
    │   │   └── APIError.ts
    │   ├── middleware/
    │   │   ├── errorHandler.middleware.ts
    │   │   ├── logger.middleware.ts
    │   │   └── validateInput.middleware.ts
    │   ├── models/
    │   │   ├── url.model.ts
    │   │   └── user.model.ts
    │   ├── routes/
    │   │   ├── index.ts
    │   │   ├── url.route.ts
    │   │   └── user.route.ts
    │   ├── schema/
    │   │   ├── url.schema.ts
    │   │   └── user.schema.ts
    │   ├── services/
    │   │   ├── url.service.ts
    │   │   └── user.service.ts
    │   └── utils/
    │       ├── connect.ts
    │       └── logger.ts
    |   ├── server.ts
    ├── .env.example
    ├── .eslintrc.js
    ├── .prettierrc.json
    ├── package.json
    ├── tsconfig.json
    └── yarn.lock

```
## Installation

```bash
  git clone https://github.com/jrmoha/URL-shortener.git
  cd URL-shortener
```

#### Install Typescript

```bash
yarn add typescript
```
### Initialize Typescript
```bash
npx tsc --init
```
#### Install dependencies 

```bash
yarn install
```

#### Start Server 

```bash
yarn dev
```
---

## Environment Variables

Find all in .env.example


## Acknowledgements

 - [Main Reference](https://medium.com/@sandeep4.verma/system-design-scalable-url-shortener-service-like-tinyurl-106f30f23a82)
 

