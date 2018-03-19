import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories : string[] =[];
  selectedCategory ="Default" ;
  location = "";
  constructor(private router : Router, @Inject('Classified_URL') private Classified_URL : string,
              private categoryService : CategoryService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(){
    this.categoryService.getCategories().subscribe((res) => {
        this.categories = res;
        console.log("categories");
    });
    // this.activatedRoute.data.subscribe((data) => {
    //   this.categories = data['categories'];
    //   console.log(this.categories);
    // });
  }

  SearchClassifieds(){
    if(this.selectedCategory === "Category" )
      this.selectedCategory = "Default";
    this.router.navigate([this.Classified_URL],{queryParams : {location : this.location, category : this.selectedCategory}});
  }

}
