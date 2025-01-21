import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categorie-cell',
  imports: [],
  templateUrl: './categorie-cell.component.html',
  styleUrl: './categorie-cell.component.css'
})
export class CategorieCellComponent {

  @Input({required: true}) categorie: string = '';
  
}
