var d3 = require("./d3");

var parseTime = d3.timeParse("%a %b %d %H:%M:%S %Z %Y");

function lastSevenDays(date) {
  // var now = new Date; //Nixed until the backend is working…
  var tempStr = "Fri Feb 10 17:40:56 +0000 2017"
  var now = parseTime(tempStr);
  var interval = d3.timeDay.count(date, now);
  var bool = interval <= 7
  // console.log("date: " + date + ", interval: " + interval + ", bool: " + bool);
  return bool;
}

d3.json("./js/imel_data.json", function(tweets) {
  var dates = tweets.map(function(tweet) {
    var date = parseTime(tweet.created_at)
    return date;
  }).filter(function (date) {
    return lastSevenDays(date);
  });
  // console.log(dates);
  
  var interval = d3.timeDay.count(dates[dates.length - 1], dates[0]);
  console.log(interval);
  
  var days = dates.map(function(date) {
    return date.getDay();
  });
  // console.log(days);
  
  var numToDayName = function(num) {
    var obj = {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
    }
    return obj[num];
  }
  
  var tweetsOn = { "Sun": 0, "Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0, "Fri": 0, "Sat": 0 };
  days.forEach(function(num) {
    tweetsOn[numToDayName(num)] += 1;
  });
  // console.log(tweetsOn);
  
  // var dataset = Object.values(tweetsOn);
  var datasetDays = Object.keys(tweetsOn);
  var dataset = datasetDays.map(function(day) {
    return tweetsOn[day];
  });
  // console.log(dataset);
  
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // set the domains and ranges
  var x = d3.scaleBand()
            .domain(datasetDays.map(function(d) { return d; }))
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .domain([0,d3.max(dataset)])
            .range([height, 0]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
  var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");
      
  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(dataset)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d,i) { return x(datasetDays[i]); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d); })
        .style("fill", "steelblue");

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
});
