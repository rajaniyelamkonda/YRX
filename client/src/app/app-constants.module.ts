import { NgModule } from "@angular/core";

const baseUrl = "http://localhost:8080";

const clasifiedUrl = "/classifieds";

@NgModule({
    imports: [],
    declarations: [],
    providers: [{provide : 'Base_URL', useValue : baseUrl },
                {provide : 'Classified_URL', useValue : clasifiedUrl }]
  })
  export class AppConstantsModule { }