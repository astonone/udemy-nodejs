import {homedir} from 'os';
import {join} from 'path';
import {promises} from 'fs';

const appStorageFilePath = join(homedir(), 'weather-data.json');
const saveKeyValue = async (key, value) => {
    let data = {};
    if (await isExist(appStorageFilePath)) {
        const file = await promises.readFile(appStorageFilePath);
        data = JSON.parse(file);
    }

    data[key] = value;
    await promises.writeFile(appStorageFilePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
    if (await isExist(appStorageFilePath)) {
        const file = await promises.readFile(appStorageFilePath);
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined;
}

const isExist = async (path) => {
    try {
        await promises.stat(appStorageFilePath)
        return true;
    } catch (e) {
        return false;
    }

};

export {saveKeyValue, getKeyValue};