curl -X POST http://localhost:3002/auth/register \
 -H "Content-Type: application/json" \
 -d '{"email": "user@example.com", "password": "123456"}'

curl -X GET http://localhost:3002/users/user@example.com

curl -X POST http://localhost:3002/auth/register \
 -H "Content-Type: application/json" \
 -d '{"email": "user@example.com", "password": "123456"}'
