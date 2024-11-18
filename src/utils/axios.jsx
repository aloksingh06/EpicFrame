import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTVlYjhlMDc0MmQzOGQ1MTZlNzFkOWRiODQ3NzY4YiIsIm5iZiI6MTcyNzc2NDExOS42ODk5NTMsInN1YiI6IjY2ZmFkZTM4YzU5YTJkYjMyZGQwMjE3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oFQW63G-OCLN2IF0-BAkzroaktZlJN7xdKbrFDzNNuY'
    }
})

export default instance;