import { Injectable, Inject } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

  constructor( @Inject('Base_URL') private base_URL: string, private http: Http) { }

  url = this.base_URL + '/categories';
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  getCategories(): Observable<string[]> {
    return this.http.get(this.url , this.options)
      .map(res => { return res.json() })
      .catch(this.errorMessage)
      .publishReplay(1)
      .refCount()
      .share();
  }
  private errorMessage(error: any) {
    console.log("Error When dealing with Categories");
    return Observable.throw(error);
  }

}
