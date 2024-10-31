import { HeaderService } from 'src/app/modules/heroes/services/header.service';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private headerService: HeaderService, @Inject(DOCUMENT) public document: Document){
    headerService.headerData = {
      title: 'Página Inicial',
      routeUrl: ''
    }
  }

  ngOnInit(): void {
    
  }

}
