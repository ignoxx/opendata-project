$("#inputYearSelection").on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    var filter;

    if(valueSelected == "all")
        filter = {};
    else{
        filter = {
            Year: [valueSelected]
        }
    }
    
    $("#table").bootstrapTable("filterBy", filter)
})