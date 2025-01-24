import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewDocComponent } from './form-new-doc.component';

describe('FormNewDocComponent', () => {
  let component: FormNewDocComponent;
  let fixture: ComponentFixture<FormNewDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNewDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
