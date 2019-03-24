targetmail = "anthena@yopmail.com"

module.exports = function(server){

	server.get('/', function(req, res){
		res.render('pages/index', {data: data});
	});

	server.get('/getdata', function(req, res){
		res.send(JSON.stringify(data));
	});

	server.post('/sensor', function(req, res){
		if ( req.body.temperature ) {
			data.temperature = req.body.temperature
			console.log("temp updated : " + req.body.temperature)
		}
		if ( req.body.humidity ) {
			data.humidity = req.body.humidity
			console.log("humidity updated : " + req.body.humidity)
		}
		if ( req.body.light ) {
			data.light = req.body.light
			if ( data.light < 25 ) {
				console.log("light trigerred")
				fct.sendMail( "danthevuong@gmail.com", "Light Alert", "living room light has nt been turned on since 2 days")
			}
			console.log("light updated : " + req.body.light)
		}
	})

	server.get('/weather', (req, res) =>{
		var APIKEY = '8b84b1dd2e7d668da5e21c4d4096f1ab'
		var id_city = '3031582'
		var url = 'https://api.openweathermap.org/data/2.5/weather?id=3031582&APPID=8b84b1dd2e7d668da5e21c4d4096f1ab'
		fct.sendRequestWeather(url, function(result){
			res.send(JSON.stringify(result))
		})
	})


	server.get('/sendmail', (req, res) => {
		console.log(" sending email...")
		res.send(" ok ")
		fct.sendMail( targetmail, "coucou", "test")
	})


	server.post('/sendmail', (req, res) => {
		console.log(" posting email")
		fct.sendMail( targetmail, "Mrs Raymond Alert", "Help button presses")
	})

	server.post('/pilulier', (req, res) => {
		console.log("pilulier trigered")
		if (!req.body){
			console.log("no body")
			return
		}
		console.log(" status : ", req.body.status);
		status.status = req.body.status;
		res.send(" ok ")
		if( status.status == "red") {
			fct.sendMail( targetmail, "Mrs Raymond : Forgotten Pills", "Sunday pills have not been taken")
		}
	})

	server.get('/getStatus', (req, res) => {
		res.send(JSON.stringify(status))
	})

}