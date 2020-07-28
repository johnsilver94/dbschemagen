import { createConnection } from "typeorm";
import { createMocks } from "./database/mock";

export async function connection(): Promise<void> {
	createConnection({
		type: "mongodb",
		host: process.env.TYPEORM_HOST || "localhost",
		port: Number(process.env.TYPEORM_PORT) || 3306,
		// username: process.env.TYPEORM_USERNAME ||"root",
		// password: process.env.TYPEORM_PASSWORD || "admin",
		database: process.env.TYPEORM_DATABASE || "typeorm",
		entities: [__dirname + "/models/*{.js,.ts}"],
		subscribers: [__dirname + "/database/subscribers/*{.js,.ts}"],
		migrations: [__dirname + "/database/migrations/*{.js,.ts}"],
		synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE) || true,
		logging: "all",
	})
		.then(async (connection) => {
			createMocks(connection);
		})
		.catch((error) => console.log(error));
}
