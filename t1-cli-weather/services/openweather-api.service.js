import {getAllKeyValue} from "./storage.service.js";
import axios from "axios";

const getWeather = async () => {
    const settings = await getAllKeyValue();

    if (!settings.token) {
        throw new Error('Token was not detected, please setup token using command -t [API_KEY]');
    }
    if (!settings.lang) {
        throw new Error('Language was not detected, please setup lang using command -l [LANG]');
    }
    if (!settings.city) {
        throw new Error('City was not detected, please setup city using command -s [CITY]');
    }
    const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: settings.city,
            appid: settings.token,
            lang: settings.lang,
            units: 'metric'
        }
    });
    return data;
}

export {getWeather};