import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { GuardGuard } from './guard/guard.guard';
import { LayoutComponent } from './module/layout/layout.component';

import { MapComponent } from './map/map.component';
import { TestComponent } from './test/test.component';
import { GsMapComponent } from './gs-map/gs-map.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'map',
    canActivate: [GuardGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: TestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
