BASE URL = https://crm-server-2idetwzcb-shahinas-projects-d37b8b75.vercel.app
🔹 User

POST /api/users/register

Registers a new user

Body:

{
"username": "John Doe",
"password": "123456",
"role": "admin"
}

POST /api/users/login

Login user and return JWT

Body:

{
"username": "john",
"password": "J12345678#"
}

POST /api/users/logout

Logout user and clear JWT Token

🔹 Customers

POST api/customers/ – Create new customer (roles: admin)
body
{
"name":"Abdul",
"email":"a@gmail.com",
"phone_number":"009716544433456",
"address":"adc street,Uae",
}
GET /customers/ – Get all customers (roles: admin, user)
GET /customers/:id – Get customer by ID (roles: admin)
PATCH /customers/:id – Update customer (roles: admin)
DELETE /customers/:id – Delete customer (roles: admin)

🔹 Cases

POST /cases/ – Create new case (roles: admin, user)
body

{
"task_name":"button issue",
"description":"button not working properly"
"customer_id":"68eb9f3d65edb3840d7b6e49",
"assigned_to":"68eb9da69ab2ff3ddbd93037",
"priority":"high",
"status":"open"
}
GET /cases/ – Get all cases with populated customer & assigned user names (roles: admin, user)
GET /cases/:id – Get case by ID (roles: admin, user)
PATCH /cases/:id – Update case details (roles: admin, user)

🔹 Role Assignment & Permissions

Roles: admin, user

admin: full access (users, customers, cases)

user: can view assigned cases and customers and edit case

🔹 Error Handling

400: Validation errors

401: Unauthorized

403: Forbidden

404: Not found

500: Internal Server Error

🔹 Validation Rules

User: email valid & unique, password min 6 chars, one upper case,one lower case,one special character, role = admin or user

Customer: name required, valid email,valid phone number

Case: task_name required, priority = low|medium|high|urgent, status = open|in_progress|on_hold|resolved|closed,customer_id required,assigned_to required
