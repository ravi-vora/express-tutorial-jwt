# install && create secure keys
- npm install
- node keyPair.js

# run application [dev]
- npm run dev

# run application [on-build]
- npm start



# hostname
- http://localhost:3000

# endpoints
- /user GET 
    - headers -> Authorization - [Bearer token]

- /user POST
    - headers -> Authorization - [Bearer token]
    * body
    ```json
    { 
        "firstName": "first", 
        "lastName": "last", 
        "email": "example@mail.com", 
        "phone": "+919393939393", 
        "password": "password123", 
        "confirmPassword": "password123"
    }
    ```

- /blog GET
    - headers -> Authorization - [Bearer token]
    
- /blog/:id GET
    - headers -> Authorization - [Bearer token]

- /blog POST
    - headers -> Authorization - [Bearer token]
    * body
    ```json
    {
        "title": "this is blog title",
        "content": "this is blog content"
    }
    ```
    
- /blog/:id PUT
    - headers -> Authorization - [Bearer token]
    * body (atleast one field is required)
    ```json
    {
        "title": "this is blog title",
        "content": "this is blog content"
    }
    ```
- /blog/:id DELETE
