import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzCreateComponent } from './quizz-create.component';

describe('QuizzCreateComponent', () => {
  let component: QuizzCreateComponent;
  let fixture: ComponentFixture<QuizzCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
