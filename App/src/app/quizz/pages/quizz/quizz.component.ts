import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { QuizzQuestionComponent } from "../../component/quizz-question/quizz-question.component";
import { Quizz } from "../../models/quizz";
import { QuizzService } from '../../services/quizz.service';

@Component({
  selector: 'app-quizz',
  imports: [QuizzQuestionComponent, NgIf],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {

  protected quizz! : Quizz;
  protected score: number = 0;
  protected currentQuestion: number = 0;
  protected gameOver: boolean = false;
  protected gameStarted: boolean = false;

  constructor(private readonly _quizzService: QuizzService, private readonly router: Router) { }    

  ngOnInit() {
    const id = this.router.url.split('/')[-2];
    this._quizzService.getQuizzById(id).subscribe({
      next: (quizz: Quizz) => {
        this.quizz = quizz;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  onAnswer(answer: number) {
    if (answer === this.quizz.questions[this.currentQuestion].correctAnswer) {
      this.score++;
    }
    this.currentQuestion++;
    if (this.currentQuestion === this.quizz.questions.length) {
      this.gameOver = true;
    }
  }

  startGame() {
    this.score = 0;
    this.currentQuestion = 0;
    this.gameOver = false;
    this.gameStarted = true;
  }

}
