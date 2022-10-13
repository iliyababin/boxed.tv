import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json"
    },
});

instance.interceptors.request.use(
    (config) => {
        // TODO: Utilize environment variables. Using throwaway account for now.
        config.headers["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjdiYTRmOWIwODBhNmEwNDQxMmNmMTIwYTU4YjM4NiIsInN1YiI6IjYzNDYyZGY5MDBmYjZiMDA3OWY0ODllMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dsI7u_kFT_X0nXLUQOsTMDL2odaF2PhFr5pe2gU7V2M`;
        return config;
    },
    (error) => {
        console.log("REQUEST ERROR")
        return Promise.reject(error);
    }
)

export default instance;