import { doc, onSnapshot } from "firebase/firestore";
import { defaultFirestore as fs } from "../lib/firebase.prod";

async function selectionFilter({ setSlideRows, categoryFilter }) {
  const dataCalMovieSeries = doc(fs, "Store", "series");
  const dataCalMovieFilms = doc(fs, "Store", "films");

  if (categoryFilter) {
    switch (categoryFilter) {
      case "MovieSeries":
        await onSnapshot(dataCalMovieSeries, data => {
          setSlideRows([
            {
              title: "Documentaries",
              data: data.data().dataMovieSeries.filter(
                item => item.genre === "documentaries"
              ),
            },
            {
              title: "Comedies",
              data: data.data().dataMovieSeries.filter(
                item => item.genre === "comedies"
              ),
            },
            {
              title: "Children",
              data: data.data().dataMovieSeries.filter(
                item => item.genre === "children"
              ),
            },
            {
              title: "Crime",
              data: data.data().dataMovieSeries.filter(
                item => item.genre === "crime"
              ),
            },
            {
              title: "Feel Good",
              data: data.data().dataMovieSeries.filter(
                item => item.genre === "feel-good"
              ),
            },
          ])
        });
        break
      case "MovieFilms":
        await onSnapshot(dataCalMovieFilms, data => {
          setSlideRows([
            {
              title: "Drama",
              data: data.data().dataMovieFilms.filter(
                item => item.genre === "drama"
              ),
            },
            {
              title: "Thriller",
              data: data.data().dataMovieFilms.filter(
                item => item.genre === "thriller"
              ),
            },
            {
              title: "Children",
              data: data.data().dataMovieFilms.filter(
                item => item.genre === "children"
              ),
            },
            {
              title: "Suspense",
              data: data.data().dataMovieFilms.filter(
                item => item.genre === "suspense"
              ),
            },
            {
              title: "Romance",
              data: data.data().dataMovieFilms.filter(
                item => item.genre === "romance"
              ),
            },
          ])
        });
        break
      default:
        return false
    }
  }
}

export default selectionFilter;
