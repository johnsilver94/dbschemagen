import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from "typeorm";
import { Field, ObjectType, Int, Float, ID } from "type-graphql";

@Entity()
@ObjectType({ description: "Object representing cooking recipe" })
export class Recipe extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	id: ObjectID;

	@Field()
	@Column()
	title: string;

	@Field({
		nullable: true,
		description: "The recipe description with preparation info",
	})
	@Column()
	description?: string;

	@Field(() => [Int])
	@Column()
	ratings: number[];

	@Field()
	@Column()
	creationDate: Date;

	@Field(() => Int)
	@Column()
	ratingsCount: number;

	@Field(() => Float, { nullable: true })
	// @Column()
	get averageRating(): number | null {
		const ratingsCount = this.ratings.length;
		if (ratingsCount === 0) {
			return null;
		}
		const ratingsSum = this.ratings.reduce((a, b) => a + b, 0);
		return ratingsSum / ratingsCount;
	}
}
