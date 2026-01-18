import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Country } from "../model/country";
import * as regionsAction from './regions.actions'

export interface RegionState {
  region1: string;
  region2: string;
  regionInit: string[];
  regionSelected: string;
  countries: Country[];
  countrySelected: Country;
  loading: boolean;
  error: string | null;
}

const initialState: RegionState = {
  region1: 'Asia',
  region2: 'Europe',
  regionInit: ['Asia', 'Europe'],
  regionSelected: '',
  countries: [],
  countrySelected: {
    name: "",
    capital: "",
    population: "",
    currencies: [{ name: '' }],
    flag: ""
  },
  loading: false,
  error: null
}

const getRegionFeatureState = createFeatureSelector<RegionState>('regions');

export const getInitialRegions = createSelector(
  getRegionFeatureState,
  state => state.regionInit
)

export const getRegionSelected = createSelector(
  getRegionFeatureState,
  state => state.regionSelected
)

export const getCountries = createSelector(
  getRegionFeatureState,
  state => state.countries
)

export const getCountry = createSelector(
  getRegionFeatureState,
  state => state.countrySelected
)

export const getLoading = createSelector(
  getRegionFeatureState,
  state => state.loading
)

export const getError = createSelector(
  getRegionFeatureState,
  state => state.error
)

export const regionReducer = createReducer<RegionState>(
  initialState,
  on(regionsAction.getRegions, (state): RegionState => {
    return {
      ...state
    }
  }),
  on(regionsAction.getAsia, regionsAction.getEurope, (state): RegionState => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),
  on(regionsAction.setRegion, (state, action): RegionState => {
    return {
      ...state,
      regionSelected: action.regionSelected,
      countrySelected: {
        name: "",
        capital: "",
        population: "",
        currencies: [{ name: '' }],
        flag: ""
      }
    }
  }),
  on(regionsAction.setCountries, (state, action): RegionState => {
    return {
      ...state,
      countries: action.countries,
      loading: false,
      error: null
    }
  }),
  on(regionsAction.selectCountry, (state, action): RegionState => {
    return {
      ...state,
      countrySelected: action.country
    }
  }),
  on(regionsAction.loadCountriesFailure, (state, action): RegionState => {
    return {
      ...state,
      loading: false,
      error: action.error,
      countries: []
    }
  }),
  on(regionsAction.clearError, (state): RegionState => {
    return {
      ...state,
      error: null
    }
  })
)
