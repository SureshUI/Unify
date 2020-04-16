import { Component, OnInit } from '@angular/core';
import { BackgroundService } from '../background.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private _bgservice: BackgroundService) { }

  updateBgUrl(path){
    this._bgservice.getPath(path);
  }

  ngOnInit() {
  }

}
