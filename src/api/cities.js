import axios from "axios";
import {OPENAQ} from "../constants/index";

const cities = axios.create({
    baseURL: OPENAQ.BASE_URL
});

export const getCities = async (country)=>{
    const {data} = await cities.get(`cities?limit=100&page=1&offset=0&sort=asc&country=${country}&order_by=city`);
    return data.results;
}
