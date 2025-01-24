import { QuizzService } from './../../services/quizz.service';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Quizz } from '../../models/quizz';
import { Router } from '@angular/router';
import { Question } from '../../models/question';

@Component({
  selector: 'app-quizz-create',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './quizz-create.component.html',
  styleUrl: './quizz-create.component.css'
})
export class QuizzCreateComponent {

  protected form!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly router: Router, private readonly _quizzService: QuizzService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      questions: this.formBuilder.array([])
    });
    this.addQuestion();
  }
  
  createQuestion(): FormGroup {
    return this.formBuilder.group({
      question: ['', Validators.required],
      answers: this.formBuilder.array([]),
      good_answer: [1, [Validators.required, Validators.min(1), Validators.max(1)]],
    });
  }
  
  createAnswer(): FormControl {
    return this.formBuilder.control('', Validators.required);
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  getAnswers(index: number): FormArray {
    return this.questions.at(index).get('answers') as FormArray;
  }
  
  addQuestion(): void {
    this.questions.push(this.createQuestion());
    for (let i = 0; i < 2; i++) {
      this.addAnswer(this.questions.length - 1);
    }
  }
  
  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }
  
  addAnswer(questionIndex: number): void {
    const answersArray = this.getAnswers(questionIndex)
    answersArray.push(this.createAnswer());

    const good_answerControl = this.questions.at(questionIndex).get('good_answer');
    if (!good_answerControl) return;
    const maxAnswerIndex = answersArray.length;
    good_answerControl.setValidators([
      Validators.required,
      Validators.min(0),
      Validators.max(maxAnswerIndex)
    ]);
    
    // Ensure validation is re-triggered
    good_answerControl.updateValueAndValidity();
  }
  
  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.getAnswers(questionIndex).removeAt(answerIndex);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const quizz: Quizz = {
      max_score: 0,
      documentId: this.router.url.split('/')[3],
      type: this.form.value.type,
      questions: this.form.value.questions.map((question: any) => {
        return {
          question: question.question,
          answers: question.answers.join(','),
          type: 'unique',
          good_answer: question.good_answer - 1
        } as Question;
      })
    } as Quizz;
    this._quizzService.createQuizz(quizz).subscribe({
      next: () => {
        this.onBack();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  onBack(): void {
    this.router.navigate([`/documents/${this.router.url.split('/')[3]}/`]);
  }

}
