import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent implements OnInit {
  managerId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.managerId = this.route.snapshot.paramMap.get('id');
    // Fetch manager details based on `managerId`...
  }
}