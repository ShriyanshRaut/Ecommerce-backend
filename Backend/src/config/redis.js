import Redis from "ioredis";

let redis = null;

if (process.env.REDIS_URL) {
  //  Production (Render / Cloud Redis)
  redis = new Redis(process.env.REDIS_URL);

  redis.on("connect", () => {
    console.log(" Redis connected (cloud)");
  });

  redis.on("error", (err) => {
    console.error("Redis error:", err);
  });

} else {
  //  Local fallback
  try {
    redis = new Redis({
      host: "127.0.0.1",
      port: 6379,
    });

    redis.on("connect", () => {
      console.log(" Redis connected (local)");
    });

    redis.on("error", (err) => {
      console.warn(" Redis not available, skipping...");
    });

  } catch {
    console.warn(" Redis disabled");
  }
}

export default redis;