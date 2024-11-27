import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnittBookComponent } from './unitt-book.component';

describe('UnittBookComponent', () => {
  let component: UnittBookComponent;
  let fixture: ComponentFixture<UnittBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnittBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnittBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
