import { createSlice } from '@reduxjs/toolkit'

export const selectedGenresSlice = createSlice({
    name: 'selectedGenres',
    initialState: {
        genres: []
    },
    reducers: {
        addGenre: (state, action) => {
            state.genres = [...state.genres, action.payload]
        },
        removeGenre: (state, action) => {
            state.genres = state.genres.filter(el => parseInt(el) !== parseInt(action.payload))
        },
    },
})

export const { addGenre, removeGenre } = selectedGenresSlice.actions

export const selectSelectedGenres = (state) => state.selectedGenres.genres

export default selectedGenresSlice.reducer
