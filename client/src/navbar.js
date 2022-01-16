import "./navbar.css";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";

export function Navbar({ setlighting, lighting, setlogin }) {
  const history = useHistory();
  let { path, url } = useRouteMatch();

  function removeTokens() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("value");
    sessionStorage.removeItem("tourname");
    alert("account has been logout");
    window.location.reload(false);
  }

  return (
    <nav>
      {path == "/tour/history" || "/tour" ? (
        ""
      ) : (
        <button onClick={() => setlighting(!lighting)} className="lightbtn">
          ligths
        </button>
      )}

      <h4 onClick={() => history.push("/")}>Color combinator</h4>
      {sessionStorage.getItem("token") ? (
        <button onClick={() => removeTokens()} className="logout">
          Log out
        </button>
      ) : (
        <div>
          <button onClick={() => history.push("/login")} className="logout">
            Login
          </button>
          <button
            onClick={() => history.push("/signup")}
            className="logout signup"
          >
            Signup
          </button>
        </div>
      )}
    </nav>
  );
}
