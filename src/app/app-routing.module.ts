import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendNotificationFormComponent } from './components/send-notification-form/send-notification-form.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'send', component: SendNotificationFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
