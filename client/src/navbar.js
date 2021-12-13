import "./navbar.css";
import user from "./images/user.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


export function Navbar({ setlighting, lighting, setlogin }) {

  function removeTokens() {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("value");
    localStorage.removeItem("tourname");
  
    alert("account has been logout");
  }

  return (
    <nav>
      <button onClick={() => setlighting(!lighting)} className="lightbtn">
        ligths
      </button>
      <h4>Color combinator</h4>
    <button onClick={() => removeTokens()} className="logout">Log out</button>

 </nav>
  );
}
