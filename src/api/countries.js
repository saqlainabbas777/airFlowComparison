import axios from "axios";
import {OPENAQ} from "../constants/index";

const countries = axios.create({
    baseURL: OPENAQ.BASE_URL
});

export const getCountries = async ()=>{
    const {data} = await countries.get(`countries?limit=200&page=1&offset=0&sort=asc&order_by=country`);
    return data.results;
}
