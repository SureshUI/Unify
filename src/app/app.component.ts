import { Component, ViewEncapsulation, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
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
