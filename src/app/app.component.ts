import { Component } from '@angular/core';
import {Config} from './config';

export var apiHost = Config.apiUrl;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'HealthCare';
}
