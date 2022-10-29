export default function CastTile(props){
    return(
        <div className="flex p-3  hover:bg-neutral-700 2 select-none duration-100">
            <img
                className="object-cover w-14 h-14 rounded mr-3"
                src={ props.person.profile_path === null ?
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    :
                    `https://image.tmdb.org/t/p/w200/${props.person.profile_path}`
                }
            />
            <div className="flex flex-col justify-center">
                <p className="text-sm">{props.person.original_name}</p>
                <p className="text-sm text-neutral-400">{props.person.character}</p>
            </div>
        </div>
    );
}