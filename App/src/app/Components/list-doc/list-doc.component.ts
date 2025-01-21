import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'list-doc',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './list-doc.component.html',
  styleUrl: './list-doc.component.css'
})
export class ListDocComponent {
  @Input() name : string = "test";


}
