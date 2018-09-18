/* global describe, it */
const expect = require("chai").expect;

const Logger = require("../logger");
const FakeWriter = require("./fakes/fakeWriter");

describe("Class: Logger", () => {
    var testCases = [
        { func: "error",    level: Logger.LogLevel.Error,   shouldPrint : true },
        { func: "error",    level: Logger.LogLevel.Info,    shouldPrint : true },
        { func: "error",    level: Logger.LogLevel.Debug,   shouldPrint : true },
        { func: "error",    level: Logger.LogLevel.None,    shouldPrint : false },
        { func: "info",     level: Logger.LogLevel.Error,   shouldPrint : false },
        { func: "info",     level: Logger.LogLevel.Info,    shouldPrint : true },
        { func: "info",     level: Logger.LogLevel.Debug,   shouldPrint : true },
        { func: "info",     level: Logger.LogLevel.None,    shouldPrint : false },
        { func: "debug",    level: Logger.LogLevel.Error,   shouldPrint : false },
        { func: "debug",    level: Logger.LogLevel.Info,    shouldPrint : false },
        { func: "debug",    level: Logger.LogLevel.Debug,   shouldPrint : true },
        { func: "debug",    level: Logger.LogLevel.None,    shouldPrint : false },
    ];

    testCases.forEach(testData => {
        it("#" + testData.func + "() should " + (testData.shouldPrint ? "" : "NOT ") + "print when logLevel is " + logLevelName(testData.level), () => {
            // Arrange
            var fakeWriter = new FakeWriter();
            var logger = setupLogger(testData.level, fakeWriter);
            var logText = "Test";
            var expectedResult = testData.shouldPrint ? (logText + "\n") : "";

            // Act
            logger[testData.func](logText);

            // Assert
            expect(fakeWriter.output).to.equal(expectedResult);
        });
    });

    it("#debug() Should print multiple values with comma separation", () => {
        // Arrange
        var fakeWriter = new FakeWriter();
        var logger = setupLogger(Logger.LogLevel.Debug, fakeWriter);
        var logData = ["Test a", "Test b", "Test C"];

        // Act
        logger.debug(logData);

        // Assert
        expect(fakeWriter.output).to.equal(logData.join(",")+"\n");
    });
});

function setupLogger(logLevel, fakeWriter) {
    if(!fakeWriter) fakeWriter = new FakeWriter();

    var logger = new Logger(fakeWriter, fakeFormat, logLevel);

    return logger;
}

function fakeFormat(...args) {
    return args.toString();
}

function logLevelName(logLevel) {
    return [
        "none",
        "error",
        "info",
        "debug"
    ][logLevel];
}
