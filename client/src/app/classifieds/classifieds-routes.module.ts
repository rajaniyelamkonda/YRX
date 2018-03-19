import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { DisplayClassifiedComponent } from './display-classified/display-classified.component';
import { NewClassifiedComponent } from './new-classified/new-classified.component';
import { ClassifiedResolver } from './classified-resolver.service';

const routes : Routes = [
  { path :'classifieds', component : DisplayClassifiedComponent, resolve : {searchVariables :ClassifiedResolver}}, 
  { path :'classifieds/new', component : NewClassifiedComponent}
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class ClassifiedsRoutesModule { }
