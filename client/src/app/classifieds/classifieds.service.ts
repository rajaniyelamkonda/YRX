import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Classified } from '../model/classified.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs';

@Injectable()
export class ClassifiedsService {

  constructor( @Inject('Base_URL') private base_URL: string,
    @Inject('Classified_URL') private Classified_URL: string,
    private http: Http) { }

  url = this.base_URL + this.Classified_URL;
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  postImage(formData : FormData, id: String): Observable<string> {
    let url1 = this.base_URL + '/files'+"?id="+id;
    return this.http.post(url1, formData)
      .catch(this.errorMessage)
  }

  getClassified(id: string): Observable<Classified> {
    return this.http.get(this.url + '/' + id, this.options)
      .map(res => { return res.json() as Classified })
      .catch(this.errorMessage);
  }
  getAllClassifieds(location: string, category: string, page : Number): Observable<Classified[]> {
    let urlWithParams = this.url + "?location=" + location + "&category=" + category + "&page=" + page;
    return this.http.get(urlWithParams, this.options)
      .map(res => { return res.json() as Classified[] })
      .catch(this.errorMessage);
  }
  private errorMessage(error: any) {
    console.log("Error When dealing with Classifieds");
    return Observable.throw(error);
  }

  postClassified(classified: Classified): Observable<Classified> {
    let url1 = this.url + '/new';
    let headers = new Headers();
    headers.delete('Content-Type');
    //headers.append('Content-Type', 'multipart/form-data');
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(url1, classified, this.options)
      .map(res => { return res.json() as Classified })
      .catch(this.errorMessage)
  }
}
