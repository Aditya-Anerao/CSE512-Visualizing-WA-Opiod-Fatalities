var margin = {top: 20, right: 20, bottom: 20, left: 20};
	width = 800 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom,
	formatPercent = d3.format(".1%");

var svg = d3.select("#map").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0.9);

queue()
	.defer(d3.csv, "Master_Data_Opioid.csv")
	.defer(d3.json, "WACounty.json")
	.await(ready);

var legendText = ["0", "50", "", "100", "", "150", "", "200"];
var legendColors = ["#B0DFE5", "#95C8D8", "#4682B4", "#0080FF", "#0E4D92", "#000080", "#1D2951"];

// var legendText = ["0", "100", "200", "300", "400"];
// var legendColors = d3.schemeBlues[5];

function ready(error, data, wa) {

	var WACounty = topojson.feature(wa, wa.objects.WACounty);

	data.forEach(function(d) {
		d.year = +d.year;
        d.ids = +d.ids;
		d.rate = +d.rate;
	});

	var dataByCountyByYear = d3.nest()
		.key(function(d) { return d.ids; })
		.key(function(d) { return d.year; })
		.map(data);

	WACounty.features.forEach(function(county) {
		county.properties.years = dataByCountyByYear[+county.properties.GEOID]
	});

	var color = d3.scale.threshold()
		.domain([0, 50, 100, 150, 200])
		.range(legendColors);

	//var color = d3.scale.threshold()
	//	.domain([0, 100, 200, 300, 400])
	//	.range(legendColors);

	var projection = d3.geo.mercator()
		.translate([width / 2, height / 2])
		.center([-120.4244583, 47.4946377])
		.scale(4600);

	var path = d3.geo.path()
		.projection(projection);

	var countyShapes = svg.selectAll(".county")
		.data(WACounty.features)
		.enter()
		.append("path")
			.attr("class", "county")
			.attr("d", path);

	countyShapes
		.on("mouseover", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 1);
			tooltip.html(
			"<p><strong>" + d.properties.years[2002][0].county + " County, WA </strong></p>" +
			"<table><tbody><tr><td class='wide'>Fatality Rate: </td><td>" + d.properties.years[2002][0].rate)
			.style("left", (d3.event.pageX + 15) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 0);
		});


	var legend = svg.append("g")
		.attr("id", "legend");

	var legenditem = legend.selectAll(".legenditem")
		.data(d3.range(8))
		.enter()
		.append("g")
			.attr("class", "legenditem")
			.attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

	legenditem.append("rect")
		.attr("x", width - 240)
		.attr("y", -7)
		.attr("width", 30)
		.attr("height", 6)
		.attr("class", "rect")
		.style("fill", function(d, i) { return legendColors[i]; });

	legenditem.append("text")
		.attr("x", width - 240)
		.attr("y", -10)
		.style("text-anchor", "middle")
		.text(function(d, i) { return legendText[i]; });

	function update(year){
		slider.property("value", year);
		d3.select(".year").text(year);
		countyShapes.style("fill", function(d) {
			return color(d.properties.years[year][0].rate)
		});
                           
	}

	var slider = d3.select(".slider")
		.append("input")
			.attr("type", "range")
			.attr("min", 2002)
			.attr("max", 2017)
			.attr("step", 1)
			.on("input", function() {
				var year = this.value;
				update(year);
			});

update(2002);

}

d3.select(self.frameElement).style("height", "685px");