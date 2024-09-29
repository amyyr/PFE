// Step 1: Define the API response model without the image
interface UserResponse {
  id: number;
  email: string;
  password: string;
  role: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  birthday: string | null;
  sexe: string | null;
  token: string | null;
  adress: string | null;
  tokenCreationDate: string | null;
  verificationCode: string;
  verificationCodeExpiry: string;
  verified: boolean;
  status: string;
}

// Step 2: Fetch and process the data
fetch('http://localhost:8080/api/manager/token')
  .then((response) => response.json())
  .then((data: UserResponse) => {
    // Exclude the image property by not using it
    const {
      id,
      email,
      password,
      role,
      firstName,
      lastName,
      phone,
      birthday,
      sexe,
      token,
      adress,
      tokenCreationDate,
      verificationCode,
      verificationCodeExpiry,
      verified,
      status
    } = data;

    // Process the data without the image property
    console.log('User ID:', id);
    console.log('Email:', email);
    console.log('Role:', role);
    // You can now work with the remaining data
  })
  .catch((error) => {
    console.error('Error fetching user data:', error);
  });
