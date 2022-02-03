import HttpClient from "../utils/HttpClient";
import {api} from './api'


// Start Regions api
export const getRegions = (param = {}) => {
    return HttpClient.doGet(api.regions , param)
}
//Finish Regions api