import {
  regionReducer,
  RegionState,
  getInitialRegions,
  getRegionSelected,
  getCountries,
  getCountry,
  getLoading,
  getError
} from './region.reducer';
import * as regionsActions from './regions.actions';
import { Country } from '../model/country';

describe('Region Reducer', () => {
  const initialState: RegionState = {
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
  };

  const mockCountry: Country = {
    name: 'Germany',
    capital: 'Berlin',
    population: '83000000',
    currencies: [{ name: 'Euro' }],
    flag: 'https://example.com/germany.svg'
  };

  const mockCountries: Country[] = [
    mockCountry,
    {
      name: 'France',
      capital: 'Paris',
      population: '67000000',
      currencies: [{ name: 'Euro' }],
      flag: 'https://example.com/france.svg'
    }
  ];

  describe('Initial State', () => {
    it('should return the initial state when unknown action', () => {
      const action = { type: 'UNKNOWN' } as any;
      const state = regionReducer(undefined, action);

      expect(state).toEqual(initialState);
    });

    it('should have correct initial values', () => {
      const action = { type: 'UNKNOWN' } as any;
      const state = regionReducer(undefined, action);

      expect(state.region1).toBe('Asia');
      expect(state.region2).toBe('Europe');
      expect(state.regionInit).toEqual(['Asia', 'Europe']);
      expect(state.regionSelected).toBe('');
      expect(state.countries).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('getRegions action', () => {
    it('should return the same state', () => {
      const action = regionsActions.getRegions();
      const state = regionReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('getAsia action', () => {
    it('should set loading to true', () => {
      const action = regionsActions.getAsia();
      const state = regionReducer(initialState, action);

      expect(state.loading).toBe(true);
    });

    it('should clear any existing error', () => {
      const stateWithError: RegionState = {
        ...initialState,
        error: 'Previous error'
      };
      const action = regionsActions.getAsia();
      const state = regionReducer(stateWithError, action);

      expect(state.error).toBeNull();
    });

    it('should not modify other state properties', () => {
      const action = regionsActions.getAsia();
      const state = regionReducer(initialState, action);

      expect(state.regionInit).toEqual(initialState.regionInit);
      expect(state.countries).toEqual(initialState.countries);
    });
  });

  describe('getEurope action', () => {
    it('should set loading to true', () => {
      const action = regionsActions.getEurope();
      const state = regionReducer(initialState, action);

      expect(state.loading).toBe(true);
    });

    it('should clear any existing error', () => {
      const stateWithError: RegionState = {
        ...initialState,
        error: 'Previous error'
      };
      const action = regionsActions.getEurope();
      const state = regionReducer(stateWithError, action);

      expect(state.error).toBeNull();
    });
  });

  describe('setRegion action', () => {
    it('should set the selected region', () => {
      const action = regionsActions.setRegion({ regionSelected: 'Europe' });
      const state = regionReducer(initialState, action);

      expect(state.regionSelected).toBe('Europe');
    });

    it('should reset countrySelected to empty values', () => {
      const stateWithCountry: RegionState = {
        ...initialState,
        countrySelected: mockCountry
      };
      const action = regionsActions.setRegion({ regionSelected: 'Asia' });
      const state = regionReducer(stateWithCountry, action);

      expect(state.countrySelected.name).toBe('');
      expect(state.countrySelected.capital).toBe('');
      expect(state.countrySelected.population).toBe('');
      expect(state.countrySelected.flag).toBe('');
    });

    it('should not modify countries array', () => {
      const stateWithCountries: RegionState = {
        ...initialState,
        countries: mockCountries
      };
      const action = regionsActions.setRegion({ regionSelected: 'Europe' });
      const state = regionReducer(stateWithCountries, action);

      expect(state.countries).toEqual(mockCountries);
    });
  });

  describe('setCountries action', () => {
    it('should set the countries array', () => {
      const action = regionsActions.setCountries({ countries: mockCountries });
      const state = regionReducer(initialState, action);

      expect(state.countries).toEqual(mockCountries);
      expect(state.countries.length).toBe(2);
    });

    it('should set loading to false', () => {
      const loadingState: RegionState = {
        ...initialState,
        loading: true
      };
      const action = regionsActions.setCountries({ countries: mockCountries });
      const state = regionReducer(loadingState, action);

      expect(state.loading).toBe(false);
    });

    it('should clear any existing error', () => {
      const stateWithError: RegionState = {
        ...initialState,
        loading: true,
        error: 'Previous error'
      };
      const action = regionsActions.setCountries({ countries: mockCountries });
      const state = regionReducer(stateWithError, action);

      expect(state.error).toBeNull();
    });

    it('should handle empty countries array', () => {
      const action = regionsActions.setCountries({ countries: [] });
      const state = regionReducer(initialState, action);

      expect(state.countries).toEqual([]);
    });
  });

  describe('selectCountry action', () => {
    it('should set the selected country', () => {
      const action = regionsActions.selectCountry({ country: mockCountry });
      const state = regionReducer(initialState, action);

      expect(state.countrySelected).toEqual(mockCountry);
    });

    it('should update countrySelected with all properties', () => {
      const action = regionsActions.selectCountry({ country: mockCountry });
      const state = regionReducer(initialState, action);

      expect(state.countrySelected.name).toBe('Germany');
      expect(state.countrySelected.capital).toBe('Berlin');
      expect(state.countrySelected.population).toBe('83000000');
      expect(state.countrySelected.currencies[0].name).toBe('Euro');
      expect(state.countrySelected.flag).toBe('https://example.com/germany.svg');
    });

    it('should not modify countries array', () => {
      const stateWithCountries: RegionState = {
        ...initialState,
        countries: mockCountries
      };
      const action = regionsActions.selectCountry({ country: mockCountry });
      const state = regionReducer(stateWithCountries, action);

      expect(state.countries).toEqual(mockCountries);
    });
  });

  describe('loadCountriesFailure action', () => {
    it('should set the error message', () => {
      const errorMessage = 'Unable to connect to server';
      const action = regionsActions.loadCountriesFailure({ error: errorMessage });
      const state = regionReducer(initialState, action);

      expect(state.error).toBe(errorMessage);
    });

    it('should set loading to false', () => {
      const loadingState: RegionState = {
        ...initialState,
        loading: true
      };
      const action = regionsActions.loadCountriesFailure({ error: 'Error' });
      const state = regionReducer(loadingState, action);

      expect(state.loading).toBe(false);
    });

    it('should clear countries array', () => {
      const stateWithCountries: RegionState = {
        ...initialState,
        loading: true,
        countries: mockCountries
      };
      const action = regionsActions.loadCountriesFailure({ error: 'Network error' });
      const state = regionReducer(stateWithCountries, action);

      expect(state.countries).toEqual([]);
    });

    it('should handle different error messages', () => {
      const errors = [
        'Unable to connect to server. Please check your internet connection.',
        'The requested resource was not found.',
        'Server error. Please try again later.',
        'An unexpected error occurred.'
      ];

      errors.forEach(errorMessage => {
        const action = regionsActions.loadCountriesFailure({ error: errorMessage });
        const state = regionReducer(initialState, action);
        expect(state.error).toBe(errorMessage);
      });
    });
  });

  describe('clearError action', () => {
    it('should clear the error', () => {
      const stateWithError: RegionState = {
        ...initialState,
        error: 'Some error'
      };
      const action = regionsActions.clearError();
      const state = regionReducer(stateWithError, action);

      expect(state.error).toBeNull();
    });

    it('should not modify other state properties', () => {
      const stateWithError: RegionState = {
        ...initialState,
        regionSelected: 'Europe',
        countries: mockCountries,
        error: 'Some error'
      };
      const action = regionsActions.clearError();
      const state = regionReducer(stateWithError, action);

      expect(state.regionSelected).toBe('Europe');
      expect(state.countries).toEqual(mockCountries);
    });

    it('should work when error is already null', () => {
      const action = regionsActions.clearError();
      const state = regionReducer(initialState, action);

      expect(state.error).toBeNull();
    });
  });

  describe('State Immutability', () => {
    it('should not mutate the original state on setRegion', () => {
      const action = regionsActions.setRegion({ regionSelected: 'Asia' });
      const originalState = { ...initialState };
      regionReducer(initialState, action);

      expect(initialState).toEqual(originalState);
    });

    it('should not mutate the original state on setCountries', () => {
      const action = regionsActions.setCountries({ countries: mockCountries });
      const originalState = { ...initialState };
      regionReducer(initialState, action);

      expect(initialState).toEqual(originalState);
    });

    it('should not mutate the original state on loadCountriesFailure', () => {
      const action = regionsActions.loadCountriesFailure({ error: 'Error' });
      const originalState = { ...initialState };
      regionReducer(initialState, action);

      expect(initialState).toEqual(originalState);
    });
  });
});

describe('Region Selectors', () => {
  const mockState = {
    regions: {
      region1: 'Asia',
      region2: 'Europe',
      regionInit: ['Asia', 'Europe'],
      regionSelected: 'Europe',
      countries: [
        {
          name: 'Germany',
          capital: 'Berlin',
          population: '83000000',
          currencies: [{ name: 'Euro' }],
          flag: 'https://example.com/germany.svg'
        }
      ],
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

  describe('getInitialRegions', () => {
    it('should return the initial regions array', () => {
      const result = getInitialRegions(mockState as any);
      expect(result).toEqual(['Asia', 'Europe']);
    });
  });

  describe('getRegionSelected', () => {
    it('should return the selected region', () => {
      const result = getRegionSelected(mockState as any);
      expect(result).toBe('Europe');
    });

    it('should return empty string when no region selected', () => {
      const stateNoSelection = {
        regions: { ...mockState.regions, regionSelected: '' }
      };
      const result = getRegionSelected(stateNoSelection as any);
      expect(result).toBe('');
    });
  });

  describe('getCountries', () => {
    it('should return the countries array', () => {
      const result = getCountries(mockState as any);
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Germany');
    });

    it('should return empty array when no countries', () => {
      const stateNoCountries = {
        regions: { ...mockState.regions, countries: [] }
      };
      const result = getCountries(stateNoCountries as any);
      expect(result).toEqual([]);
    });
  });

  describe('getCountry', () => {
    it('should return the selected country', () => {
      const result = getCountry(mockState as any);
      expect(result.name).toBe('Germany');
      expect(result.capital).toBe('Berlin');
    });
  });

  describe('getLoading', () => {
    it('should return false when not loading', () => {
      const result = getLoading(mockState as any);
      expect(result).toBe(false);
    });

    it('should return true when loading', () => {
      const loadingState = {
        regions: { ...mockState.regions, loading: true }
      };
      const result = getLoading(loadingState as any);
      expect(result).toBe(true);
    });
  });

  describe('getError', () => {
    it('should return null when no error', () => {
      const result = getError(mockState as any);
      expect(result).toBeNull();
    });

    it('should return error message when error exists', () => {
      const errorState = {
        regions: { ...mockState.regions, error: 'Network error' }
      };
      const result = getError(errorState as any);
      expect(result).toBe('Network error');
    });
  });
});
