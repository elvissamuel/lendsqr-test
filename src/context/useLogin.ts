import { IAdmin, ILoginResponse } from "../models";

const fetchAdmins = async (): Promise<IAdmin[]> => {
  const response = await fetch("https://67e534de18194932a5850d13.mockapi.io/api/admin");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export async function login(email: string, password: string): Promise<ILoginResponse> {
  try {
    const users = await fetchAdmins()
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    // Store user in localStorage
    localStorage.setItem("lendsqr-user", JSON.stringify(user));

    return { success: true, message: "Login successful", user };
  } catch (error) {
    return { success: false, message: `An error occurred during login: ${error}` };
  }
}