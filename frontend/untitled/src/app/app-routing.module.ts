import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthGuard } from './guards/auth.guard';
import { PermissionGuard } from './guards/permission.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { requiredPermission: 'can_read' }
  },
  {
    path: 'users/create',
    component: UserFormComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { requiredPermission: 'can_create' }
  },
  {
    path: 'users/:id/edit',
    component: UserFormComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { requiredPermission: 'can_edit' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
