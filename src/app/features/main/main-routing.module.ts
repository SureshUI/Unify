import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { MysessionsComponent } from './mysessions/mysessions.component';
import { ExploreComponent } from './explore/explore.component';
import { AddsessionComponent } from './addsession/addsession.component';


const routes: Routes = [
  
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/main/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'mysessions',
        component: MysessionsComponent
      },
      {
        path: 'addsession',
        component: AddsessionComponent
      },
      {
        path: 'explore',
        component: ExploreComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
export const MainRoutingComponents = [MainComponent, HomeComponent, MysessionsComponent, ExploreComponent, AddsessionComponent];
