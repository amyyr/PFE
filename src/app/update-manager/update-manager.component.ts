import { Component } from '@angular/core';
import { ManagerService } from '../manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-manager',
  templateUrl: './update-manager.component.html',
  styleUrls: ['./update-manager.component.css']
})
export class UpdateManagerComponent {
  updateManagerForm!: FormGroup;
  id!: string;
  managers: any;

  constructor(
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initializeForm();
    this.loadTeamData();
  }

  initializeForm(): void {
    this.updateManagerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
     email: ['', [Validators.required]],
    
    });
  }

  loadTeamData(): void {
    this. managerService.getManagerById(this.id).subscribe(manager => {
      this.updateManagerForm.patchValue(manager);
    });
  }

 
  updateManager(): void {
    if (this.updateManagerForm.valid) {
      this.managerService.updateManager(this.updateManagerForm.value,this.id).subscribe({
        next: () => {
          console.log('Team updated:', this.updateManagerForm.value);
          this.router.navigate(['/dashboard/Manager']);
        },
        error: (err) => console.error('Update failed', err)
      });
    } else {
      this.updateManagerForm.markAllAsTouched();
    }
  }

  get f() { return this.updateManagerForm.controls; }




  deleteManager(){}
}
