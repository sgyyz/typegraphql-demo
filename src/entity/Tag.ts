import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Movie, movie => movie.tags)
  movie: Movie
}