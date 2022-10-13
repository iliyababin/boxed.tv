import React from "react";
import {AiFillStar} from "react-icons/ai";
import {showMovie} from "../../redux/reducers/movieModalSlice";
import {useDispatch} from "react-redux";
import {motion} from "framer-motion";

export default function SearchMovieTile(props){

    const year = props.movie.release_date.split("-");
    const dispatch = useDispatch();

    return(
        <motion.div
            className="p-1.5 text-neutral-100 hover:bg-neutral-900 cursor-pointer"
            onClick={() => dispatch(showMovie(props.movie.id))}
        >
            <div
                className="flex h-16"
            >
                <img
                    className="rounded aspect-[2/3]"
                    src={`https://image.tmdb.org/t/p/w400${props.movie.poster_path}`}
                    alt="Couldn't find image"
                    onError={({currentTarget}) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "https://images.unsplash.com/photo-1662675117392-561a414fcefc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
                    }}
                />
                <div className="flex-col ml-3">
                    <p>{props.movie.title}</p>
                    <div className="flex items-center text-yellow-500">
                        <AiFillStar size={12} />
                        <p className="text-xs text-neutral-400 ml-1">{`${props.movie.vote_average} • ${props.movie.vote_count.toLocaleString()} votes • ${year[0] || "N/A"}`}</p>
                    </div>
                    <p className="text-xs text-neutral-500 line-clamp-1">{props.movie.overview}</p>
                </div>
            </div>
        </motion.div>
    );
}