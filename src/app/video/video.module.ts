import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

import { VideoRoutingModule } from './video-routing.module';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    ManageComponent,
    UploadComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    ManageComponent
  ]
})
export class VideoModule { }
