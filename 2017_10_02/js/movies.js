var buildGraph01 = function(data, chart) {
	var facts = crossfilter(data)

	var yearDim = facts.dimension(function(d) {
		return d.Year
	})

	var boxoffice = yearDim.group().reduceSum(function(d){
                return d.Worldwide_Gross_M;
            });

	chart
	    .width(768)
	    .height(480)
	    .x(d3.scale.linear().domain([6,20]))
	    .brushOn(false)
	    .yAxisLabel("This is the Y Axis!")
	    .dimension(yearDim)
	    .group(boxoffice)
	    .on('renderlet', function(chart) {
	        chart.selectAll('rect').on("click", function(d) {
	            console.log("click!", d);
	        });
	    });

    chart.render();
}