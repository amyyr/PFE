import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  dropdownVisible: boolean = false; 
  userImage: string | undefined;  
  profile: any = null;   // Stores user profile data
  userInfo: any;  

  constructor(private router: Router,private http: HttpClient) {}

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.fetchUserInfo();
    }
  }
  // Check if the user is logged in by verifying if the token is stored in localStorage
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  fetchUserInfo(): void {
    const token = localStorage.getItem('token');
    // Assuming the API URL is '/api/user-profile' and requires a token
    this.http.get<any>('API_ENDPOINT_HERE', { headers: { Authorization: `Bearer ${token}` } })
      .subscribe(response => {
        this.userInfo = response;
        this.userImage = `data:${response.image.fileType};base64,${response.image.data}`;
      });
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
    // Toggle the dropdown visibility using Angular property binding
    toggleDropdown(): void {
      this.dropdownVisible = !this.dropdownVisible;
    }
    // Display the user's email when the image is clicked
  onImageClick(): void {
    if (this.userInfo) {
      alert(`User Email: ${this.userInfo.email}`);
    }
  }
}
