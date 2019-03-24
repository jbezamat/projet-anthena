import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataBasic} from '../models/data-basic.model'


@Component({
  selector: 'app-card-zone',
  templateUrl: './card-zone.component.html',
  styleUrls: ['./card-zone.component.sass']
})
export class CardZoneComponent implements OnInit {

  temperature = 20;
  temperature_weather = 22;
  humidity;
  light = 80;
  wind = 35;
  days = [{"name":"M","status":"not"}, {"name":"T","status":"not"}, {"name":"W","status":"not"}, {"name":"T","status":"not"}, {"name":"F","status":"not"}, {"name":"S","status":"not"}, {"name":"S","status":"red"}]

  constructor(private http : HttpClient) { }

  ngOnInit() {


    this.refreshData();

  }

  refreshData() {
    setInterval(()=>{
      console.log('refresh');
      this.getData()
    },2000);
  }

  getData() {
    this.http.get('http://192.168.43.111:8080/getData')
    //this.http.get('http://192.168.56.203:8080/getData')
      .subscribe(res => {
          console.log(res);
          this.temperature = (res as any).temperature;
          this.humidity = (res as any).humidity;
          this.light = (res as any).light;
      });

    this.http.get('http://192.168.43.111:8080/weather')
   //this.http.get('http://192.168.56.203:8080/weather')
      .subscribe(res =>{
        console.log(res);
        this.temperature_weather = (res as any).temp;
        this.wind = (res as any).wind;
      });
  }
}
