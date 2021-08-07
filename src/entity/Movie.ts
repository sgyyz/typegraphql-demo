import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

  @OneToMany(() => Tag, tag => tag.movie, { cascade: true })
  @JoinColumn()
  @Field(() => [Tag], { nullable: true })
  tags: Tag[] | null
}