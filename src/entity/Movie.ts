import { Field, Int, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./Tag";

@Entity()
@ObjectType()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column("int", { default: 60 })
  @Field(() => Int)
  minutes?: number | null;

  @Field()
  fullName: string;

  @OneToMany(() => Tag, tag => tag.movie, { cascade: true })
  @Field(() => [Tag], { nullable: true })
  @TypeormLoader()
  tags: Tag[] | null
}