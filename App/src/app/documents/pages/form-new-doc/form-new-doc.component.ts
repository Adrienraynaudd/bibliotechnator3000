import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentsService } from '../../services/documents/documents.service';
import { Router } from '@angular/router';
import { Document } from '../../models/documents';

@Component({
  selector: 'app-form-new-doc',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './form-new-doc.component.html',
  styleUrls: ['./form-new-doc.component.css'], // Note: corrected "styleUrl" to "styleUrls"
})
export class FormNewDocComponent implements OnInit {
  libraries = [
    { id: 1, name: 'Library 1' },
  ];

  form!: FormGroup;
  selectedFile: File | null = null; // To store the selected file

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly _documentService: DocumentsService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      file: ['', Validators.required], // File is required
      category: ['', Validators.required],
    });
  }

  /**
   * Handles file selection
   */
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the selected file
      this.form.patchValue({ file: this.selectedFile.name }); // Optional: Update the form with the file name
    }
  }

  /**
   * Handles form submission
   */
  submitForm(): void {
    if (this.form.valid && this.selectedFile) {
      const formData = new FormData();
  
      formData.append('title', this.form.value.title);
      formData.append('author', this.form.value.author);
      formData.append('category', this.form.value.category);
      formData.append('library_id', '1'); // ID de la bibliothèque par défaut
      formData.append('documentFile', this.selectedFile); // Clé correspondant au contrôleur backend
  
      this._documentService.postDocument(formData).subscribe({
        next: (response) => {
          console.log('Document uploaded successfully:', response);
          this.router.navigate(['/documents']);
        },
        error: (err) => {
          console.error('Error uploading document:', err);
        },
      });
    }
  }
}
