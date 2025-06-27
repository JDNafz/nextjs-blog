import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { User } from "@/lib/interfaces/User";

interface UserContextType {
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

//because user can be null, this checks for user, assuring TS on other pages that anything returned from useUser will have a value.
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a Page Provider");
  }
  return context;
};
