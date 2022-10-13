import React from 'react';
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import Content from "./components/Content/Content";
import MovieModal from "./components/MovieModal/MovieModal";
import {useSelector} from "react-redux";
import {isEnabled} from "./redux/reducers/movieModalSlice";
import SearchResults from "./components/SearchResults/SearchResults";
import {RiMovie2Fill} from "react-icons/ri";

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
                <div
                    className="fixed top-0 left-0 bg-black w-full h-full flex items-center justify-center bg-opacity-50 z-50"
                >
                    <MovieModal/>
                </div>
            }
        </div>
  );
}

export default App;

/*
<div className="flex h-screen items-center justify-center text-neutral-100">
    <div className=" bg-neutral-900 rounded ">
        <div className="p-20 flex flex-col items-center gap-1.5">
            <div className="flex items-center">
                <RiMovie2Fill className="text-neutral-100 text-2xl text-purple-600"/>
                <p className="text-neutral-100  text-2xl">Movie-Vision</p>
            </div>
            <div className="flex items-center gap gap-1.5">
                <p className="text-xs text-neutral-400">Powered by</p>
                <img className="h-2" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"/>
            </div>
        </div>
        <div className="bg-neutral-800 p-5 flex flex-col gap-1">
            <h1 className="text-sm">Enter TMDB key:</h1>
            <input
                type="text" id="simple-search"
                className="bg-neutral-800 border border-neutral-700 text-neutral-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full"
                placeholder="api_key..."
            />
            <p className="text-xs flex gap-1 text-neutral-400">
                Don't have a key?
                <a
                    className="text-purple-400"
                    target="_blank"
                    href="https://www.themoviedb.org/settings/api/request"
                >
                    Sign up here.
                </a>
            </p>
        </div>
    </div>
</div>*/
