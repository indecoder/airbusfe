import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  
  constructor(private _data: DataService) { }

  ngOnInit(): void {

  }

  get data() {
    return this._data;
  }

}
