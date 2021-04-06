import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {}


  ngOnInit() {
    // USANDO UM OBSERVABLE. Rotas dinâmicas
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')))
    );

    // USANDO UM SNAPSHOT, rotas estáticas
    // const id = this.route.snapshot.paramMap.get('id');
    // this.hero$ = this.service.getHero(id);

    //snapshot only gets the initial value of the parameter map with this technique. Use the observable paramMap approach 
    //if there's a possibility that the router could re-use the component. This tutorial sample app uses with the observable paramMap.

  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

  // gotoHeroes() {
  //   this.router.navigate(['/heroes']);
  // }
}
