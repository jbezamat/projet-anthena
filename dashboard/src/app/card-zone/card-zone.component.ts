import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataBasic} from '../models/data-basic.model'


@Component({
  selector: 'app-card-zone',
  templateUrl: './card-zone.component.html',
  styleUrls: ['./card-zone.component.sass']
})
export class CardZoneComponent implements OnInit {

  dataTypes = ['temp', 'lum'];
  data1 : DataBasic;
  data2 : DataBasic;

  datas : DataBasic[] = [];


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
    this.http.get('https://www.googleapis.com/books/v1/volumes?q=extreme%20programming')
      .subscribe(res => {
          console.log(res);
          this.datas = (res as any).items.map( res => new DataBasic(res));
          console.log(this.datas);
      });
  }
}
