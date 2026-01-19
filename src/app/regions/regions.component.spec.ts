import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { RegionsComponent } from './regions.component';
import { RegionState } from '../state/region.reducer';

describe('RegionsComponent', () => {
  let component: RegionsComponent;
  let fixture: ComponentFixture<RegionsComponent>;
  let store: MockStore;

  const initialState: { regions: RegionState } = {
    regions: {
      region1: 'Asia',
      region2: 'Europe',
      regionInit: ['Asia', 'Europe'],
      regionSelected: '',
      countries: [],
      countrySelected: {
        name: '',
        capital: '',
        population: '',
        currencies: [{ name: '' }],
        flag: ''
      },
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [RegionsComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(RegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
