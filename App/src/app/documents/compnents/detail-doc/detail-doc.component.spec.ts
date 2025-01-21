import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDocComponent } from './detail-doc.component';

describe('DetailDocComponent', () => {
  let component: DetailDocComponent;
  let fixture: ComponentFixture<DetailDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
