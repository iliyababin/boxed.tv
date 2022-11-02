import {motion} from "framer-motion";

export default function MovieProvider(props){
    return(
        <motion.div
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            transition={{duration: 0.05}}
            className="flex flex-col items-center w-20 p-2 gap-1.5 rounded-xl hover:bg-neutral-900 duration-200"
        >
            <img
                className="rounded-full w-10"
                src={`https://image.tmdb.org/t/p/w200/${props.movieProvider.logo_path}`}
            />
            <p className="text-xs text-neutral-300">
                {props.movieProvider.provider_name.split(' ').slice(0,1).join(' ')}
            </p>
        </motion.div>
    );
}