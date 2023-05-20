import {getAllKeyValue} from "./storage.service.js";
import axios from "axios";

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '🌤️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '🌩️';
        case '13':
            return '❄️';
        case '50':
            return '🌫️';
    }
};

const getWeather = async () => {
    const settings = await getAllKeyValue();

    if (!settings.token) {
        throw new Error('Token was not detected, please setup token using command -t [API_KEY]');
    }
    if (!settings.city) {
        throw new Error('City was not detected, please setup city using command -s [CITY]');
    }
    const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: settings.city,
            appid: settings.token,
            lang: 'en',
            units: 'metric'
        }
    });
    return data;
}

export {getWeather, getIcon};