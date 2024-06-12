import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TeamService } from '../service/team.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Hls from 'hls.js';
import { VideoPopupComponent } from '../video-popup/video-popup.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  videoUrl: SafeUrl | undefined;
  rawVideoUrl: string = ''; 
  countries: any = [];
  homeLeagues: any = [];
  awayLeagues: any = [];
  homeTeams: any = [];
  awayTeams: any = [];
  homePlayers: any = [];
  awayPlayers: any = [];
  selectedHomeCountry: any = null;
  selectedAwayCountry: any = null;
  selectedHomeLeague: any = null;
  selectedAwayLeague: any = null;
  selectedHomeTeam: any = null;
  selectedAwayTeam: any = null;
  inputIndexesLeft: number[] = [];
  inputIndexesRight: number[] = [];
  leftButtonClicked: boolean = false;
  rightButtonClicked: boolean = false;
  videoPath: string = "";
  spotlightPlayerName: string = "";
  videoForm: FormGroup;
  fileToUpload: any;
  selectedFileName: string = "";
  videoURL: any;
  processedVideoURL: string = "";
  uploadedFilename: string = "";  

  constructor(
    private teamService: TeamService,
    private http: HttpClient,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.videoForm = this.fb.group({
      video: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadCountries();
  }

  initializeVideo() {
    const video = this.videoPlayer.nativeElement;
    if (!this.rawVideoUrl) {
      console.error('No video URL available');
      return;
    }
    
    if (Hls.isSupported() && this.rawVideoUrl.endsWith('.m3u8')) {
      const hls = new Hls();
      hls.loadSource(this.rawVideoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = this.rawVideoUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    } else if (this.rawVideoUrl.endsWith('.mp4')) {
      video.src = this.rawVideoUrl;
      video.play();
    } else {
      console.error('Unsupported video format.');
    }
  }

  onVideoError(event: Event) {
    const videoElement = event.target as HTMLVideoElement;
    console.error('Video error:', event);
    console.log('Video Element Error Code:', videoElement.error?.code);
    console.log('Video Element Network State:', videoElement.networkState);
    console.log('Video Element Ready State:', videoElement.readyState);
    alert('Error loading video. Please check the console for more details.');
  }

  loadCountries() {
    this.teamService.getAllCountries().subscribe(data => {
      this.countries = data;
    }, error => {
      console.error('Error fetching countries:', error);
    });
  }

  onHomeCountryChange(country: any) {
    this.selectedHomeCountry = country;
    this.selectedHomeLeague = null;
    this.selectedHomeTeam = null;
    this.homePlayers = [];
    this.loadHomeLeagues(country.country_key);
  }

  onAwayCountryChange(country: any) {
    this.selectedAwayCountry = country;
    this.selectedAwayLeague = null;
    this.selectedAwayTeam = null;
    this.awayPlayers = [];
    this.loadAwayLeagues(country.country_key);
  }

  onHomeLeagueChange(league: any) {
    this.selectedHomeLeague = league;
    this.selectedHomeTeam = null;
    this.homePlayers = [];
    this.loadHomeTeams(league.league_key);
  }

  onAwayLeagueChange(league: any) {
    this.selectedAwayLeague = league;
    this.selectedAwayTeam = null;
    this.awayPlayers = [];
    this.loadAwayTeams(league.league_key);
  }

  onHomeTeamChange(team: any) {
    this.selectedHomeTeam = team;
    this.loadHomePlayers(team.team_key);
  }

  onAwayTeamChange(team: any) {
    this.selectedAwayTeam = team;
    this.loadAwayPlayers(team.team_key);
  }

  loadHomeLeagues(countryID: string) {
    this.teamService.getLeaguesByCountry(Number(countryID)).subscribe(data => {
      this.homeLeagues = data;
    }, error => {
      console.error('Error fetching leagues:', error);
    });
  }

  loadAwayLeagues(countryID: string) {
    this.teamService.getLeaguesByCountry(Number(countryID)).subscribe(data => {
      this.awayLeagues = data;
    }, error => {
      console.error('Error fetching leagues:', error);
    });
  }

  loadHomeTeams(leagueID: string) {
    this.teamService.getTeamsByLeague(Number(leagueID)).subscribe(data => {
      this.homeTeams = data;
    }, error => {
      console.error('Error fetching teams:', error);
    });
  }

  loadAwayTeams(leagueID: string) {
    this.teamService.getTeamsByLeague(Number(leagueID)).subscribe(data => {
      this.awayTeams = data;
    }, error => {
      console.error('Error fetching teams:', error);
    });
  }

  loadHomePlayers(teamID: string) {
    this.teamService.getPlayersByTeam(Number(teamID)).subscribe(data => {
      this.homePlayers = data;
    }, error => {
      console.error('Error fetching players:', error);
    });
  }

  loadAwayPlayers(teamID: string) {
    this.teamService.getPlayersByTeam(Number(teamID)).subscribe(data => {
      this.awayPlayers = data;
    }, error => {
      console.error('Error fetching players:', error);
    });
  }

  addInputsLeft() {
    if (this.selectedHomeTeam) {
      this.inputIndexesLeft.push(this.inputIndexesLeft.length);
      this.leftButtonClicked = true;
    }
  }

  addInputsRight() {
    if (this.selectedAwayTeam) {
      this.inputIndexesRight.push(this.inputIndexesRight.length);
      this.rightButtonClicked = true;
    }
  }

  removePrecedingPlusLeft() {
    this.leftButtonClicked = false;
  }

  removePrecedingPlusRight() {
    this.rightButtonClicked = false;
  }

  removeInputLeft(index: number) {
    this.inputIndexesLeft.splice(index, 1);
    if (this.inputIndexesLeft.length === 0) {
      this.leftButtonClicked = false;
    }
  }

  removeInputRight(index: number) {
    this.inputIndexesRight.splice(index, 1);
    if (this.inputIndexesRight.length === 0) {
      this.rightButtonClicked = false;
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      this.selectedFileName = this.fileToUpload.name;
    }
  }

  onUpload() {
    if (!this.fileToUpload) return;

    const formData = new FormData();
    formData.append('video', this.fileToUpload, this.fileToUpload.name);

    this.http.post<any>('https://ai.aitacticalanalysis.com/upload_video', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        const responseData = event.body;
        this.uploadedFilename = responseData.filename;
        console.log('Upload successful:', responseData);
      }
    }, error => {
      console.error('Upload error:', error);
    });
  }

  trackVideo() {
    if (!this.uploadedFilename) {
      console.error('No video uploaded');
      return;
    }
  
    const payload = {
      video_path: `input_videos/${this.uploadedFilename}`
    };
  
    this.http.post<any>('https://ai.aitacticalanalysis.com/track_video', payload).subscribe(
      response => {
        const taskId = response.task_id;
        const videoURL = `https://ai.aitacticalanalysis.com/stream_video/${taskId}`;
        this.rawVideoUrl = videoURL; 
       
        
          this.dialog.open(VideoPopupComponent, {
            data: { videoUrl: videoURL }
          });
         
      },
      error => {
        console.error('Error tracking video', error);
      }
    );
  }

  displayVideo(url: string) {
    this.processedVideoURL = url;
  }

  processVideo() {
    const url = 'https://ai.aitacticalanalysis.com/process_video';
    if (this.homePlayers.length === 0 && this.awayPlayers.length === 0) {
      console.error('No players data available');
      return;
    }

    const payload = {
      video_path: this.videoPath,
      spotlight_player_name: this.spotlightPlayerName,
      player_names: [...this.homePlayers, ...this.awayPlayers].reduce((acc, player, index) => {
        acc[index + 1] = { db_id: player.id, name: `${player.firstName} ${player.lastName}` };
        return acc;
      }, {})
    };

    this.processedVideoURL = "";

    this.http.post<any>(url, payload).subscribe(
      response => {
        console.log('Video processing started', response);
        if (response.output_video_path) {
          this.downloadAndDisplayVideo(response.output_video_path);
        }
      },
      error => {
        console.error('Error processing video', error);
        alert('Failed to process video: ' + (error.error.error || error.message));
      }
    );
  }

  downloadAndDisplayVideo(url: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      const videoURL = URL.createObjectURL(blob);
      this.displayVideo(videoURL);
      window.addEventListener('unload', () => URL.revokeObjectURL(videoURL));
    }, error => {
      console.error('Error downloading video', error);
      alert(`Error downloading video: ${error.message}`);
    });
  }
}
