var w = 900;
var h = 500;

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

d3.json("data/berlin.geojson").then(function (data) {
    data.features.forEach(function (d) {
        console.log(d.properties.name)
    })

    var tooltip = d3.select("body").append("div")
        .attr("class", "hidden tooltip");

    var group = svg.selectAll("g")
        .data(data.features)
        .enter()
        .append("g")


    var b = d3.geoBounds(data);

    var projection = d3.geoMercator()
        .center([(b[1][0] + b[0][0]) / 2, (b[1][1] + b[0][1]) / 2])
        .translate([w / 2, h / 2])
        .scale(50000)

    var path = d3.geoPath().projection(projection);

    var areas = group.append("path")
        .attr("d", path)
        .attr("class", "unselected")
        .on('mousemove', function (d) {
            var mouse = [
                d3.event.pageX,
                d3.event.pageY
            ]

            tooltip.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0] + 15) +
                    'px; top:' + (mouse[1] - 35) + 'px')
                .html(d.properties.name);
        })
        .on('mouseout', function () {
            tooltip.classed('hidden', true);
        })
        .on("click", function (d) {
            let district = d3.select(this);
            var searchBox = $(".search-input");

            function updateDistrictFilter(district) {
                searchBox.focus()
                searchBox.val(district);
                searchBox.blur()
            }

            if(district.attr("class") == "selected") {
                updateDistrictFilter("");
                d3.selectAll('path').attr('class', "unselected");
                $("#table").bootstrapTable("showColumn", "District")
            }
            else {
                updateDistrictFilter(d.properties.name);
                d3.selectAll('path').attr('class', "unselected");
                district.attr("class", "selected");
                $("#table").bootstrapTable("hideColumn", "District")
            }
        })
});