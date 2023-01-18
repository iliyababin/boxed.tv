import React from "react";
import {AiFillStar, AiOutlinePlayCircle} from "react-icons/ai";
import {IoMdClose} from "react-icons/io";
import {TbRotate360} from "react-icons/tb";
import API from "../../services/API";
import {useDispatch, useSelector} from "react-redux";
import {hide, isEnabled, selectMovieId} from "../../redux/reducers/movieModalSlice";
import {motion, useAnimationControls} from "framer-motion";
import CastTile from "../CastTile/CastTile";
import MovieProvider from "../MovieProvider/MovieProvider";
import {useDetectClickOutside} from "react-detect-click-outside";

export default function MovieModal(){

    const movieId = useSelector(selectMovieId);
    const dispatch = useDispatch();

    const [movie, setMovie] = React.useState([]);
    const [genres, setGenres] = React.useState();
    const [runtime, setRuntime] = React.useState(0);
    const [cast, setCast] = React.useState()
    const [watchProviders, setWatchProviders] = React.useState([]);

    const [flipped, setFlipped] = React.useState(false);


    React.useEffect(() => {
        API.get(`/movie/${movieId}`)
            .then(response => {
                setMovie(response.data);
                setGenres(response.data.genres.map((genre, i) => {
                    return `${genre.name}${response.data.genres.length > ++i ? ", " : ""}`;
                }));
                setRuntime(response.data.runtime ?
                    `${Math.floor(response.data.runtime / 60)}hr ${response.data.runtime % 60}m`
                    :
                    null
                )
            });
        API.get(`/movie/${movieId}/credits`)
            .then(response => {
                setCast(response.data.cast.map((person, i) => {
                    return <CastTile key={i} person={person}/>
                }));

            });
        API.get(`/movie/${movieId}/watch/providers`)
            .then(response => {
                const data = response.data.results.US.flatrate.slice(0,5);
                setWatchProviders(data.map(movieProvider => <MovieProvider key={movieProvider.provider_id} movieProvider={movieProvider}/>));
            });
    }, [movieId]);

    const controls = useAnimationControls()

    function toggleFlip(){
        setFlipped(prevState => !prevState)
    }

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    function getTrailer(){
        API.get(`/movie/${movieId}/videos`)
            .then(response => {
                for(let i = 0; i < response.data.results.length; i++){
                    if(response.data.results[i].type === "Trailer"){
                        openInNewTab(`https://www.youtube.com/watch?v=${response.data.results[i].key}`)
                        break;
                    }
                }
                response.data.results.map(video => {
                    if(video.type === "Trailer") return video
                })
            });
    }

    return(
        <motion.div
            className="absolute bg-neutral-800 rounded-xl text-neutral-100 w-[700px] h-96 drop-shadow-2xl"
            animate={controls}
        >
            <div className="flex gap-2 absolute right-3 top-3">
                <motion.div
                    whileHover={{scale: 1.15}}
                    whileTap={{scale: 0.9}}
                >
                    <TbRotate360
                        className="cursor-pointer"
                        size={18}
                        onClick={toggleFlip}
                    />
                </motion.div>
                <motion.div
                    whileHover={{scale: 1.15}}
                    whileTap={{scale: 0.9}}
                >
                    <IoMdClose
                        className="cursor-pointer"
                        size={18}
                        onClick={() => dispatch(hide())}
                    />
                </motion.div>
            </div>
            {
                !flipped ?
                <div className="flex">
                    <div className="flex-shrink-0 h-96 relative cursor-pointer" onClick={getTrailer}>
                        <img
                            className="h-96 rounded-l-xl "
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt="Couldn't find image"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-neutral-900 block opacity-0 hover:opacity-30 duration-300 flex items-center justify-center active:opacity-50">
                            <AiOutlinePlayCircle size={64}/>
                        </div>
                    </div>

                    <div className="">
                        <div className="p-6 flex flex-col ">
                            <h1 className="text-3xl ">{movie.title}</h1>
                            <div className="flex items-center gap-1">
                                <AiFillStar size="14" color="#EAB308"/>
                                <h4 className="text-sm text-neutral-500">{movie.vote_average} • {movie.vote_count} votes
                                    • {movie.release_date}</h4>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm text-neutral-300 line-clamp-5">
                                    <strong>Overview: </strong>
                                    {movie.overview}
                                </h4>
                                <h4 className="text-sm text-neutral-300 line-clamp-1">
                                    <strong>Genres: </strong>
                                    {genres}
                                </h4>
                                { runtime &&
                                    <h4 className="text-sm text-neutral-300 line-clamp-1">
                                        <strong>Runtime: </strong>
                                        {runtime}
                                    </h4>
                                }
                                { watchProviders.length > 0 &&
                                    <div className="flex flex-col gap-1.5 ">
                                        <h4 className="text-sm text-neutral-300 line-clamp-6">
                                            <strong>Watch Providers: </strong>
                                        </h4>
                                        <div className="flex ">
                                            {watchProviders}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="h-96 flex flex-col">
                    <div className="flex gap-1 items-center p-3">
                        <h1 className="text-neutral-200">Credits</h1>
                    </div>
                    <hr className="border-neutral-700"/>
                    <div className="h-full overflow-x-hidden overflow-y-scroll">
                        <div className="div_columns columns-2 overflow-x-hidden overflow-y-hidden ">
                            {cast}
                        </div>
                    </div>
                </div>
            }
        </motion.div>
    );
}