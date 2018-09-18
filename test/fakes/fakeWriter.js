class FakeWriter {
    constructor() {
        this.output = "";
        this.write = (text) => {
            this.output += text;
        };
    }
}

module.exports = FakeWriter;
