import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userEmail: "",
  token: null,
  login: () => {},
  logout: () => {},
});
