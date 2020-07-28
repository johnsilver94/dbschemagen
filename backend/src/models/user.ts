import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class User {
	@Field(() => ID)
	@ObjectIdColumn()
	id: ObjectID;

	@Field(() => String)
	@Column()
	firstName: string;

	@Field(() => String)
	@Column()
	lastName: string;

	@Field(() => Number)
	@Column()
	age: number;
}
