import axios from "../../utils/axios";
import { loadtv } from "../Reducers/TvSlice";
export {removetv} from "../Reducers/TvSlice";

export const asyncloadtv = (id) => async (dispatch,action)=>{
 try {
    const details = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`)
    const videos = await axios.get(`/tv/${id}/videos`)
    const translations = await axios.get(`/tv/${id}/translations`)
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`) 
    const theultimatedetails ={
        details: details.data,
        externalid: externalid.data,
        recommendations: recommendations.data.results,
        similar: similar.data.results,
        translations: translations.data.translations.map(l=>l.english_name),
        videos: videos.data.results.find((m)=>m.type=="Trailer"),
        watchproviders: watchproviders.data.results.IN,
    }
    dispatch(loadtv(theultimatedetails))

 } catch (error) {
    console.error(error)
 }  
}
