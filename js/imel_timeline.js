var fs = require("fs");
var d3 = require('./d3');
var Twitter = require('twitter-node-client').Twitter;
var config = require('../data/twitter_config');

var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
// var error = function (err, response, body) {
//         console.log('ERROR [%s]', err);
//     };
    
var success = function (data) {
    // console.log('Data [%s]', data);
    fs.writeFile('imel_data.json', data, (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });
};

var twitter = new Twitter(config);

twitter.getUserTimeline({ screen_name: 'joeimel', trim_user: true, count: '200'}, error, success);
// console.log(output);



// var writeOutput = fs.writeFile('output.js', output, (err) => {
//   if (err) throw err;
//   console.log('It\'s saved!');
// });

// var imelData = require('./imel_data');
// var tweets = imelData[0];
// // console.log(tweets);
// for (var i = 0; i < tweets.length; i++) {
//   var text = tweets[i].text;
//   var time = tweets[i].created_at;
//   
//   // Thu Feb 09 00:20:45 +0000 2017
//   var parseTime = d3.timeParse("%a %b %d %H:%M:%S %Z %Y");
//   var timeObj = parseTime(time);
//   
//   // console.log("time: " + time);
//   // console.log("timeObj: " + timeObj);
//   console.log("text: " + text);
// }
