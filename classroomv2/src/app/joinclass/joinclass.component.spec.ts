import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinclassComponent } from './joinclass.component';

describe('JoinclassComponent', () => {
  let component: JoinclassComponent;
  let fixture: ComponentFixture<JoinclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinclassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
