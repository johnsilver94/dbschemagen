import { Connection } from "typeorm";
import { User } from "../models/user";
import { Book } from "../models/book";
import { Recipe } from "../models/recipe";
import { plainToClass } from "class-transformer";
import { recipes } from "./data/recipes";
import { users } from "./data/users";
import { books } from "./data/books";
import { ClassType } from "class-transformer/ClassTransformer";

// insert new users for test
export const createMocks = async (connection: Connection) => {
	await insertModelToDb(Recipe, recipes);
	await insertModelToDb(User, users);
	await insertModelToDb(Book, books);

	async function insertModelToDb(model: ClassType<Object>, list: Object[]) {
		await connection.manager.clear(model).catch((error) => {
			console.log(error);
		});

		await plainToClass(model, list).forEach(async (element) => {
			// console.log(element);
			await connection.manager.save(connection.manager.create(model, element));
		});
	}
};
