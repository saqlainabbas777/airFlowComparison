import axios from "axios";
import {OPENAQ} from "../constants/index";

const airQuality = axios.create({
    baseURL: OPENAQ.BASE_URL
});

export const getMeasurements = async (countryCode, cityName) => {
    const {data} = await airQuality.get(`latest?limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=${countryCode}&city=${cityName}&order_by=lastUpdated&dumpRaw=false`);
    const calculatedData = [];
    data.results.forEach(res => {
        let row = {};
        row.coordinates = res.coordinates;
        res.measurements.forEach(measurement => {
            calculatedData.push({
                ...measurement,
                coordinates: row.coordinates
            })
        });
    })
    return calculatedData;
}
