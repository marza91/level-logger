/* global describe, it */
const expect = require("chai").expect;

const Logger = require("../logger");
const FakeWriter = require("./fakes/fakeWriter");

describe("Class: Logger", () => {
    var testCases = [
        { func: "error",    level: Logger.LogLevel.Error,   shouldPrint : true },
        { func: "error",    level: Logger.LogLevel.Warning,    shouldPrint : true },
        { func: "error",    level: Logger.LogLevel.Debug,   shouldPrint : true },
        { func: "error",    level: Logger.LogLevel.None,    shouldPrint : false },
        { func: "warning",     level: Logger.LogLevel.Error,   shouldPrint : false },
        { func: "warning",     level: Logger.LogLevel.Warning,    shouldPrint : true },
        { func: "warning",     level: Logger.LogLevel.Debug,   shouldPrint : true },
        { func: "warning",     level: Logger.LogLevel.None,    shouldPrint : false },
        { func: "debug",    level: Logger.LogLevel.Error,   shouldPrint : false },
        { func: "debug",    level: Logger.LogLevel.Warning,    shouldPrint : false },
        { func: "debug",    level: Logger.LogLevel.Debug,   shouldPrint : true },
        { func: "debug",    level: Logger.LogLevel.None,    shouldPrint : false },
    ];

    testCases.forEach(testData => {
        it("#" + testData.func + "() should " + (testData.shouldPrint ? "" : "NOT ") + "print when logLevel is " + logLevelName(testData.level), () => {
            // Arrange
            var fakeWriter = new FakeWriter();
            var logger = new Logger({
                writer : fakeWriter,
                format : fakeFormat,
                logLevel : testData.level
            });
            var logText = "Test";
            var expectedResult = testData.shouldPrint ? (logText + "\n") : "";

            // Act
            logger[testData.func](logText);

            // Assert
            expect(fakeWriter.output).to.equal(expectedResult);
        });
    });

    it("#debug() should print multiple values with comma separation", () => {
        // Arrange
        var fakeWriter = new FakeWriter();
        var logger = new Logger({
            writer : fakeWriter,
            format : fakeFormat,
            logLevel : Logger.LogLevel.Debug
        });
        var logData = ["Test a", "Test b", "Test C"];

        // Act
        logger.debug(logData);

        // Assert
        expect(fakeWriter.output).to.equal(logData.join(",")+"\n");
    });

    it("#log() should print to multiple outputs", () => {
        // Arrange
        var fakeWriter1 = new FakeWriter();
        var fakeWriter2 = new FakeWriter();
        var logText = "Test";
        var logger = new Logger([
            {
                writer : fakeWriter1,
                format : fakeFormat,
                logLevel : Logger.LogLevel.Debug
            },
            {
                writer : fakeWriter2,
                format : fakeFormat,
                logLevel : Logger.LogLevel.Debug
            }
        ]);

        // Act
        logger.debug(logText);

        // Assert
        expect(fakeWriter1.output).to.equal(logText + "\n");
        expect(fakeWriter2.output).to.equal(logText + "\n");
    });

    it("#log() should only print to loggers with correct level", () => {
        // Arrange
        var optionsDebug = {
            writer : new FakeWriter(),
            format : fakeFormat,
            logLevel : Logger.LogLevel.Debug
        };
        var optionsWarning = {
            writer : new FakeWriter(),
            format : fakeFormat,
            logLevel : Logger.LogLevel.Warning
        };
        var optionsError = {
            writer : new FakeWriter(),
            format : fakeFormat,
            logLevel : Logger.LogLevel.Error
        };
        var logger = new Logger([optionsDebug, optionsWarning, optionsError]);
        var debugText = "Foo";
        var warningText = "Bar";
        var errorText = "Zub";

        // Act
        logger.debug(debugText);
        logger.warning(warningText);
        logger.error(errorText);

        // Assert
        expect(optionsDebug.writer.output).to.equal([debugText, warningText, errorText, ""].join("\n"));
        expect(optionsWarning.writer.output).to.equal([warningText, errorText, ""].join("\n"));
        expect(optionsError.writer.output).to.equal(errorText + "\n");
    });

    it("#constructor() should throw if no writer is provided", () => {
        // Assert
        expect(() => new Logger(null)).to.throw();
    });

    it("#constructor() should throw if an invalit writer is provided", () => {
        // Assert
        expect(() => new Logger({})).to.throw();
    });
});

function fakeFormat(...args) {
    return args.toString();
}

function logLevelName(logLevel) {
    return [
        "none",
        "error",
        "warning",
        "debug"
    ][logLevel];
}
