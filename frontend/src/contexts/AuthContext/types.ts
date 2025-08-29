import { UserRole } from "@/types/auth";

export type AuthContextType = {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
