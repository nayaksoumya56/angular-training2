import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawflowComponent } from './drawflow.component';

describe('DrawflowComponent', () => {
  let component: DrawflowComponent;
  let fixture: ComponentFixture<DrawflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
