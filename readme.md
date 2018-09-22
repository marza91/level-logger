# level-logger

A simple script I use for logging stuff in nodejs


## Example usage:

~~~~
const process = require("process");
const util = require("util");
const Logger = require("logger");

var logger = new Logger( {
    process.stdout,
    util.format,
    Logger.LogLevel.Debug
});

logger.debug("This will be printed!");

var logger2 = new Logger(process.stdout, util.format, Logger.LogLevel.Error);

logger2.debug("This will NOT be printed!");
logger2.error("But this will!");
~~~~

## Loggers can have multiple options objects for logging to multiple places with different levels

~~~~
var loggerMult = new Logger([
    {
        writer : process.stdout, // Replace with a database call etc
        format : util.format,
        logLevel : Logger.LogLevel.Error
    },
    {
        writer : process.stdout,
        format : util.format,
        logLevel : Logger.LogLevel.Debug
    }
]);

loggerMult.debug("This is only sent to Debug writer");
loggerMult.error("This is sent to both"); // Will be printed twice in example
~~~~
