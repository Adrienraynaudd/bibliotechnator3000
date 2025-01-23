import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzCellComponent } from './quizz-cell.component';

describe('QuizzCellComponent', () => {
  let component: QuizzCellComponent;
  let fixture: ComponentFixture<QuizzCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
