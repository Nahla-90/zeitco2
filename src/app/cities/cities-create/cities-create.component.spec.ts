import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CitiesCreateComponent} from './cities-create.component';

describe('RestaurantCreateComponent', () => {
  let component: CitiesCreateComponent;
  let fixture: ComponentFixture<CitiesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CitiesCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
