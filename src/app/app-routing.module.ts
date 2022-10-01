import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { UserModule } from './user/user.module';
const routes: Routes = [
  {path: '', redirectTo: 'auth',pathMatch: 'full'},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
