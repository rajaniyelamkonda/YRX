import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DisplayClassifiedComponent } from './classifieds/display-classified/display-classified.component';
import { CategoryResolverService } from './category/category-resolver.service';

const routes : Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, resolve : {'categories': CategoryResolverService} },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports : [RouterModule]
})
export class AppRoutesModule { }
