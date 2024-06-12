import { Component } from '@angular/core';
import { ManagerService } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {

  managers:any;
team: any;

  constructor(private managerService: ManagerService,private router:Router) {}


  deleteManager(id: number){
    
    if (confirm('Are you sure you want to delete this manager')) {
      this.managerService.deleteManager(id).subscribe(() => {
        console.log("Deleted");
        this.getAllManagers();
      })
    }
  }

  ngOnInit() {
    this.getAllManagers();
  }

  getAllManagers() {
    this.managerService.getAllManager().subscribe((data) => {
      this.managers = data;
      console.log(data);
    })
  }

 
  updateManager(id:any) {
    this.router.navigate([`/dashboard/update-manager/${id}`]);
  }
  
}
