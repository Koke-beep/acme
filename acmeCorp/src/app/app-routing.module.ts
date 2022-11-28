import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCredentialsGuard } from './guards/auth-credentials.guard';
import { AuthLoadGuard } from './guards/auth-load.guard';

const routes: Routes = [
  { path: 'homepage', loadChildren: () => import('./modules/homepage/homepage.module').then(m => m.HomepageModule) },
  { path: 'user',canActivate: [AuthCredentialsGuard], canLoad: [AuthLoadGuard], loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: '', redirectTo: 'homepage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
