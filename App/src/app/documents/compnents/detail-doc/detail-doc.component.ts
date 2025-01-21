import { Component, Input } from '@angular/core';

@Component({
  selector: 'detail-comp',
  imports: [],
  templateUrl: './detail-doc.component.html',
  styleUrl: './detail-doc.component.css'
})
export class DetailDocComponent {
  @Input() title : string = "test";
  @Input() author : string = "test";
  @Input() category : string = "test";
  @Input() description : string = "test";
}
