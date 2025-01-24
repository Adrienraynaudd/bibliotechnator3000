import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentsService } from '../../services/documents/documents.service';
import { Router } from '@angular/router';
import { Document } from '../../models/documents';

@Component({
  selector: 'app-form-new-doc',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './form-new-doc.component.html',
  styleUrl: './form-new-doc.component.css'
})
export class FormNewDocComponent {
  libraries = [
    {id: 1, name: 'Library 1'},
  ];

  form!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly router: Router, private readonly _documentService: DocumentsService) {}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        title: ['', Validators.required],
        author: ['', Validators.required],
        file: ['', Validators.required],
        category: ['', Validators.required],
      });
    }

  submitForm(){
    const document: Document = {
      title: this.form.value.title,
      documentLink: this.form.value.file,
      category: this.form.value.category,
      synopsis: this.form.value.author,
      library: 1,
    } as any as Document;
    console.log(document);
  }
}
