import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './public-layout.html',
  styleUrls: ['./public-layout.css']
})
export class PublicLayout {

  isHome = true;

  constructor(private router: Router, private location: Location) {
    this.isHome = this.router.url === '/';
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.isHome = e.urlAfterRedirects === '/';
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') === 'true';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  goBack() {
    this.location.back();
  }

}