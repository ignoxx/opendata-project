const d3 = require('d3');
const fs = require('fs');

class DataParser {
    constructor(csvPath) {
        this.csvPath = csvPath;
        this.csvRawData = this.loadData();
        this.csvData = this.parseData();


        this.years = this.getUniqueValues("Year");
        this.districts = this.getUniqueValues("District");
    }

    loadData() {
        if (this.csvPath.length <= 0 || typeof (this.csvPath) != "string") return;
        return fs.readFileSync(this.csvPath, 'utf8');
    }

    parseData() {
        return d3.csvParse(this.csvRawData, (d) => {

            let fData;
            if (+d.Year === 2014) {
                fData = {
                    Year: +d.Year,
                    District: d.District,
                    Location: d.Location,
                    Robbery: +d.Robbery,
                    Street_robbery: +d.Street_robbery,
                    Injury: +d.Injury,
                    Threat: +d.Threat,
                    Theft: +d.Theft,
                    Burglary: +d.Burglary,
                    Fire: +d.Fire,
                    Damage: +d.Damage,
                    Graffiti: +d.Graffiti,
                    Drugs: +d.Drugs,
                }
            }

            // d.Year = +d.Year;
            // d.Code = +d.Code;
            // d.Robbery = +d.Robbery;
            // d.Street_robbery = +d.Street_robbery;
            // d.Injury = +d.Injury;
            // d.Agg_Assault = +d.Agg_Assault;
            // d.Threat = +d.Threat;
            // d.Theft = +d.Theft;
            // d.Car = +d.Car;
            // d.From_car = +d.From_car;
            // d.Bike = +d.Bike;
            // d.Burglary = +d.Burglary;
            // d.Fire = +d.Fire;
            // d.Arson = +d.Arson;
            // d.Damage = +d.Damage;
            // d.Graffiti = +d.Graffiti;
            // d.Drugs = +d.Drugs;
            // d.Local = +d.Local;


            return fData;
        });
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

    getKeys() {
        return Object.keys(this.csvData[0])
    }

    getData() {
        return this.csvData.slice(1);
    }

    getDataFromYear(year) {
        
    }
}

module.exports = DataParser;