import { useQuery } from "@tanstack/react-query";
import { IUser } from "../models";

const fetchUsers = async (): Promise<IUser[]> => {
  const response = await fetch("https://67e534de18194932a5850d13.mockapi.io/api/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}