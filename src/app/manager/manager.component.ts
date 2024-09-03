import { Component, OnInit } from '@angular/core';

import { Manager } from '../models/manager';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  managers: Manager[] = []; // Ensure correct type declaration

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.managerService.getAllManagers().subscribe((data: Manager[]) => {
      this.managers = data;
    });
  }

  deleteManager(id: string): void {
    this.managerService.deleteManager(id).subscribe(() => {
      this.managerService.getAllManagers().subscribe((data: Manager[]) => {
        this.managers = data;
      });
    });
  }

  updateManager(id: string): void {
    // Logic for updating manager
  }
}
