import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "@/lib/interfaces/User";

interface UserContextType {
  loggedInUser: User | null;
  // setLoggedInUser: React.Dispatch<SetStateAction<User | null>>;
  setLoggedInUser: (u: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        loggedInUser: loggedInUser,
        setLoggedInUser: (u: User | null) => {
          //stays
          if (u !== null) {
            localStorage.setItem("loggedInUser", JSON.stringify(u));
          } else {
						//upon logout remove user from 
            localStorage.removeItem("user");
          }
          setLoggedInUser(u);
        },
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
