# Регистрация пользователей
curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "123456"}'

# Логин (получение JWT)
curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "123456"}'

## Ответ
{ "access_token": "eyJhbGciOiJIUzI1..." }


# Доступ к защищенному маршруту
curl -X POST http://localhost:3000/auth/profile \
     -H "Authorization: Bearer <access_token>"
