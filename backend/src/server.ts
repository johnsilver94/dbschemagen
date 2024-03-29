import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./controllers/book.resolver";
import { RecipeResolver } from "./controllers/recipe.resolver";
import dotenv from "dotenv";
import path from "path";
import { IBuildSchemaOptions, redis } from "./plugins/redis";
import { logger } from "./plugins/logging";
import { connection } from "./database";

dotenv.config();

connection();

async function initServer() {
	// create express app
	const app = express();
	app.use(bodyParser.json());

	// register express routes from defined application routes
	Routes.forEach((route) => {
		(app as any)[route.method](
			route.route,
			(req: Request, res: Response, next: Function) => {
				const result = new (route.controller as any)()[route.action](
					req,
					res,
					next
				);
				if (result instanceof Promise) {
					result.then((result) =>
						result !== null && result !== undefined
							? res.send(result)
							: undefined
					);
				} else if (result !== null && result !== undefined) {
					res.json(result);
				}
			}
		);
	});

	const schemaOptions: IBuildSchemaOptions = {
		resolvers: [BookResolver, RecipeResolver],
		// pubSub: redis,
		emitSchemaFile: path.resolve(__dirname, "schema.gql"),
	};
	// setup express app here
	const schema = await buildSchema(schemaOptions);

	const server = new ApolloServer({
		schema,
		playground: true,
		engine: { debugPrintReports: true },
		plugins: [logger],
	});
	server.applyMiddleware({ app });

	// start server
	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => {
		console.log(`Server 🚀 on http://localhost:${PORT}${server.graphqlPath}`);
		console.log(`Open http://localhost:${PORT}/users to see rest`);
	});
}

initServer();
