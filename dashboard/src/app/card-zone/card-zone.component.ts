import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-card-zone',
  templateUrl: './card-zone.component.html',
  styleUrls: ['./card-zone.component.sass']
})
export class CardZoneComponent implements OnInit {

  temperature = 20;
  temperature_weather = 19;
  weather_text = "few clouds";
  logo_weather_url = "../../assets/weather.png";
  humidity;
  light = 80;
  wind = 5;
  days = [{"name":"M","status":"not"}, {"name":"T","status":"not"}, {"name":"W","status":"not"}, {"name":"T","status":"not"}, {"name":"F","status":"not"}, {"name":"S","status":"not"}, {"name":"S","status":"green"}]

  constructor(private http : HttpClient) { }

  ngOnInit() {

    this.getData();
    this.refreshDataFast();
    this.refreshDataSlow();
    this.getDataWeather();

  }

  refreshDataFast() {
    setInterval(()=>{
      console.log('refresh');
      this.getData();
      this.getDataPills();
    },2000);
  }

  refreshDataSlow() {
    setInterval(()=>{
      console.log('refresh slow');
      this.getDataWeather()
    },200000);
  }

  getData() {
    this.http.get('http://192.168.43.111:8080/getData')
    //this.http.get('http://192.168.43.80:8080/getData') // merlin
    //this.http.get('http://192.168.56.203:8080/getData')
      .subscribe(res => {
          console.log(res);
          this.temperature = (res as any).temperature;
          this.humidity = (res as any).humidity;
          this.light = (res as any).light;
      });
  }

  getDataPills() {
    this.http.get('http://192.168.43.111:8080/getStatus')
    //this.http.get('http://192.168.43.80:8080/getStatus') // merlin
    //this.http.get('http://192.168.56.203:8080/getStatus')
      .subscribe(res => {
        console.log((res as any).status);
        if ( (res as any).status ){
          this.days[this.days.length -1].status = (res as any).status;
        }
      });
  }

  getDataWeather() {

    this.http.get('http://192.168.43.111:8080/weather')
    //this.http.get('http://192.168.43.80:8080/weather') //tel merlin
    //this.http.get('http://192.168.56.203:8080/weather')
      .subscribe(res =>{
        console.log(res);
        this.temperature_weather = Math.floor((res as any).temp);
        this.wind = Math.floor((res as any).wind);
        this.weather_text = (res as any).weather;
        if ((res as any).weather == "clear sky"){
          this.logo_weather_url = "../../assets/clear-sky.png";
        }
      });

  }

  clickAlert() {
    console.log('alert');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    const json = {"type" : "coucou"};

    //this.http.post('http://192.168.56.203:8080/sendmail', json, httpOptions)
    //this.http.post('http://192.168.43.80:8080/sendmail', json, httpOptions)
    this.http.post('http://192.168.43.111:8080/sendmail', json)
      .subscribe(val => {
        console.log(val);
      })

  }
}
