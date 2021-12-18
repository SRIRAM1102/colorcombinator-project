import { Navbar } from "./navbar";
import { useHistory } from "react-router";
import "./History.css";
import { Singletour } from "./Singletour";

export function History({ lighting, setlighting }) {
  const history = useHistory();
  var totaltour = JSON.parse(sessionStorage.getItem("value")).tourdata;
  const objArray = [];
  const tourname = [];
  Object.keys(totaltour).forEach((key) => {
    objArray.push(totaltour[key]);
    tourname.push(key);
  });

  return (
    <div id="tour">
      <Navbar setlighting={setlighting} lighting={lighting} />
      <hr />
      <div className="tourheaders">
        <h3 className="tourheading">Your tour history!</h3>
        <button onClick={() => history.push("/tour")}>Back to Tour</button>
      </div>
      <div className="tourhistorycontent">
        {objArray ? (
          objArray.map((data, index) => (
            <Singletour data={data} tourname={tourname} index={index} />
          ))
        ) : (
          <h3>No history of tour</h3>
        )}
      </div>
    </div>
  );
}


