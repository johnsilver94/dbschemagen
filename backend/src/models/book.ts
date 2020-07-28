import { Entity, BaseEntity, ObjectIdColumn, Column, ObjectID } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType({ description: "Object representing book" })
export class Book extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	id: ObjectID;

	@Field(() => String)
	@Column()
	title: string;

	@Field(() => String)
	@Column()
	author: string;

	@Field(() => Boolean)
	@Column({ default: false })
	isPublished: boolean;
}
