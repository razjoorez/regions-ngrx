import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountriesService } from '../shared/countries.service';
import * as regionsActions from '../state/regions.actions';
import { map, switchMap, catchError, of } from 'rxjs';

@Injectable()
export class RegionsEffects {
  constructor(
    private actions$: Actions,
    private countriesService: CountriesService
  ) {}

  loadAsia$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(regionsActions.getAsia),
      switchMap(() => {
        return this.countriesService.getAsia().pipe(
          map(countries => regionsActions.setCountries({ countries })),
          catchError(error => {
            const errorMessage = this.getErrorMessage(error);
            return of(regionsActions.loadCountriesFailure({ error: errorMessage }));
          })
        );
      })
    );
  });

  loadEurope$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(regionsActions.getEurope),
      switchMap(() => {
        return this.countriesService.getEurope().pipe(
          map(countries => regionsActions.setCountries({ countries })),
          catchError(error => {
            const errorMessage = this.getErrorMessage(error);
            return of(regionsActions.loadCountriesFailure({ error: errorMessage }));
          })
        );
      })
    );
  });

  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Unable to connect to server. Please check your internet connection.';
    }
    if (error.status === 404) {
      return 'The requested resource was not found.';
    }
    if (error.status >= 500) {
      return 'Server error. Please try again later.';
    }
    return error.message || 'An unexpected error occurred.';
  }
}
