import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachervideoComponent } from './teachervideo.component';

describe('TeachervideoComponent', () => {
  let component: TeachervideoComponent;
  let fixture: ComponentFixture<TeachervideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachervideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachervideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
