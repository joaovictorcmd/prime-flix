import "./movie-info.css";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../services/api";
import {toast} from "react-toastify";

function Movie() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovie() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "3d3ead3c05d27f6eb1d604befda8b752",
                    language: "pt-BR"
                }
            })
                .then((response) => {
                    setMovie(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    navigate("/", {replace: true});
                    return;
                });
        }

        loadMovie();

        return () => {
            console.log("Componente foi desmontado");
        }
    }, [id, navigate]);

    function saveMovie() {
        const myList = localStorage.getItem("@primeflix");

        let savedMovies = JSON.parse(myList) || [];

        const hasMovie = savedMovies.some((savedMovie) => savedMovie.id === movie.id)

        if (hasMovie) {
            toast.warn("Esse filme já está na sua lista!");
            return;
        } else {
            savedMovies.push(movie);
            localStorage.setItem("@primeflix", JSON.stringify(savedMovies));
            toast.success("Filme salvo com sucesso!");
        }
    }

    if (loading) {
        return (
            <div className={'movie-info'}>
                <h1>CARREGANDO DETALHES...</h1>
            </div>
        )
    }

    return (
        <div className={'movie-info'}>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
            <h3>Sinopse</h3>
            <p>{movie.overview}</p>
            <strong>Avaliação: {movie.vote_average} / 10</strong>

            <div className={'buttons-area'}>
                <button onClick={saveMovie}>Salvar</button>
                <button>
                    <a href={`https://www.youtube.com/results?search_query=movie+${movie.title}+trailer`}
                       target={"blank"} rel={"external"}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Movie;