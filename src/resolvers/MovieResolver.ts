import { Movie } from "../entity/Movie";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int, { nullable: true })
  minutes?: number | null;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async createMovie(
    @Arg("options", () => MovieInput) options: MovieInput
  ) {
    const movie = await Movie.create(options).save();
    return movie;
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieInput) input: MovieInput
  ) {
    await Movie.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteMovie(
    @Arg("id", () => Int) id: number
  ) {
    await Movie.delete({ id })
    return true;
  }

  @Query(() => [Movie])
  movies() {
    return Movie.find()
  }
}