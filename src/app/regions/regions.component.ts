import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../model/country';
import { State }from '../state/app.state';
import { CountriesService } from '../shared/countries.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { getCountries, getError, getInitialRegions, getLoading, getRegionSelected } from '../state/region.reducer';
import * as regionsActions from '../../app/state/regions.actions';
@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent {

  initRegions$!: Observable<any>;
  regSelected$!: Observable<any>;
  countries$!: Observable<Country[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  countrySelected!: {};
  regionSelected: boolean = false;

  constructor(
    private store: Store<State>,
    private countryService: CountriesService,
    private router: Router
  ) {
    this.initRegions$ = this.store.select(getInitialRegions);
    this.regSelected$ = this.store.select(getRegionSelected);
    this.countries$ = this.store.select(getCountries);
    this.loading$ = this.store.select(getLoading);
    this.error$ = this.store.select(getError);
    this.getRegionSelected();
  }

  selectReg(region: string) {

    this.store.dispatch(regionsActions.setRegion({regionSelected: region}));
    if(region ==='Europe')
    this.store.dispatch(regionsActions.getEurope());
    if(region==='Asia') this.store.dispatch(regionsActions.getAsia());
    this.countries$ = this.countryService.getCountries(region);
    this.regionSelected = true;


  }

  selectCountry(country: Country){
    this.store.dispatch(regionsActions.selectCountry({country: country}));
    this.countrySelected = true;
    this.gotoCountry();

  }

  gotoCountry() {
    this.router.navigate(['country-details']);
  }

  getRegionSelected() {
    let value =''
    this.store.select(getRegionSelected).pipe().subscribe(
      (val)=> value = val
    )
    if (value!=='') this.regionSelected = true;
  }

  exit() {
    location.reload();
  }

  clearError() {
    this.store.dispatch(regionsActions.clearError());
  }

  retry(region: string) {
    this.clearError();
    if (region === 'Europe') {
      this.store.dispatch(regionsActions.getEurope());
    }
    if (region === 'Asia') {
      this.store.dispatch(regionsActions.getAsia());
    }
  }
}
