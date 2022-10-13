import { configureStore } from '@reduxjs/toolkit'
import movieModalReducer from "./reducers/movieModalSlice";
import selectedGenresSlice from "./reducers/selectedGenresSlice";

export const store = configureStore({
    reducer: {
        movieModal: movieModalReducer,
        selectedGenres: selectedGenresSlice,
    },
})