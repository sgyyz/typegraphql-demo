import { Movie } from "../entity/Movie";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { Tag } from "../entity/Tag";

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int, { nullable: true })
  minutes?: number | null;

  @Field(() => [String])
  tags: string[]
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async createMovie(
    @Arg("options", () => MovieInput) options: MovieInput
  ) {

    const movie = await Movie.create({
      title: options.title,
      minutes: options.minutes,
      tags: options.tags.map(t => {
        const newTage = new Tag();
        newTage.name = t;
        return newTage;
      })
    }).save();

    return movie;
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieInput) input: MovieInput
  ) {
    await Movie.update({ id }, {
      title: input.title,
      minutes: input.minutes
    });
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
    return Movie.createQueryBuilder("movie")
    .leftJoinAndSelect("movie.tags", "tags")
    .getMany()
  }
}