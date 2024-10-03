import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../service/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {

  addTeamForm: FormGroup;
  formHasErrors: boolean = false; // Control for the single error message

  constructor(private formBuilder: FormBuilder, private teamService: TeamService, private router: Router) {
    this.addTeamForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      formationYear: ['', Validators.required],
      homeStadium: ['', Validators.required],
      managerTeam: ['', Validators.required]
    });
  }

  // Method to handle form submission
  addTeam() {
    if (this.addTeamForm.valid) {
      this.teamService.addTeam(this.addTeamForm.value).subscribe(() => {
        this.addTeamForm.reset();
        this.router.navigate(['all-teams']);
      });
    } else {
      this.addTeamForm.markAllAsTouched(); // Mark all fields as touched to trigger validation
      this.formHasErrors = true; // Show the single error message at the bottom
    }
  }

  // Getter to easily access form controls
  get f() {
    return this.addTeamForm.controls;
  }
}
