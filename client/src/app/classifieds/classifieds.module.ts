import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewClassifiedComponent } from './new-classified/new-classified.component';
import { DisplayClassifiedComponent } from './display-classified/display-classified.component';
import { ClassifiedsService } from './classifieds.service';
import { ClassifiedsRoutesModule } from './classifieds-routes.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppConstantsModule } from '../app-constants.module';
import { HttpModule } from '@angular/http';
import { ClassifiedResolver } from './classified-resolver.service';

@NgModule({
  imports: [CommonModule, ClassifiedsRoutesModule, FormsModule, AppConstantsModule,HttpModule],
  declarations: [NewClassifiedComponent, DisplayClassifiedComponent],
  providers:[ClassifiedsService, ClassifiedResolver],
  exports: [RouterModule, HttpModule]
})
export class ClassifiedsModule { }
