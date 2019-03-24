var request = require('request')
let nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	secure: false, // use SSL
    port: 25, // port for secure SMTP
	auth: {
	  user: 'merlin.byr@gmail.com',
	  pass: 'Meragon185!'
	},
	tls: {
        rejectUnauthorized: false
    }
  });
  
module.exports = {

	sendRequestWeather: function (url, callback) {
		console.log("weather called")
		request(url, function(error, response, body){
			if(!body) {
				var data = {
					weather: "unknown",
					temp: 0,
					pressure: 0,
					humidity: 0,
					wind: 0,
					cloudiness: 0,
					id: 0
				}
				callback(data);	
			}
			body = JSON.parse(body)

			var data = {
				weather: body.weather[0].description,
				temp: body.main.temp-273,
				pressure: body.main.pressure,
				humidity: body.main.humidity,
				wind: body.wind.speed,
				cloudiness: body.clouds.all,
				id: body.weather[0].id
			}
			callback(data);	
		})
	},

	sendMail: function (mailAddr, obj, body) {
		var mailOptions = {
			from: 'merlin.byr@gmail.com',
			to: mailAddr,
			subject: obj,
			text: body
		  };
		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}
}