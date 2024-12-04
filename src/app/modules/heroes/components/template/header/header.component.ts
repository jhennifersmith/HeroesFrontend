import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../services/header.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private headerService: HeaderService, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    
  }

  get title(): string {
    return this.headerService.headerData.title
  }

  get routeUrl(): string {
    return this.headerService.headerData.routeUrl
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}
