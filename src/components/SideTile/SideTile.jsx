import React from "react";
import {motion} from "framer-motion";
import {addGenre, removeGenre, selectSelectedGenres} from "../../redux/reducers/selectedGenresSlice";
import {useDispatch, useSelector} from "react-redux";

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

    return(
        <motion.div
            whileHover={{scale: 1.05}}
        >
            <li
                key={props.genre.id}
                id={props.genre.id}
                className={
                    highlighted
                        ?
                        "p-3 bg-purple-800 rounded-xl rounded-r-none duration-200 select-none"
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