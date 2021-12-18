import "./navbar.css";

export function Navbar({ setlighting, lighting, setlogin }) {
  function removeTokens() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("value");
    sessionStorage.removeItem("tourname");

    alert("account has been logout");
  }

  return (
    <nav>
      <button onClick={() => setlighting(!lighting)} className="lightbtn">
        ligths
      </button>
      <h4>Color combinator</h4>
      <button onClick={() => removeTokens()} className="logout">
        Log out
      </button>
    </nav>
  );
}
