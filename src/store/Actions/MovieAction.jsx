import axios from "../../utils/axios";
import { loadmovie } from "../Reducers/MovieSlice";
export {removemovie} from "../Reducers/MovieSlice";

export const asyncloadmovie = (id) => async (dispatch,action)=>{
 try {
    const details = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`)
    const videos = await axios.get(`/movie/${id}/videos`)
    const translations = await axios.get(`/movie/${id}/translations`)
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`) 
    const theultimatedetails ={
        details: details.data,
        externalid: externalid.data,
        recommendations: recommendations.data.results,
        similar: similar.data.results,
        translations: translations.data.translations.map(l=>l.english_name),
        videos: videos.data.results.find((m)=>m.type=="Trailer"),
        watchproviders: watchproviders.data.results.IN,
    }
    dispatch(loadmovie(theultimatedetails))

 } catch (error) {
    console.error(error)
 }  
}