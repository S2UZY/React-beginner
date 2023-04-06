import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetails(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(details);
  return loading ? (
    <span className={styles.loader}>Loading...</span>
  ) : (
    <div>
      <span>
        <Link to="/" className={styles.back__btn}>
          Back
        </Link>
      </span>
      <div className={styles.container}>
        <img
          src={details.large_cover_image}
          alt="movieImg"
          className={styles.movie__img}
        />
        <div>
          <h1>{details.title}</h1>
          <div>{details.year}</div>
          <div>{details.rating}</div>
          <div>{details.description_full}</div>
        </div>
      </div>
    </div>
  );
}
export default Detail;
