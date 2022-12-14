import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabularComponent } from './tabular.component';

describe('TabularComponent', () => {
  let component: TabularComponent;
  let fixture: ComponentFixture<TabularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
