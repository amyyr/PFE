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





const routes: Routes = [
  { 
    path: '',
    component: PublicLayoutComponent,
    children: [
      {"path":"",component:HomeComponent},
      {"path":"login",component:LoginComponent},
      {"path":"register",component:RegisterComponent},
      {"path":"drawing",component:DrawingComponent},
      {"path":"blog",component:BlogComponent},
      {"path":"contact",component:ContactComponent},
      {"path":"teams",component:TeamsComponent},
      {"path":"classification",component:ClassificationComponent}, 
      {"path":"VideoPopup",component:VideoPopupComponent},
      {"path":"live-score",component:LiveScoresComponent},
      {"path":"match",component:MatchComponent},
      {"path":"matchDetails",component: MatchDetailsComponent},
      {"path":"statistic",component:StatisticComponent},
      {"path":"conditions-generales",component:ConditionsGeneralesComponent},
    ]
  },   {"path":"stream",component:StreamComponent},
   

  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {path: '', redirectTo: 'add-team', pathMatch: 'full'},
      {"path":"add-team",component:AddTeamComponent},
      {"path":"all-teams",component:AllTeamsComponent},
      {"path":"update-team/:id",component:UpdateTeamComponent},
      {"path":"add-match",component:AddMatchComponent},
      {"path":"all-matches",component:AllMatchesComponent},
      {"path":"update-match/:id",component:UpdateMatchComponent},
      {"path":"add-player",component:AddPlayerComponent},
      {"path":"all-players",component:AllPlayersComponent},
      {"path":"update-player/:id",component:UpdatePlayerComponent},
      {"path":"manager",component:ManagerComponent},
      {"path":"add-manager",component:AddManagerComponent},
      {"path":"update-manager/:id",component:UpdateManagerComponent},
      {"path":"svg",component:SvgComponent},
     
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
