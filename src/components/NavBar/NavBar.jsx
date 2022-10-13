import {RiMovie2Fill, RiMenuFill} from "react-icons/ri";
import React from "react";
import SearchResults from "../SearchResults/SearchResults";
import {useDetectClickOutside} from "react-detect-click-outside";

export default function NavBar(){

    const [search, setSearch] = React.useState("");
    const [showSearch, setShowSearch] = React.useState(false);
    const ref = useDetectClickOutside({ onTriggered: toggleSearchOff });

    function handleSetSearch(event){
        setSearch(prevState => event.target.value);
    }

    function toggleSearchOn(){
        setShowSearch(true);
    }

    function toggleSearchOff(){
        setShowSearch(false);
    }

    const [secretModal, setSecretModal] = React.useState(false);

    return(
        <div className="p-4 drop-shadow-xl flex bg-neutral-800 sticky top-0 z-40 w-screen">
            <div className="flex items-center gap-1.5 cursor-pointer">
                <RiMovie2Fill className="text-neutral-100 text-2xl text-purple-600"/>
                <p className="text-neutral-100  text-2xl">Movie-Vision</p>
            </div>
            <form className="relative flex w-1/2  ml-10" ref={ref}>
                <input
                    type="text" id="simple-search"
                    className="bg-neutral-800 border border-neutral-700 text-neutral-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSetSearch}
                    onMouseDown={toggleSearchOn}
                />
                { showSearch &&
                    <SearchResults search={search}/>
                }
            </form>
        </div>
    );
}