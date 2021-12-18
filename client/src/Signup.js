import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./Signup.css";

export function Signup() {
  const historys = useHistory();
  function handleSigupEvent(e) {
    e.preventDefault();
    let password = e.target[2].value;
    let confirmPassword = e.target[3].value;

    if (password != confirmPassword) {
      alert("password doesnot match");
    } else {
      fetch("https://colorcombi.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: e.target[0].value,
          emailId: e.target[1].value,
          userPassword: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => nextSteps(data));

      function nextSteps(data) {
        if (data.msg) {
          alert(data.msg);
        } else {
          historys.push("/login");
        }
      }
    }
  }
  return (
    <div className="welcomelayout">
      <form onSubmit={handleSigupEvent}>
        <label htmlFor="userName" /> <span>*</span> Username: <br />
        <input type="text" name="userName" id="userName" required />
        <br />
        <br />
        <label htmlFor="EmailId" />
        <span>*</span> EmailId:
        <br />
        <input type="email" name="EmailId" id="EmailId" required />
        <br />
        <br />
        <label htmlFor="Password" /> <span>*</span> Password:
        <br />
        <input type="password" name="Password" id="Password" required />
        <br />
        <br />
        <label htmlFor="ConfirmPasword" /> <span>*</span> ConfirmPasword:
        <br />
        <input
          type="password"
          name="ConfirmPasword"
          id="ConfirmPasword"
          required
        />
        <br />
        <br />
        <h6>
          Already having an account?
          <Link to="/login" className="linkbar">
            Login
          </Link>
        </h6>
        <button type="submit">Submit</button>
        <button>
          <Link to="/" className="linktag">
            Back to home
          </Link>
        </button>
      </form>
    </div>
  );
}
