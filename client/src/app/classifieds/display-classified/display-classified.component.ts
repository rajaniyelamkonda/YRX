import { Component, OnInit } from '@angular/core';
import { Classified } from '../../model/classified.service';
import { ClassifiedsService } from '../classifieds.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-classified',
  templateUrl: './display-classified.component.html',
  styleUrls: ['./display-classified.component.css']
})
export class DisplayClassifiedComponent implements OnInit {


  classifieds : Classified[] = [];
  location = "";
  category = "";
  constructor(private classifiedServe : ClassifiedsService, private activeRoute : ActivatedRoute) { }

  ngOnInit() {
      this.activeRoute.data.subscribe(data => {
          this.location = data['searchVariables'].location || "";
          this.category = data['searchVariables'].category || "Default";
      });
      this.classifiedServe.getAllClassifieds(this.location, this.category, 10).subscribe(res=>{
        this.classifieds = res;
        console.log(res);
      });
    }
}
