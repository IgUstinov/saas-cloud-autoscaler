curl -X POST http://localhost:3000/users \
 -H "Content-Type: application/json" \
 -d '{"email": "user@example.com", "password": "123456"}'

curl -X GET http://localhost:3000/users/user@example.com
