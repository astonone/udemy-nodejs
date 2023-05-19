#!/usr/bin/env node
import {getArgs} from './services/args.service.js';
import {printError, printHelp, printSuccess} from './services/log.service.js';
import {saveKeyValue} from "./services/storage.service.js";

const saveToken = async (token) => {
    try {
        await saveKeyValue('token', token);
        printSuccess('Token successfully saved');
    } catch (e) {
        printError(e.message);
    }
}
const initCli = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp();
    }
    if (args.s) {
        // save city
    }
    if (args.t) {
        return saveToken(args.t);
    }
    // print weather forecast
};

initCli();