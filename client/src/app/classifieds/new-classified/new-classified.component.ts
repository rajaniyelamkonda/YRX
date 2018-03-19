import { Component, OnInit, ViewChild } from '@angular/core';
import { Classified } from '../../model/classified.service';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { ClassifiedsService } from '../classifieds.service';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-new-classified',
  templateUrl: './new-classified.component.html',
  styleUrls: ['./new-classified.component.css']
})
export class NewClassifiedComponent implements OnInit {

  constructor(private router: Router, private classifiedsService: ClassifiedsService,
    private categoryService: CategoryService) { }

  categories: string[] = [];
  classified = new Classified();
  file:File;
  displayImage = "none";
  formData = new FormData();
  

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  OnUpload(e) {
    this.file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.formData.append("file", this.file);
    let reader = new FileReader();
    reader.addEventListener("load", (e: any)=>{     
      document.getElementById("img").setAttribute("src",e.target.result);     
      console.log(this.file);
      if(this.file)
        this.displayImage = "block";
      else
        this.displayImage = "none";
    })
    reader.readAsDataURL(this.file);
   
  }

  SubmitClassified(form: NgForm) {

    if (form.valid) {
      this.classifiedsService.postClassified(this.classified).subscribe(res => {
        if (res.location == this.classified.location) {
          //uploading image to server
          this.classifiedsService.postImage(this.formData, res.id).subscribe((res) => { })
          form.reset();
          alert("successfully added ");
          this.router.navigate(['./']);
        }
      })
    }
  }

}
