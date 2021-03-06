import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { HeroSearchComponent } from './hero-search.component';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css'],
  directives: [HeroSearchComponent]
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
      private router: Router, 
      private heroService:HeroService) {
  }

  ngOnInit() {
      console.log('Dashboard init called');

    this.heroService.getHeroes().then(heroesResult => this.heroes = heroesResult.slice(1, 5));
  }
  
  gotoDetail(hero: Hero) {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}