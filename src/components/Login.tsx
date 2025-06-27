import { useUser } from "@/context/UserProvider";
import { User } from "@/lib/interfaces/User";
import { useState } from "react";
import myCSS from "../styles/Home.module.css";

const Login: React.FC = () => {
  const { loggedInUser, setLoggedInUser } = useUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isReg, setIsReg] = useState<boolean>(false);
  const [blankError, setBlankError] = useState<boolean>(false);

  const logout = () => {
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div className="login">
        <div>{`Logged in as ${loggedInUser.name}`}</div>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  const toggleReg = () => {
    setIsReg((isReg) => !isReg);
    setBlankError(false);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isReg) {
      if (!name.trim()) {
        setBlankError(true);
        return;
      }
    }
    if (!email.trim() || !password.trim()) {
      setBlankError(true);
      return;
    }
    if (isReg) {
      try {
        const res1 = await fetch(`http://localhost:5000/users/?email=${email}`);
        const foundUser = await res1.json();
        if (foundUser) {
          throw new Error("a user with this email already exists");
        }
        const newUser: Omit<User, "id"> = {
          email: email.trim(),
          password: password.trim(),
          name: name.trim(),
        };
        const res = await fetch(`http://localhost:5000/users/`, {
          method: "POST",
          body: JSON.stringify(newUser),
        });
        const registeredUser = await res.json();
        setLoggedInUser(registeredUser);
        console.log(`${registeredUser} has been registered and logged in.`);
      } catch (err) {
        console.log("registration error:", err);
      }
    } else {
      //login:
      try {
        const res = await fetch(`http://localhost:5000/users/?email=${email}`);
        const foundUser = await res.json();
        if (!foundUser) {
          throw new Error("No user found with that email");
        }
        if (foundUser.password === password) {
          setLoggedInUser(foundUser);
          console.log(`${foundUser} has been logged in.`);
        }
      } catch (err) {
        throw new Error(`Login Error: ${err}`)
      }
    }
  }

  return (
    <div className="login">
      {/* <div className="quick-log-in-during-development">
        {users.map((user) => {
          return (
            <button
              key={user.id}
              className="btn tall-btn extra-wide-btn"
              onClick={() => setLoggedInUser(user)}
            >
              Quick Login {user.username}
            </button>
          );
        })}
      </div> */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login">
          <h2 className="landing-h2">{isReg ? "Register" : "Login"}</h2>
          {isReg && (
            <>
              <div>Display Name</div>
              <input
                type="name"
                tabIndex={1}
                id="name-input"
                autoComplete="none"
                placeholder={blankError && !name.trim() ? "Required*" : ""}
                className={blankError && !name.trim() ? myCSS.blankError : ""}
                onChange={(e) => setName(e.target.value)}
                value={name}
              ></input>
            </>
          )}
          <div>Email</div>
          <input
            type="email"
            tabIndex={1}
            id="email-input"
            autoComplete="email"
            className={blankError && !email.trim() ? myCSS.blankError : ""}
            placeholder={blankError && !email.trim() ? "Required*" : ""}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
          <div>Password</div>
          <input
            type="password"
            tabIndex={1}
            id="login-password"
            autoComplete="current-password"
            value={password}
            className={blankError && !password.trim() ? myCSS.blankError : ""}
            placeholder={blankError && !password.trim() ? "Required*" : ""}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div>
            <button className="btn" type="submit">
               {isReg ? "Register" : "Login"}
            </button>
          </div>
          <button className="toggleIsReg" type="button" onClick={toggleReg}>
            {isReg ? "Back to Login" : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  ); //return
}; //Landing
export default Login;
