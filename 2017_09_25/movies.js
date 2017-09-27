function buildGraph(divId, data, field, comparator) {
	d3.select("#"+divId).selectAll("div.h-bar")
		.data(data)
		.enter().append("div")
		.attr("class", "h-bar")
		.append("span")

	let max = d3.max(data, function(d) {
		return d[field]
	})
	let maxPixels = window.screen.width - 200

	d3.select("#"+divId).selectAll("div.h-bar")
		.data(data).attr("class", "h-bar")
		.style("width", function (d) {
            return (d[field]*maxPixels/max) + "px";
        })
        .select("span").text(function (d) {
            return d.Name + " ($" + d[field] + ")";
        });

    if(comparator)
        d3.select("#"+divId)
            .selectAll("div.h-bar") 
            .sort(comparator(field));
}

var compare = function(field) {
	return function(a, b) {
		return a[field] < b[field] ? 1 : -1
	}
} 

var computeProfit = function(data) {
	for (var i=0; i<data.length; i++) {
		data[i].Profit = data[i].Worldwide_Gross_M - data[i].Budget_M
	}
	return data
}

var groupByGenre = function(data) {
	var genres = {}
	for (var i=0; i<data.length; i++) {
		if(genres[data[i].Genre] == undefined)
			genres[data[i].Genre] = 0
		genres[data[i].Genre] += data[i].Worldwide_Gross_M
	}

	var newData = []
	Object.keys(genres).forEach(function(key, index) {
		newData.push({
			"Name": key,
			"Worldwide_Gross_M": genres[key]
		})
	})

	return newData
}