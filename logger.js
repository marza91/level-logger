/*
 * Logging utility
 */

const LOGLEVELS = {
    None : 0,
    Error : 1,
    Info : 2,
    Debug : 3
};

class Logger {
    constructor(writer, format, logLevel) {
        // Private
        var log = (...args) => {
            writer.write(format.apply(null, args));
            writer.write("\n");
        };

        // Public
        this.error = (...args) => {
            if(logLevel >= LOGLEVELS.Error) log(...args);
        };
        this.info = (...args) => {
            if(logLevel >= LOGLEVELS.Info) log(...args);
        };
        this.debug = (...args) => {
            if(logLevel >= LOGLEVELS.Debug) log(...args);
        };
    }
}

Logger.LogLevel = LOGLEVELS;

module.exports = Logger;
