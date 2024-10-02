export interface Manager {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string; // This field already exists to track manager approval status
  imageUrl?: string; // Optional image URL field for manager's image
}
