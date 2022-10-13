import { createSlice } from '@reduxjs/toolkit'

export const movieModalSlice = createSlice({
    name: 'movieModal',
    initialState: {
        enabled: false,
        movieId: 27205
    },
    reducers: {
        hide: (state) => {
            state.enabled = false
        },
        showMovie: (state, action) => {
            state.enabled = true
            state.movieId = action.payload
        },
    },
})

export const { hide, showMovie } = movieModalSlice.actions

export const isEnabled = (state) => state.movieModal.enabled
export const selectMovieId = (state) => state.movieModal.movieId

export default movieModalSlice.reducer
