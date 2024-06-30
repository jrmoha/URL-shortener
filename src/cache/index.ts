import { Redis } from "ioredis";
import logger from "../utils/logger";
import config from "config";

export class RedisService {
  private static instance: RedisService;
  private readonly client: Redis;
  private is_connected: boolean = false;

  private constructor() {
    this.client = new Redis({
      host: config.get<string>("redis.host"),
      port: config.get<number>("redis.port"),
    });
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public async connect() {
    if (!this.is_connected) {
      this.client.on("connect", () => {
        logger.info("Redis connected");
        this.is_connected = true;
      });
      this.client.on("error", (err) => {
        logger.error("Redis connection error", err);
      });
    }
    return this.client;
  }

  get Client(): Redis {
    return this.client;
  }
}
