# level-logger

A simple script I use for logging stuff in nodejs


## Example usage:

~~~~
const process = require("process");
const util = require("util");
const Logger = require("logger");

var logger = new Logger(process.stdout, util.format, Logger.LogLevel.Debug);

logger.debug("This will be printed!");

var logger2 = new Logger(process.stdout, util.format, Logger.LogLevel.Error);

logger2.debug("This will NOT be printed!");
logger2.error("But this will!");
~~~~
