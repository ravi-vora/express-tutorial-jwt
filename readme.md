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
    * body
    -- { firstName, lastName, email, phone, password, confirmPassword }