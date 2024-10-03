import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DrawingComponent } from './pages/drawing/drawing.component';
import { MatchComponent } from './match/match.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { TeamsComponent } from './teams/teams.component';
import { ClassificationComponent } from './pages/classification/classification.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { AllTeamsComponent } from './all-teams/all-teams.component';
import { UpdateTeamComponent } from './update-team/update-team.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { AllMatchesComponent } from './all-matches/all-matches.component';
import { UpdateMatchComponent } from './update-match/update-match.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { AllPlayersComponent } from './all-players/all-players.component';
import { UpdatePlayerComponent } from './update-player/update-player.component';
import { ManagerComponent } from './manager/manager.component';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { UpdateManagerComponent } from './update-manager/update-manager.component';
import { DashboardLayoutComponent } from './pages/dashboard-layout/dashboard-layout.component';
import { VideoPopupComponent } from './video-popup/video-popup.component';
import { PublicLayoutComponent } from './pages/public-layout/public-layout.component';
import { LiveScoresComponent } from './live-scores/live-scores.component';
import { SvgComponent } from './svg/svg.component';
import { StatisticComponent } from './statistic/statistic.component';
import { StreamComponent } from './stream/stream.component';
import { ConditionsGeneralesComponent } from './conditions-generales/conditions-generales.component';
import { AuthComponent } from './auth/auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AaaComponent } from './aaa/aaa.component';
import { VerifyComponent } from './verify/verify.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ManagerProfileComponent } from './manager-profile/manager-profile.component';
import { ReclamationListComponent } from './reclamation-list/reclamation-list.component';
import { ReclamationDetailComponent } from './reclamation-detail/reclamation-detail.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthGuard } from './auth.guard.service';
import { ArchivedManagersComponent } from './archived-managers/archived-managers.component';
import { ArchivedReclamationsComponent } from './archived-reclamations/archived-reclamations.component';
import { TeamComponent } from './team/team.component';





const routes: Routes = [
  // Public Layout
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
   
      { path: 'contact', component: ContactComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'team', component: TeamComponent , canActivate: [AuthGuard] },
      { path: 'classification', component: ClassificationComponent },
      { path: 'VideoPopup', component: VideoPopupComponent },
      { path: 'live-score', component: LiveScoresComponent },
      { path: 'match', component: MatchComponent },
      { path: 'matchDetails', component: MatchDetailsComponent },
      { path: 'statistic', component: StatisticComponent },
      { path: 'aa', component: ManagerProfileComponent  , canActivate: [AuthGuard]},
      { path: 'conditions-generales', component: ConditionsGeneralesComponent },
      { path: 'add-team', component: AddTeamComponent  , canActivate: [AuthGuard]},
      { path: 'all-teams', component: AllTeamsComponent  , canActivate: [AuthGuard]},
      { path: 'update-team/:id', component: UpdateTeamComponent  , canActivate: [AuthGuard]},
      { path: 'add-match', component: AddMatchComponent , canActivate: [AuthGuard] },
      { path: 'all-matches', component: AllMatchesComponent  , canActivate: [AuthGuard]},
      { path: 'update-match/:id', component: UpdateMatchComponent , canActivate: [AuthGuard] },
      { path: 'add-player', component: AddPlayerComponent , canActivate: [AuthGuard] },
      { path: 'all-players', component: AllPlayersComponent , canActivate: [AuthGuard] },
      { path: 'update-player/:id', component: UpdatePlayerComponent  , canActivate: [AuthGuard]},
      { path: 'manager', component: ManagerComponent  , canActivate: [AuthGuard]},
      { path: 'add-manager', component: AddManagerComponent  , canActivate: [AuthGuard]},
      { path: 'update-manager/:id', component: UpdateManagerComponent , canActivate: [AuthGuard] },
      { path: 'svg', component: SvgComponent  , canActivate: [AuthGuard]}
    ]
  },

  // Stream routes (assuming public or separate guard)
  { path: 'stream', component: StreamComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'verify', component: VerifyComponent },

  // Admin Layout with Guard (except 'admin/login')
  { path: 'admin/login', component: AdminLoginComponent },
  
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminAuthGuard], // AdminAuthGuard applied to all children routes
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'profile', component: AdminProfileComponent },
      { path: 'archived-managers', component: ArchivedManagersComponent },
      { path: 'reclamations', component: ReclamationListComponent },
      { path: 'reclamation/:id', component: ReclamationDetailComponent },
      { path: 'archived-reclamations', component: ArchivedReclamationsComponent },
      { path: 'manager/:id', component: ManagerProfileComponent }
    ]
  },
 
  // Dashboard layout with guard for internal team, match, player, etc.
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
   canActivate: [AuthGuard], // Protect dashboard
    children: [
      { path: '', redirectTo: 'add-team', pathMatch: 'full' },
      { path: 'add-team', component: AddTeamComponent },
      { path: 'all-teams', component: AllTeamsComponent },
      { path: 'update-team/:id', component: UpdateTeamComponent },
      { path: 'add-match', component: AddMatchComponent },
      { path: 'all-matches', component: AllMatchesComponent },
      { path: 'update-match/:id', component: UpdateMatchComponent },
      { path: 'add-player', component: AddPlayerComponent },
      { path: 'all-players', component: AllPlayersComponent },
      { path: 'update-player/:id', component: UpdatePlayerComponent },
      { path: 'manager', component: ManagerComponent },
      { path: 'add-manager', component: AddManagerComponent },
      { path: 'update-manager/:id', component: UpdateManagerComponent },
      { path: 'svg', component: SvgComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

