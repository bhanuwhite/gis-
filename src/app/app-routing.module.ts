import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { GuardGuard } from './guard/guard.guard';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'map',
    component: MapComponent,
    canActivate: [GuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
