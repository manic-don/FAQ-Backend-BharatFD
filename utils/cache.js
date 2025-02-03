const redis = require("../config/redis");

module.exports = {
  get: async (key) => {
    try {
      const data = await redis.get(key);
      return data;
    } catch (err) {
      console.error("Redis GET Error:", err);
      return null;
    }
  },

  set: async (key, value, ttl = 3600) => {
    try {
      await redis.setex(key, ttl, value);
    } catch (err) {
      console.error("Redis SET Error:", err);
    }
  },

  del: async (key) => {
    try {
      await redis.del(key);
    } catch (err) {
      console.error("Redis DEL Error:", err);
    }
  },
};
