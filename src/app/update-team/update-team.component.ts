import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-update-team',
  templateUrl:'./update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent {
  updateTeamForm!: FormGroup;
  id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initializeForm();
    this.loadTeamData();
  }

  initializeForm(): void {
    this.updateTeamForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      formationYear: ['', [Validators.required]],
      homeStadium: ['', [Validators.required]],
      managerTeam: ['', [Validators.required]],
    });
  }

  loadTeamData(): void {
    this.teamService.getTeamById(this.id).subscribe(team => {
      this.updateTeamForm.patchValue(team);
    });
  }

  updateTeam(): void {
    if (this.updateTeamForm.valid) {
      this.teamService.updateTeam(this.updateTeamForm.value, this.id).subscribe({
        next: () => {
          console.log('Team updated:', this.updateTeamForm.value);
          this.router.navigate(['/dashboard/all-teams']);
        },
        error: (err) => console.error('Update failed', err)
      });
    } else {
      this.updateTeamForm.markAllAsTouched();
    }
  }

  get f() { return this.updateTeamForm.controls; }
}
