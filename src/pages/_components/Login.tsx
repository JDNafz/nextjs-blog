import { useUser } from "@/context/UserProvider";
import { useState } from "react";
import myCSS from "../../styles/Home.module.css";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const { loggedInUser, setLoggedInUser } = useUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isReg, setIsReg] = useState<boolean>(false);
  const [blankError, setBlankError] = useState<boolean>(false);
  const router = useRouter();

  const logout = () => {
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div className="loggedIn">
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
    if (!email.trim() || !password.trim()) {
      setBlankError(true);
      return;
    }
    if (isReg) {
      if (!name.trim()) {
        setBlankError(true);
        return;
      }
      try {
        const res = await (
          await fetch(`/api/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "register",
              email: email.trim(),
              password: password.trim(),
              name: name.trim(),
            }),
          })
        ).json();
        const registeredUser = res.data;
        setLoggedInUser(registeredUser);
        console.log(`${registeredUser} has been registered and logged in.`);
        router.push("/blog");
      } catch (err) {
        console.log("registration error:", err);
      }
    } else {
      // isReg was false
      //login:
      try {
        const res = await (
          await fetch("/api/users/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "login",
              email: email.trim(),
              password: password.trim(),
            }),
          })
        ).json();
        const returnedUser = res.data;
        setLoggedInUser(returnedUser);
        // reset Inputs
        setEmail("");
        setPassword("");
        router.push("/blog");
      } catch (err) {
        throw new Error(`Login Error: ${err}`);
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
