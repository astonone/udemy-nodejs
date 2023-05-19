import https from "https";
import {getAllKeyValue} from "./storage.service.js";

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
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('q', settings.city);
    url.searchParams.append('appid', settings.token);
    url.searchParams.append('lang', settings.lang);
    url.searchParams.append('units', 'metric');

    https.get(url, (response) => {
        let res = '';

        response.on('data', (chunk) => {
            res += chunk;
        });

        response.on('end', () => {
            console.log(JSON.parse(res));
        });
    });
}

export {getWeather};