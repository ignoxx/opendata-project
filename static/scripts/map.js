// Canvas size of the map
var width = 900;
var height = 500;

// Create the svg element where we will place our map on
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

// Load berlin.geojson map paths
d3.json("data/berlin.geojson").then(function (data) {
    // Create tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "hidden tooltip");

    // Apply our .geojson  data
    var group = svg.selectAll("g")
        .data(data.features)
        .enter()
        .append("g")

    // Center and scale the Map to fit on the screen
    var b = d3.geoBounds(data);
    var projection = d3.geoMercator()
        .center([(b[1][0] + b[0][0]) / 2, (b[1][1] + b[0][1]) / 2])
        .translate([width / 2, height / 2])
        .scale(50000)

    // Apply the projection
    var path = d3.geoPath().projection(projection);

    // Define map functionality / behaviour
    var areas = group.append("path")
        .attr("d", path)
        .attr("class", "unselected")
        .on('mousemove', function (d) {
            var mouse = [d3.event.pageX, d3.event.pageY]

            // Tooltip position on hover
            tooltip.classed('hidden', false)
                .attr( 'style', 'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px')
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

            // Deselect district and enable 'district' column
            // if clicked district is already visible
            if (district.attr("class") == "selected") {
                updateDistrictFilter("");
                d3.selectAll('path').attr('class', "unselected");
                $("#table").bootstrapTable("showColumn", "District")
            }

            // Otherwise select and filter by district
            else {
                updateDistrictFilter(d.properties.name);
                d3.selectAll('path').attr('class', "unselected");
                district.attr("class", "selected");
                $("#table").bootstrapTable("hideColumn", "District")
            }
        })
});