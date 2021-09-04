// load input data
d3.queue()
	.defer(d3.csv, "Master_Data_3year.csv")
    //.defer(d3.csv, "Master_Data_Opioid.csv")
	.defer(d3.json, "WACounty.json")
	.await(ready);

function ready(error, data, wa) {

	// throws error
	if (error) throw error;

	// convert TopoJSON to GeoJSON features
	var WACounty = topojson.feature(wa, {
		type: "GeometryCollection",
		geometries: wa.objects.WACounty.geometries
	});

	// converts rate to numerical value
	data.forEach(function(d) {
		d.rate = +d.rate;
	});

	// add rate data to GeoJSON object
	for (var i = 0; i < data.length; i++) {
		var countyID = data[i].ids;
		var countyValue = data[i].rate;
		var countyReliability = data[i].reliability;
		var countyYear = data[i].year;
		for (var j = 0; j < WACounty.features.length; j++) {
			var countyGEOID = WACounty.features[j].properties.GEOID;
			if (countyID == countyGEOID) {
				WACounty.features[j].properties[countyYear] = {"rate": countyValue,
															  "reliability": countyReliability}
				break;
			}
		}
	}

	// Map curvature longitude and latitude to 2D representation
	var path = d3.geoPath()
		     .projection(d3.geoMercator()
		     .center([-120.5157703, 47.3932917])
			 .scale(5000));

	// tooltip
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-5, 0]);

	// add color range
	var colorScale = d3.scaleQuantize()
		      .range([d3.interpolateReds(.143), d3.interpolateReds(.286), d3.interpolateReds(.429), d3.interpolateReds(.572), d3.interpolateReds(.715), d3.interpolateReds(.858), d3.interpolateReds(1)])
			  .domain(
				  [d3.min(data, function(d) {return d.rate}),
				 d3.max(data, function(d) {return d.rate})]
				   );

	// attach elements to svg in html file
	var svgMap = d3.select("svg.map")
				.attr("width", 800)
				.attr("height", 500)
				.call(tip)
				.selectAll("path")
				.data(WACounty.features)
				.enter()
				.append("path")
				.attr("d",path)
				.on('mouseover', tip.show)
				.on('mouseout', tip.hide);

	// legend
	var svgLegend = d3.select("svg.legend");
	var colorLegend = d3.legendColor()
		.labelFormat(d3.format(".1f"))
                .labels(["0.0 - 4.2", "4.3 - 8.4", "8.5 - 12.7", "12.8 - 16.9", "17.0 - 21.2", "21.3 - 25.4", "25.5 - 29.8"])
		.scale(colorScale)
		.shapeWidth(80)
		.shapeHeight(20)
		.labelAlign("start")
		.orient('horizontal')
		.title("Age-Adjusted Fatality Rate per 100,000 Persons");
	svgLegend.append("g")
        .attr("transform", "translate(0, 60)")
		.call(colorLegend);

	// changes countyShape and Tooltip by year
	function update(year, year1){
		slider.property("value", year);
		d3.select(".year").text(year + "-" + year1);
		svgMap.style("fill", function(wa) {
			return colorScale(wa.properties[year].rate);
		})
		tip.html(function(wa) {
			return "<strong>" + wa.properties.NAME + " County, WA</strong><br>Age-Adjusted Fatality Rate: "+ wa.properties[year].rate + "<br><i>" + wa.properties[year].reliability + "</i>"
		}).style("opacity", 0);
	}

	// slider
	var slider = d3.select(".slider")
		.append("input")
        .attr("type", "range")
        .attr("min", d3.min(data, function(d) {return d.year}))
        .attr("max", d3.max(data, function(d) {return d.year}))
        .attr("step", 3)

        .on("input", function() {
            var year = this.value;
            var year1 = parseInt(this.value) + parseInt(2);
            update(year, year1);
        });

	update(year);
}
