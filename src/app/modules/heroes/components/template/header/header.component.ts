import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private headerService: HeaderService){}

  ngOnInit(): void {
    
  }

  get title(): string {
    return this.headerService.headerData.title
  }

  get routeUrl(): string {
    return this.headerService.headerData.routeUrl
  }
}
