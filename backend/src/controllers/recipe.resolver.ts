import {
	Resolver,
	Query,
	FieldResolver,
	Arg,
	Root,
	Mutation,
	Int,
	ResolverInterface,
} from "type-graphql";
import { plainToClass } from "class-transformer";

import { Recipe } from "../models/recipe";
import { RecipeInput } from "../graphql/recipe";

@Resolver(() => Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {
	@Query(() => Recipe, { nullable: true })
	async recipe(@Arg("title") title: string): Promise<Recipe | undefined> {
		return Recipe.findOne({ where: { title } });
	}

	@Query(() => [Recipe], {
		description: "Get all the recipes from around the world ",
	})
	async recipes(): Promise<Recipe[]> {
		return Recipe.find();
	}

	@Mutation(() => Recipe)
	async addRecipe(@Arg("recipe") recipeInput: RecipeInput): Promise<Recipe> {
		const recipe = plainToClass(Recipe, {
			description: recipeInput.description,
			title: recipeInput.title,
			ratings: [],
			creationDate: new Date(),
		});

		return Recipe.create(recipe);
	}

	@FieldResolver()
	ratingsCount(
		@Root() recipe: Recipe,
		@Arg("minRate", (type) => Int, { defaultValue: 0.0 }) minRate: number
	): number {
		return recipe.ratings.filter((rating) => rating >= minRate).length;
	}
}
