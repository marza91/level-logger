/*
 * Logging utility
 */

const LOGLEVELS = {
    None : 0,
    Error : 1,
    Warning : 2,
    Debug : 3
};

class Logger {
    constructor(options) {
        // Private
        var log;
        var logSingle = (w, f, ...args) => {
            w.write(f.apply(null, args));
            w.write("\n");
        };

        if(!options) {
            throw new ReferenceError("No options supplied");
        }
        else if(options.writer && options.format) {
            log = (level, ...args) =>
            {
                if(options.logLevel >= level)
                    logSingle(options.writer, options.format, ...args);
            };
        }
        else if(options.constructor == Array) {
            log = (level, ...args) => {
                options.forEach((o) => {
                    if(o.logLevel >= level)
                        logSingle(o.writer, o.format, ...args);
                });
            };
        }
        else {
            throw new TypeError("Invalid writer object supplied");
        }

        // Public
        this.error = (...args) => {
            log(LOGLEVELS.Error, ...args);
        };
        this.warning = (...args) => {
            log(LOGLEVELS.Warning, ...args);
        };
        this.debug = (...args) => {
            log(LOGLEVELS.Debug, ...args);
        };
    }
}

Logger.LogLevel = LOGLEVELS;

module.exports = Logger;
