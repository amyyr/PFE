import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import Router for navigation
import { Profile, ProfileService } from 'src/app/profile.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dropdownVisible: boolean = false; 
  userImage: string | null = null;  // Store user profile image URL
  profile: Profile | null = null;   // Stores user profile data

  constructor(
    private router: Router,          // Inject Router for navigation
    private http: HttpClient,
    private profileService: ProfileService // Inject ProfileService
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.fetchUserProfile(); // Fetch user profile data
      this.fetchUserImage();   // Fetch user profile image from specific API
    }
  }

  // Check if the user is logged in by verifying if the token is stored in localStorage
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Fetch the user's profile data
  fetchUserProfile(): void {
    this.profileService.getManagerToken().subscribe(
      (data: Profile) => {
        this.profile = data; // Store profile data
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  // Fetch the user's profile image from the specific API
  fetchUserImage(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found! Please log in.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    this.http.get('http://localhost:8080/api/image/manager/image', { headers, responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.userImage = reader.result as string;  // Convert blob to data URL for displaying
        };
        reader.readAsDataURL(response);
      },
      (error) => {
        console.error('Error fetching profile image:', error);
        this.userImage = 'assets/images/default-profile.jpg'; // Default image on error
      }
    );
  }

  // Navigate to the profile page when the profile image is clicked
  onImageClick(): void {
    this.router.navigate(['/aa']);  // Navigate to /aa route when image is clicked
  }

  // Logout functionality to clear token and redirect to the homepage
  logout(): void {
    localStorage.removeItem('token'); // Remove token from localStorage
    this.router.navigate(['/']); // Navigate back to the home page or login
  }

  // Open the mobile nav menu
  openNav(): void {
    const overlay = document.getElementById('mobile-menu');
    if (overlay) {
      overlay.classList.add('overlay--active');
    }
  }

  // Close the mobile nav menu
  closeNav(): void {
    const overlay = document.getElementById('mobile-menu');
    if (overlay) {
      overlay.classList.remove('overlay--active');
    }
  }

  // Toggle the dropdown visibility
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
