import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from '../models/Team';
import { TeamService } from '../service/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {

  addTeamForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private teamService: TeamService, private router: Router) {

    this.addTeamForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      formationYear: ['', [Validators.required]],
      homeStadium: ['', [Validators.required]],
      managerTeam: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  addTeam() {
    if (this.addTeamForm.valid) {
      this.teamService.addTeam(this.addTeamForm.value).subscribe(() => {
        console.log(this.addTeamForm.value);
        this.addTeamForm.reset();
        this.router.navigate(['/dashboard/all-teams']);
      })
    } else {
      this.addTeamForm.markAllAsTouched();
      return;
    }
  }

  get f() { return this.addTeamForm.controls; }

  
}



