import React from "react";
import {AiFillStar} from "react-icons/ai";
import {IoMdClose} from "react-icons/io";
import API from "../../services/API";
import SearchMovieTile from "../SearchMovieTile/SearchMovieTile";
import {useDispatch, useSelector} from "react-redux";
import {hide, selectMovieId} from "../../redux/reducers/movieModalSlice";
import { motion } from "framer-motion";

export default function MovieModal(){

    const movieId = useSelector(selectMovieId);
    const dispatch = useDispatch();

    const [movie, setMovie] = React.useState([]);
    const [genres, setGenres] = React.useState();
    const [runtime, setRuntime] = React.useState(0);

    React.useEffect(() => {
        API.get(`/movie/${movieId}`)
            .then(response => {
                setMovie(response.data);
                setGenres(response.data.genres.map((genre, i) => {
                    return `${genre.name}${response.data.genres.length > ++i ? ", " : ""}`;
                }));
                setRuntime(`${Math.floor(response.data.runtime / 60)}hr ${response.data.runtime % 60}m`)
            })
    }, [movieId]);


    return(
        <motion.div
            className="absolute bg-neutral-800 rounded-xl text-neutral-100 w-[700px] flex drop-shadow-2xl"
            transition={{duration: 0.2}}
            initial={{scale: 0.95, opacity: 40}}
            animate={{ opacity: 1, scale: 1 }}
        >
            <IoMdClose className="absolute top-3 right-3 cursor-pointer" size={18} onClick={() => dispatch(hide())}/>
            <img
                className=" w-64 rounded-l-xl"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
            <div className="p-5">
                <div>
                    <h1 className="text-3xl">{movie.title}</h1>
                    <div className="flex items-center gap-1">
                        <AiFillStar size="14" color="#EAB308"/>
                        <h4 className="text-sm text-neutral-500">{movie.vote_average} • {movie.vote_count} votes • {movie.release_date}</h4>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-sm text-neutral-300 line-clamp-6">
                            <strong>Overview: </strong>
                            {movie.overview}
                        </h4>
                        <h4 className="text-sm text-neutral-300 line-clamp-6">
                            <strong>Genres: </strong>
                            {genres}
                        </h4>
                        <h4 className="text-sm text-neutral-300 line-clamp-6">
                            <strong>Runtime: </strong>
                            {runtime}
                        </h4>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
{/*<img
                    className="max-w-5xl"
                    src="https://image.tmdb.org/t/p/w200/iRV0IB5xQeOymuGGUBarTecQVAl.jpg"
                />*/}