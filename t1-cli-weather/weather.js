#!/usr/bin/env node
import {getArgs} from './services/args.service.js';
import {printError, printHelp, printSuccess, printWeatherPretty} from './services/log.service.js';
import {saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";

const saveProperty = async (key, value, propName) => {
    if (!key.length) {
        printError(`${propName} was not passed`);
        return;
    }
    try {
        await saveKeyValue(key, value);
        printSuccess(`${propName} successfully saved`);
    } catch (e) {
        printError(e.message);
    }
};

const getForecast = async () => {
    try {
        const weather = await getWeather();
        printWeatherPretty(weather);
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Saved city is incorrect, getting of the forecast is impossible');
        } else if (e?.response?.status === 401) {
            printError('Saved token is incorrect, getting of the forecast is impossible');
        } else {
            printError(e.message);
        }
    }
};

const initCli = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.c) {
        return saveProperty(TOKEN_DICTIONARY.city, args.c, 'City');
    }
    if (args.t) {
        return saveProperty(TOKEN_DICTIONARY.token, args.t, 'Token');
    }
    return getForecast();
};

initCli();