export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'SECRET_KEY', // TODO: Хранить в .env
  expiresIn: '1h',
};
