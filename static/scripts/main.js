// Detect year-filter change and update filter
$("#inputYearSelection").on('change', function (e) {
    let valueSelected = this.value;
    let filter = {};

    if (valueSelected != "all")
        filter = {Year: [valueSelected]};

    $("#table").bootstrapTable("filterBy", filter)
})

// Tablefooter format functions
function yearFormatter() {
    return 'Total'
}

// Calculate sum of current column
function sumFormatter(data) {
    let field = this.field

    let totalSum = data.reduce(function (sum, row) {
        return (sum) + (parseInt(row[field]) || 0);
    }, 0);

    return totalSum;
}