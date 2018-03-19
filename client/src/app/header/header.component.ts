import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router,
  @Inject('Classified_URL') private Classified_URL : string) { }

  ngOnInit() {
  }
  PostingClassified(){
      
      this.router.navigateByUrl(this.Classified_URL+"/new");
  }

}
