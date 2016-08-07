import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
  }

ngOnInit() {
  this.sub = this.route.params.subscribe(params => {
    if (params['id'] !== undefined) {
      let id = +params['id'];
      this.navigated = true;
      this.heroService.getHero(id)
          .then(hero => this.hero = hero);
    } else {
      this.navigated = false;
      this.hero = new Hero();
    }
  });
}

save() {
  this.heroService
      .save(this.hero)
      .then(hero => {
        this.hero = hero; // saved hero, w/ id if new
        this.goBack(hero);
      })
      .catch(error => this.error = error); // TODO: Display error message
}

goBack(savedHero: Hero = null) {
  this.close.emit(savedHero);
  if (this.navigated) { window.history.back(); }
}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false; // true if navigated here
}
