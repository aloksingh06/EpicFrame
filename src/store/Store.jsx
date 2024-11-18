import { configureStore } from "@reduxjs/toolkit";
import tvReducer from "./Reducers/TvSlice"
import movieReducer from "./Reducers/MovieSlice"
import personReducer from "./Reducers/PeopleSlice"

export const store = configureStore({
    reducer:{
        tv:tvReducer,
        movie:movieReducer,
        person:personReducer
    }
})