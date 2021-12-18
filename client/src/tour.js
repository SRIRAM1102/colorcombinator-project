import { useState } from "react";
import { Navbar } from "./navbar";
import { Link, Redirect } from "react-router-dom";
import "./tour.css";
import { Tourform } from "./Tourform";
import { useHistory } from "react-router";

export function Tour({ lighting, setlighting }) {
  const [days, setdays] = useState([]);
  const [tourtop, settourtop] = useState(null);
  const [tourbottom, settourbottom] = useState(null);
  const [tdata, settdata] = useState([]);
  const [show, setshow] = useState(false);
  const history = useHistory();

  function mainFormHandler(e) {
    e.preventDefault();
    let noOfDays = e.target[1].value;
    sessionStorage.setItem("tourname", e.target[0].value);

    var range = new Set();
    for (var i = 1; i <= noOfDays; i++) {
      range.add(i);
    }
    range = [...range];
    setdays(range);
    setshow(true);
  }

  function finanalTourData() {
    fetch("https://colorcombi.herokuapp.com/tourpackdata", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: sessionStorage.getItem("userid"),
        data: tdata,
        tourname: sessionStorage.getItem("tourname"),
      }),
    })
      .then((response) => response.json())
      .then((data) => getData(data));
    alert("Tour details has been added");

    function getData(data) {
      sessionStorage.setItem("value", JSON.stringify(data));
    }
    sessionStorage.removeItem("tourname");
    history.push("/");
  }
  return (
    <>
      {sessionStorage.getItem("token") ? (
        <div id="tour">
          <Navbar setlighting={setlighting} lighting={lighting} />
          <hr />
          <div className="tourheaders">
            <h3 className="tourheading">Your tour plan!</h3>
            <button>
              <Link to="/tour/history">History</Link>
            </button>
          </div>

          <form onSubmit={mainFormHandler} className="mainform">
            <label htmlFor="tourname" /> Name of travel:
            <br />
            <input type="input" name="tourname" id="tourname" required /> <br />
            <br />
            <label htmlFor="days" /> Days of travel:
            <br />
            <input type="input" name="days" id="days" required /> <br />
            <button type="submit" className="submithandler">
              Submit
            </button>
          </form>

          {days.map((data, index) => (
            <Tourform
              index={index}
              settourbottom={settourbottom}
              settourtop={settourtop}
              tourtop={tourtop}
              tourbottom={tourbottom}
              settdata={settdata}
              tdata={tdata}
            />
          ))}

          {show && (
            <button className="submithandler" onClick={() => finanalTourData()}>
              submit
            </button>
          )}
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
