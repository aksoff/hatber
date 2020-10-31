import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component'
import { CategoriesPageComponent } from './categories-page/categories-page.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { OverviewPageComponent } from './overview-page/overview-page.component'
import { PerformersFormComponent } from './performers-page/performers-form/performers-form.component'
import { PerformersPageComponent } from './performers-page/performers-page.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { AuthGuard } from './shared/classes/auth.guard'
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component'
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component'

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent }
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewPageComponent },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'categories/:id', component: CategoriesFormComponent },
      { path: 'performers', component: PerformersPageComponent },
      { path: 'performers/new', component: PerformersFormComponent },
      { path: 'performers/:id', component: PerformersFormComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
