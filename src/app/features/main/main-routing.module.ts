import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { MysessionsComponent } from './mysessions/mysessions.component';
import { ExploreComponent } from './explore/explore.component';
import { AddsessionComponent } from './addsession/addsession.component';
import { ViewsessionComponent } from './viewsession/viewsession.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { SettingsComponent } from './settings/settings.component';
import { PastmeditationsComponent } from './pastmeditations/pastmeditations.component';
import { ViewoldsessionComponent } from './viewoldsession/viewoldsession.component';
import { CloudComponent } from './cloud/cloud.component';


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
        path: 'viewsession/:sessionId',
        component: ViewsessionComponent
      },
      {
        path: 'viewoldsession',
        component: ViewoldsessionComponent
      },
      {
        path: 'explore',
        component: ExploreComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'pastmeditations',
        component: PastmeditationsComponent
      },
       {
        path: 'cloud',
        component: CloudComponent
      },
      {
        path: 'editprofile',
        component: EditprofileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
export const MainRoutingComponents = [MainComponent, HomeComponent, MysessionsComponent,
  ExploreComponent, AddsessionComponent, ViewsessionComponent, ProfileComponent,
  EditprofileComponent, SettingsComponent, PastmeditationsComponent, ViewoldsessionComponent, CloudComponent];
