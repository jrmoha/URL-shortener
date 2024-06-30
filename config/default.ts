// eslint-disable-next-line no-useless-escape
export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  log_level: "info",
  SHORT_URL_MAX_LENGTH: 6,
  URL_MAX_LENGTH: 2048,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ex: 60 * 60 * 24,
  },
};
