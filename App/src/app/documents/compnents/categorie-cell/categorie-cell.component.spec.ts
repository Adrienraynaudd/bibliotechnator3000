import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieCellComponent } from './categorie-cell.component';

describe('CategorieCellComponent', () => {
  let component: CategorieCellComponent;
  let fixture: ComponentFixture<CategorieCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
