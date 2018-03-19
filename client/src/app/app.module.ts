import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ClassifiedsModule } from './classifieds/classifieds.module';
import { HomeComponent } from './home/home.component';
import { AppRoutesModule } from './app-routes.module';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { CategoryService } from './category/category.service';
import { CategoryResolverService } from './category/category-resolver.service';


@NgModule({
  declarations: [AppComponent,HomeComponent, HeaderComponent],
  imports: [BrowserModule, NgbModule.forRoot(), ClassifiedsModule, AppRoutesModule, FormsModule],
  providers: [CategoryService, CategoryResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
