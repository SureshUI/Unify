import { Component, OnInit } from '@angular/core';
import { BackgroundService } from '../background.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  localUrl: any[];
  constructor(private _bgservice: BackgroundService) { }

  updateBgUrl(event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      console.log(reader.readAsDataURL(event.target.files[0]));

      // this._bgservice.getPath(event.target.value);
    }
    //this._bgservice.getPath(path);
  }

  ngOnInit() {
  }

}
