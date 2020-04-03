import { Component, ViewEncapsulation, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'Unify';

  ngOnInit() {
    var device;
    document.addEventListener('deviceready', function () {
      alert(device.platform);
    }, false);
  }
}
