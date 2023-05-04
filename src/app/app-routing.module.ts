import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {ClipComponent} from "./clip/clip.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ClipService} from "./services/clip/clip.service";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'clip/:id',
    component: ClipComponent,
    resolve: {
      clip: ClipService
    }
  },
  {
    path: '',
    loadChildren: async () => (await import('./video/video.module')).VideoModule
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
