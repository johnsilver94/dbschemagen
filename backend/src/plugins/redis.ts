import { RedisPubSub } from "graphql-redis-subscriptions";
import { BuildContextOptions } from "type-graphql/dist/schema/build-context";
import Redis, { RedisOptions } from "ioredis";
import { BuildSchemaOptions } from "type-graphql";

const options: RedisOptions = {
	host: process.env.REDIS_HOST || "127.0.0.1",
	port: Number(process.env.REDIS_PORT) || 6379,
	retryStrategy: (time) => Math.max(time * 100, 3000),
};

export const redis = new RedisPubSub({
	publisher: new Redis(options),
	subscriber: new Redis(options),
});

export interface IBuildSchemaOptions
	extends BuildContextOptions,
		BuildSchemaOptions {}
