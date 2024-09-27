import {useEffect, useState} from "react";
import api from "../../services/api";

// URL DA API: /movie/now_playing?api_key=3d3ead3c05d27f6eb1d604befda8b752

function Home() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        async function loadMovies() {
            const response = await api.get("/movie/now_playing", {
                params: {
                    api_key: "3d3ead3c05d27f6eb1d604befda8b752",
                    language: "pt-BR",
                    page: 1,
                }
            });
            console.log(response.data.results);
        }

        loadMovies();
    }, []);

    return (
        <div>
            <h1>Bem vindo a Home</h1>
        </div>
    )
}

export default Home;