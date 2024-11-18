import axios from "../../utils/axios";
import { loadperson } from "../Reducers/PeopleSlice";
export { removeperson} from "../Reducers/PeopleSlice";

export const asyncloadperson = (id) => async (dispatch,action)=>{
 try {
    const details = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combineCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
   
    const theultimatedetails ={
        details: details.data,
        externalid: externalid.data,
       combineCredits: combineCredits.data,
       tvCredits: tvCredits.data,
       movieCredits: movieCredits.data,
    }
    dispatch(loadperson(theultimatedetails))

 } catch (error) {
    console.error(error)
 }  
}