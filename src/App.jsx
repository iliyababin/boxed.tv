import React from 'react';
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import Content from "./components/Content/Content";
import MovieModal from "./components/MovieModal/MovieModal";
import {useSelector} from "react-redux";
import {isEnabled} from "./redux/reducers/movieModalSlice";

function App() {

    const movieModalEnabled = useSelector(isEnabled);

    return (
        <div>
            <div className="flex flex-col">
                <NavBar/>
                <div className="flex h-fit">
                    <SideBar/>
                    <Content/>
                </div>
            </div>
            {movieModalEnabled &&
                <div className="fixed top-0 left-0 bg-black w-full h-full flex items-center justify-center bg-opacity-50 z-50">
                    <MovieModal/>
                </div>
            }
        </div>
  );
}

export default App;
