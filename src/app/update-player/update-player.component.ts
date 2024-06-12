import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../service/player.service';

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.css']
})
export class UpdatePlayerComponent {
  updatePlayerForm!: FormGroup;
  id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; // Get id from route
    this.initializeForm();
     this.loadPlayerData();
  }

  initializeForm(): void {
    this.updatePlayerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      position: ['', [Validators.required]],
      dateOfBirthday: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      location: ['', [Validators.required]],
      foot: [''],
      number: ['', [Validators.required]],
      height: ['', [Validators.required]],
      width: ['', [Validators.required]]
    });
  }

  loadPlayerData(): void {
    this.playerService.getPlayerById(this.id).subscribe(data => {
      this.updatePlayerForm.patchValue(data);
    });
  }

  updatePlayer(): void {
    if (this.updatePlayerForm.valid) {
      this.playerService.updatePlayer(this.updatePlayerForm.value, this.id).subscribe(() => {
        console.log('Player updated:', this.updatePlayerForm.value);
        this.router.navigate(['/dashboard/all-players'])
      });
    } else {
      this.updatePlayerForm.markAllAsTouched();
    }
  }

  get f() { return this.updatePlayerForm.controls; }
}
