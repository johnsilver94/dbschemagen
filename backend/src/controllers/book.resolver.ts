import {
	Resolver,
	Query,
	Mutation,
	Arg,
	PubSub,
	PubSubEngine,
} from "type-graphql";
import { Book } from "../models/book";
import { CreateBookInput, UpdateBookInput } from "../graphql/book";

@Resolver(() => Book)
export class BookResolver {
	@Query(() => [Book])
	async books(@PubSub() pubSub: PubSubEngine) {
		const books: Book[] = await Book.find();
		pubSub.publish("BOOKS", books);
		return books;
	}

	@Query(() => Book)
	async book(@Arg("id") id: string) {
		return Book.findOne({ where: { id } });
	}

	@Mutation(() => Book)
	async createBook(@Arg("data") data: CreateBookInput) {
		const book = Book.create(data);
		await book.save();
		return book;
	}

	@Mutation(() => Book)
	async updateBook(@Arg("id") id: string, @Arg("data") data: UpdateBookInput) {
		const book = await Book.findOne({ where: { id } });
		if (!book) throw new Error("Book not found!");
		Object.assign(book, data);
		await book.save();
		return book;
	}

	@Mutation(() => Boolean)
	async deleteBook(@Arg("id") id: string) {
		const book = await Book.findOne({ where: { id } });
		if (!book) throw new Error("Book not found!");
		await book.remove();
		return true;
	}
}
