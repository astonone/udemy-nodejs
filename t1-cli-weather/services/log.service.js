import chalk from 'chalk';
import dedent from "dedent-js";
import {convertMetersToKilometers, convertPressureFromHPaToMmHg, getIcon, getWindDirection} from "./api.service.js";

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
    console.log(dedent(`${chalk.bgYellow(' WEATHER FORECAST ')} Weather in ${data.name}
    ${getIcon(data.weather[0].icon)} ${data.weather[0].description}
    Temperature: ${data.main.temp}°C (feels like ${data.main.feels_like}°C)
    Humidity: ${data.main.humidity}%
    Clouds: ${data.clouds.all}%
    Wind speed: ${data.wind.speed} m/s
    Wind direction: ${getWindDirection(data.wind.deg)}
    Pressure: ${convertPressureFromHPaToMmHg(data.main.pressure)} mm Hg
    Visibility: ${convertMetersToKilometers(data.visibility)}Km
    `));
}

export {printError, printSuccess, printHelp, printWeatherPretty};