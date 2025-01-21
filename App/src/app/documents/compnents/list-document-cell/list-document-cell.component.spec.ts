import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocumentCellComponent } from './list-document-cell.component';

describe('ListDocumentCellComponent', () => {
  let component: ListDocumentCellComponent;
  let fixture: ComponentFixture<ListDocumentCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDocumentCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDocumentCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
