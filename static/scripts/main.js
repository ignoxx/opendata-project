$("#inputYearSelection").on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    var filter;

    if (valueSelected == "all")
        filter = {};
    else {
        filter = {
            Year: [valueSelected]
        }
    }

    $("#table").bootstrapTable("filterBy", filter)
})

function yearFormatter() {
    return 'Total'
}

function sumFormatter(data) {
    var field = this.field

    var total_sum = data.reduce(function (sum, row) {
        return (sum) + (parseInt(row[field]) || 0);
    }, 0);

    return total_sum;
}