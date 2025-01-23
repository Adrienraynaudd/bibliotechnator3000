import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quizz-question',
  imports: [NgFor],
  templateUrl: './quizz-question.component.html',
  styleUrl: './quizz-question.component.css'
})
export class QuizzQuestionComponent {
  
  @Input() question!: string;
  @Input() answers!: string[];

  @Output() answer: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  onAnswer(answer: number) {
    this.answer.emit(answer);
  }
}
