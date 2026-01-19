import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CountryDetailsComponent } from './country-details.component';
import { RegionState } from '../state/region.reducer';

describe('CountryDetailsComponent', () => {
  let component: CountryDetailsComponent;
  let fixture: ComponentFixture<CountryDetailsComponent>;
  let store: MockStore;

  const initialState: { regions: RegionState } = {
    regions: {
      region1: 'Asia',
      region2: 'Europe',
      regionInit: ['Asia', 'Europe'],
      regionSelected: 'Europe',
      countries: [],
      countrySelected: {
        name: 'Germany',
        capital: 'Berlin',
        population: '83000000',
        currencies: [{ name: 'Euro' }],
        flag: 'https://example.com/germany.svg'
      },
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CountryDetailsComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
