import dotenv from "dotenv";


dotenv.config();

export const env = {
  /* HTTP port to listen*/
  PORT: process.env.PORT || 4000,
  /*Mongo connection string */
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/mini_ai_app",
  
  /** OpenAI API key */
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || ''
};