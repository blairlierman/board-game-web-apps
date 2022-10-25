import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, HomeComponentModule } from './pages/home/home.component';

const routes: Routes = [{ path: '**', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes), HomeComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
