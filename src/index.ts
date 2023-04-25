import { Genre, Movie } from "./index.types";
import { movies } from "./db.json";

const getRandomNumber = (limit: number): number => {
  return Math.floor(Math.random() * limit);
};

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  if (genres.length == 0) return [movies[getRandomNumber(movies.length)]];

  // The complexity is O(n)
  let result = movies
    .map((movie: Movie) => {
      const isMatch = movie.genres.every(
        (genre) => genres.find((_genre) => genre == _genre) != undefined
      );
      return {
        movie,
        isMatch,
      };
    })
    .filter((value) => value.isMatch)
    .map((val) => val.movie)
    .sort((a, b) => b.genres.length - a.genres.length);
  return result;
};
