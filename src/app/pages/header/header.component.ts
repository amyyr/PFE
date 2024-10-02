import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';
import { Profile, ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dropdownVisible: boolean = false;
  actionDropdownVisible: boolean = false;  // Added for Action dropdown visibility
  userImage: string | null = null;
  profile: Profile | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private profileService: ProfileService,
    public dialog: MatDialog,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.fetchUserProfile();
      this.fetchUserImage();
    }
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  fetchUserProfile(): void {
    this.profileService.getManagerToken().subscribe(
      (data: Profile) => {
        this.profile = data;
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  fetchUserImage(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found!');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    this.http.get('http://localhost:8080/api/image/manager/image', { headers, responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.userImage = reader.result as string;
        };
        reader.readAsDataURL(response);
      },
      (error) => {
        console.error('Error fetching profile image:', error);
        this.userImage = 'assets/images/default-profile.jpg';
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  toggleActionDropdown(): void {
    this.actionDropdownVisible = !this.actionDropdownVisible;
  }

  openNav(): void {
    const overlay = document.getElementById('mobile-menu');
    if (overlay) {
      overlay.classList.add('overlay--active');
    }
  }

  closeNav(): void {
    const overlay = document.getElementById('mobile-menu');
    if (overlay) {
      overlay.classList.remove('overlay--active');
    }
  }

  openAuthDialog(): void {
    this.dialog.open(AuthComponent, {
      width: '500px',
      height: 'auto',
      disableClose: false,
    });
  }
   // Add a click listener to detect clicks outside the dropdowns
   @HostListener('document:click', ['$event'])
   clickout(event: Event) {
     // Check if the click is outside the profile or action dropdowns
     if (!this.elementRef.nativeElement.contains(event.target)) {
       this.dropdownVisible = false;
       this.actionDropdownVisible = false;
     }
   }
}
