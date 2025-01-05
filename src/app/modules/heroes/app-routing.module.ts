import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from 'src/app/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { CombatComponent } from './components/combat/combat.component';
import { MissionListComponent } from './components/mission/mission-list.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'combat/getmission/:missionId', component: CombatComponent},
  { path: 'missions',component: MissionListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
