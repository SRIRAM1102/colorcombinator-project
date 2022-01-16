import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import "./Signup.css";

export function Login() {
  const history = useHistory();

  function handleLoginEvent(e) {
    e.preventDefault();

    fetch("https://colorcombi.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: e.target[0].value,
        password: e.target[1].value,
      }),
    })
      .then((response) => response.json())
      .then((data) => getElements(data));
  }
  function getElements(data) {
    if (!data.msg) {
      sessionStorage.setItem("userid", data.id);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("value", JSON.stringify(data.value));
      history.push("/");
    } else alert(data.msg);
  }

  return (
    <div className="welcomelayout">
      <form onSubmit={handleLoginEvent}>
        <label htmlFor="EmailId" > <span>*</span> EmailId:</label>
        <br />
        <input type="email" name="EmailId" id="EmailId" required />
        <br />
        <br />
        <label htmlFor="Password" > <span>*</span> Password:</label>
        <br />
        <input type="password" name="Password" id="Password" required />
        <br />
        <br />
        <button type="submit">Submit</button>
        <h6>
          New user?<Link to="/signup">Signup</Link>
        </h6>
      </form>
    </div>
  );
}
