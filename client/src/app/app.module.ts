import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoginPageComponent } from './login-page/login-page.component'
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component'
import { LayoutModule } from '@angular/cdk/layout'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component'
import { OverviewPageComponent } from './overview-page/overview-page.component'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { MatMenuModule } from '@angular/material/menu'
import { RegisterPageComponent } from './register-page/register-page.component'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { MatDialogModule } from '@angular/material/dialog'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { TokenInterceptor } from './shared/classes/token.interceptor'
import { PerformersPageComponent } from './performers-page/performers-page.component'
import { PerformersFormComponent } from './performers-page/performers-form/performers-form.component'
import { LoaderComponent } from './shared/components/loader/loader.component'
import { CategoriesPageComponent } from './categories-page/categories-page.component'
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component'
import { PositionsPageComponent } from './categories-page/categories-form/positions-page/positions-page.component';
import { PositionsFormComponent } from './categories-page/categories-form/positions-page/positions-form/positions-form.component';
import { OrderPageComponent } from './order-page/order-page.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    OverviewPageComponent,
    RegisterPageComponent,
    PerformersPageComponent,
    PerformersFormComponent,
    LoaderComponent,
    CategoriesPageComponent,
    CategoriesFormComponent,
    PositionsPageComponent,
    PositionsFormComponent,
    OrderPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
