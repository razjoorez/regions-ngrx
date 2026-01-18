import { createAction, props } from "@ngrx/store";
import { Country } from '../model/country';
export enum  CountriesActionTypes {
  GET_EUROPE = '[Region] Europe Selected',
  GET_ASIA = '[Region] Asia Selected'
}

export const getRegions = createAction(
  '[Region] Regions Selected'
)

export const getEurope = createAction(
  '[Region] Europe Selected'
);

export const getAsia = createAction(
  '[Region] Asia Selected'
);

export const setRegion = createAction(
  '[Region] Set Selected Region ',
  props<{regionSelected: string}>()
);

export const setCountries = createAction(
  '[Region] Set Countries',
  props<{countries: Country[]}>()
);

export const selectCountry = createAction(
  '[Region] Select Country',
  props<{country: Country}>()
)

export const loadCountriesFailure = createAction(
  '[Region] Load Countries Failure',
  props<{error: string}>()
)

export const clearError = createAction(
  '[Region] Clear Error'
)
