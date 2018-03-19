import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryResolverService implements Resolve<Observable<string[]> | Promise<string[]> | string[]> {

  categories : string[];
  constructor( private categoryService : CategoryService) { }
  resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) 
    : Observable<string[]> | Promise<string[]> | string[] {
  
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
    return this.categories;
  }

}
