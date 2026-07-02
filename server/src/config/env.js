require('dotenv').config();

// Basic validation to ensure required env vars exist
const requiredVars = ['PORT', 'CLIENT_URL', 'DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];
for (const envVar of requiredVars) {
  if (!process.env[envVar]) {
    console.warn(`Warning: Environment variable ${envVar} is missing.`);
  }
}

const env = {
  port: process.env.PORT || 3000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME || 'store_rating_app',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  },
  jwtSecret: process.env.JWT_SECRET || 'secret',
};

module.exports = { env };
