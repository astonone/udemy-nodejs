#!/usr/bin/env node
import {getArgs} from './services/args.service.js';
import {printError, printHelp, printSuccess} from './services/log.service.js';
import {saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/openweather-api.service.js";

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

const initCli = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp();
    }
    if (args.c) {
        return saveProperty(TOKEN_DICTIONARY.city, args.c, 'City');
    }
    if (args.t) {
        return saveProperty(TOKEN_DICTIONARY.token, args.t, 'Token');
    }
    if (args.l) {
        return saveProperty(TOKEN_DICTIONARY.lang, args.l, 'Language');
    }
    getWeather();
};

initCli();