import { Component, Input } from '@angular/core';
import { Quizz } from '../../models/quizz';

@Component({
  selector: 'app-quizz-cell',
  imports: [],
  templateUrl: './quizz-cell.component.html',
  styleUrl: './quizz-cell.component.css'
})
export class QuizzCellComponent {
  @Input({required: true}) quizz: Quizz = {} as Quizz;

  
}
