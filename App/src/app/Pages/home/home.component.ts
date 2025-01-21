import { Component } from '@angular/core';
import {ListDocComponent} from '../../Components/list-doc/list-doc.component';

@Component({
  selector: 'app-home',
  imports: [
    ListDocComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
