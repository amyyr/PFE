import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { WorldCupComponent } from './pages/world-cup/world-cup.component';
import { ResultComponent } from './pages/result/result.component';
import { NewComponent } from './pages/new/new.component';
import { ClassificationComponent } from './pages/classification/classification.component';
import { VideoComponent } from './pages/video/video.component';
import { BlogComponent } from './pages/blog/blog.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NouveauComponent } from './pages/nouveau/nouveau.component';
import { BannerComponent } from './banner/banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { TeamsComponent } from './teams/teams.component';
import { ContactComponent } from './contact/contact.component';
import { MatchComponent } from './match/match.component';
import { DrawingComponent } from './pages/drawing/drawing.component';
import { MatchStatisticsComponent } from './match-statistics/match-statistics.component';
import { VideoPopupComponent } from './video-popup/video-popup.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { AllTeamsComponent } from './all-teams/all-teams.component';
import { AllMatchesComponent } from './all-matches/all-matches.component';
import { AllPlayersComponent } from './all-players/all-players.component';
import { UpdateTeamComponent } from './update-team/update-team.component';
import { UpdateMatchComponent } from './update-match/update-match.component';
import { UpdatePlayerComponent } from './update-player/update-player.component';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { UpdateManagerComponent } from './update-manager/update-manager.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { DashboardLayoutComponent } from './pages/dashboard-layout/dashboard-layout.component';
import { PlayerComponent } from './pages/player/player.component';
import { ManagerComponent } from './manager/manager.component';
import { PublicLayoutComponent } from './pages/public-layout/public-layout.component';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { LiveScoresComponent } from './live-scores/live-scores.component';

import { MatchService } from './service/match.service'; // Ensure correct import path
import { TeamService } from './service/team.service';
import { SvgComponent } from './svg/svg.component';  // Ensure correct import path

import { DragDropModule } from '@angular/cdk/drag-drop';
import { StatisticComponent } from './statistic/statistic.component';
import { StreamComponent } from './stream/stream.component';
import { StreamModalComponent } from './stream-modal/stream-modal.component';
import { ConditionsGeneralesComponent } from './conditions-generales/conditions-generales.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    WorldCupComponent,
    ResultComponent,
    NewComponent,
    ClassificationComponent,
    VideoComponent,
    BlogComponent,
    LoginComponent,
    RegisterComponent,
    NouveauComponent,
    BannerComponent,
    DrawingComponent,
    MatchComponent,
    ContactComponent,
    ManagerComponent,
    TeamsComponent,
    PlayerComponent,
    VideoPopupComponent,
    MatchStatisticsComponent,
    MatchDetailsComponent,
    AllTeamsComponent,
    AllMatchesComponent,
    AllPlayersComponent,
    UpdateTeamComponent,
    UpdateMatchComponent,
    UpdatePlayerComponent,
    AddManagerComponent,
    UpdateManagerComponent,
    AddPlayerComponent,
    AddMatchComponent,
    AddTeamComponent,
    DashboardLayoutComponent,
    PublicLayoutComponent,
    MatchComponent,
    LiveScoresComponent,
    SvgComponent,
    StatisticComponent,
    StreamComponent,
    StreamModalComponent,
    ConditionsGeneralesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatListModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    VgControlsModule,
    DragDropModule,
  ],
  providers: [MatchService, TeamService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
