import React from "react";
import {motion} from "framer-motion";
import {addGenre, removeGenre} from "../../redux/reducers/selectedGenresSlice";
import {useDispatch} from "react-redux";

export default function SideTile(props){

    const [highlighted, setHighlighted] = React.useState(false);
    const dispatch = useDispatch();

    function toggleHighlighted(){
        setHighlighted(prevState => !prevState);
        if(!highlighted){
            dispatch(addGenre(props.genre.id));
        } else {
            dispatch(removeGenre(props.genre.id));
        }
    }

    const animations = {
        empty: {
            opacity: 0
        },
        fadeIn: {
            opacity: 100,
            transition: {duration: 1*props.pos}
        }
    }

    return(
        <motion.div
            variants={animations}
            initial="empty"
            animate="fadeIn"
            whileTap={{scale:0.92}}
            whileHover={{scale: 1.05}}

        >
            <li
                key={props.genre.id}
                id={props.genre.id}
                className={
                    highlighted
                        ?
                        "p-3 bg-cyan-600 rounded-xl rounded-r-none duration-200 select-none"
                        :
                        "p-3 hover:bg-neutral-900 rounded-xl rounded-r-none duration-200 select-none"
                }
                onClick={toggleHighlighted}
            >
                {props.genre.name}
            </li>
        </motion.div>
    );
}