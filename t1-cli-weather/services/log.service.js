import chalk from 'chalk';
import dedent from "dedent-js";
import {getIcon} from "./api.service.js";

const printError = (error) => {
    console.log(chalk.bgRed('ERROR') + ' ' + error);
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen('SUCCESS') + ' ' + message);
}

const printHelp = () => {
    console.log(dedent(`${chalk.bgCyan(' HELP ')}
    Without parameters : weather forecast
    -h : print help
    -c [CITY] : setup your city
    -t [API_KEY] : setup token`
    ));
}

const printWeatherPretty = (data) => {
    console.log(dedent(`${chalk.bgYellow(' WEATHER FORECAST')} Weather in ${data.name}
    ${getIcon(data.weather[0].icon)} ${data.weather[0].description}
    Temperature: ${data.main.temp} (feels like ${data.main.feels_like})
    Humidity: ${data.main.humidity}%
    Wind speed: ${data.wind.speed} m/s
    `));
}

export {printError, printSuccess, printHelp, printWeatherPretty};