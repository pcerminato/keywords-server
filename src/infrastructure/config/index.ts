const config = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  LOGIN_USER_NAME: process.env.LOGIN_USER_NAME,
  LOGIN_PASSWORD: process.env.LOGIN_PASSWORD,
  UI_URL: process.env.UI_URL,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

export default config;
