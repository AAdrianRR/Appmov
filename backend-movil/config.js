require('dotenv').config();

module.exports = {
  SECRET_KEY: process.env.JWT_SECRET || 'secretoSuperRENACE2025',
  MONGO_URI: process.env.MONGO_URI,
  API_PORT: process.env.PORT || 3000
};
