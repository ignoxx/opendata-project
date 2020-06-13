const d3 = require('d3');
const fs = require('fs');

class DataParser {
    constructor(csvPath) {
        this.csvPath = csvPath;
        this.csvData = this.parseToJson();

        this.years = this.getUniqueValues("Year");
        this.districts = this.getUniqueValues("District");

        console.log(this.years);
        console.log(this.districts);
    }

    parseToJson() {
        let csvRawData = fs.readFileSync(this.csvPath, 'utf8');
        return d3.csvParse(csvRawData);
    }

    getData() {
        return this.csvData;
    }

    getUniqueValues(key) {
        let uniqueNames = [];
        for (let i = 0; i < this.csvData.length; i++) {
            if (uniqueNames.indexOf(this.csvData[i][key]) === -1) {
                uniqueNames.push(this.csvData[i][key]);
            }
        }

        return uniqueNames;
    }
}

module.exports = DataParser;