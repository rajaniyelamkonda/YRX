import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

interface ReturnString {
    location : string;
    category : string;
}

export class ClassifiedResolver implements Resolve<ReturnString>{
    resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) 
        : Observable<ReturnString> | Promise<ReturnString> | ReturnString{
            let location = route.queryParams['location'];
            let category = route.queryParams['category'];
           return {location :location , category :category };
    }
}