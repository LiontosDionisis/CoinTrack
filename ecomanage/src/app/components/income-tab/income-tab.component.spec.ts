import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTabComponent } from './income-tab.component';

describe('IncomeTabComponent', () => {
  let component: IncomeTabComponent;
  let fixture: ComponentFixture<IncomeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
