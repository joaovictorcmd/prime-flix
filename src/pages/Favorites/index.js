import "./favorites.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Favorites() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        const myList = localStorage.getItem("@primeflix");
        setMovies((JSON.parse(myList)) || []);

    }, [movies]);

    function deleteMovie(id) {
        let moviesFilter = movies.filter( (item) => {
            return (item.id !== id)
        });

        setMovies(moviesFilter);

        localStorage.setItem("@primeflix", JSON.stringify(moviesFilter));
    }

    return (
        <div className={"my-movies"}>
            <h1>Meus Filmes</h1>

            {movies.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}

            <ul>
                {movies.map((item) => {
                        return (
                            <li key={item.id}>
                                <span>{item.title}</span>
                                <div>
                                    <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                                    <button onClick={() => deleteMovie(item.id)}>Excluir</button>
                                </div>
                            </li>
                        )
                    }
                )}
            </ul>

        </div>
    )
}

export default Favorites;