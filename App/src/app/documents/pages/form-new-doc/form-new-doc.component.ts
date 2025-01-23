import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-form-new-doc',
  imports: [
    NgFor
  ],
  templateUrl: './form-new-doc.component.html',
  styleUrl: './form-new-doc.component.css'
})
export class FormNewDocComponent {
  libraries = [
    {id: 1, name: 'Library 1'},
    {id: 2, name: 'Library 2'},
    {id: 3, name: 'Library 3'},
  ];

  submitForm(){
    console.log('Form submitted');
  }
}
