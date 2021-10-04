import { doc, getDoc } from "firebase/firestore";
import { defaultFirestore as fs } from "../lib/firebase.prod";

async function selectionFilter() {
    const dataCalMovieSeries = doc(fs, "Store", "series");
    const dataCalMovieFilms = doc(fs, "Store", "films");

    const MovieSeries = await getDoc(dataCalMovieSeries);
    const MovieFilms = await getDoc(dataCalMovieFilms);

    if (MovieSeries.exists() && MovieFilms.exists()) {
        if (MovieSeries.data() && MovieFilms.data()) {
            return {
                MovieSeries: [
                    {
                        title: "Documentaries",
                        data: MovieSeries.data().dataMovieSeries.filter(
                            item => item.genre === "documentaries"
                        ),
                    },
                    {
                        title: "Comedies",
                        data: MovieSeries.data().dataMovieSeries.filter(
                            item => item.genre === "comedies"
                        ),
                    },
                    {
                        title: "Children",
                        data: MovieSeries.data().dataMovieSeries.filter(
                            item => item.genre === "children"
                        ),
                    },
                    {
                        title: "Crime",
                        data: MovieSeries.data().dataMovieSeries.filter(
                            item => item.genre === "crime"
                        ),
                    },
                    {
                        title: "Feel Good",
                        data: MovieSeries.data().dataMovieSeries.filter(
                            item => item.genre === "feel-good"
                        ),
                    },
                ],
                MovieFilms: [
                    {
                        title: "Drama",
                        data: MovieFilms.data().dataMovieFilms.filter(
                            item => item.genre === "drama"
                        ),
                    },
                    {
                        title: "Thriller",
                        data: MovieFilms.data().dataMovieFilms.filter(
                            item => item.genre === "thriller"
                        ),
                    },
                    {
                        title: "Children",
                        data: MovieFilms.data().dataMovieFilms.filter(
                            item => item.genre === "children"
                        ),
                    },
                    {
                        title: "Suspense",
                        data: MovieFilms.data().dataMovieFilms.filter(
                            item => item.genre === "suspense"
                        ),
                    },
                    {
                        title: "Romance",
                        data: MovieFilms.data().dataMovieFilms.filter(
                            item => item.genre === "romance"
                        ),
                    },
                ],
            };
        }
    }
}

export default selectionFilter;
