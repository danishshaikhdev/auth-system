import { createContext } from "react";
import type { AuthContextType } from "../types/auth.types";

// STEP 2: Create the context
const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;