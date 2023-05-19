import chalk from 'chalk';
import dedent from "dedent-js";

const printError = (error) => {
    console.log(chalk.bgRed('ERROR') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen('SUCCESS') + ' ' + message);
};

const printHelp = () => {
    console.log(dedent(`${chalk.bgCyan(' HELP ')}
    Without parameters : weather forecast
    -h : print help
    -s [CITY] : setup your city
    -t [API_KEY] : setup token`
    ));
}

export {printError, printSuccess, printHelp};