import { Colorpalette } from "./colorpalette";
import "./closetmodel.css";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import shirt from "./images/shirts.png";
import pant from "./images/pants.png";

export function Closetmodel({ closetcolor, setcloset, setclosetcolor }) {
  const [portion, setportion] = useState(null);

  if (portion == "top") var selector = "top";
  else var selector = "normal";

  if (portion == "bottom") var selectors = "bottom";
  else var selectors = "normal";

  function clickHandler(e) {
    var ind;
    e.preventDefault();
    if (closetcolor["count"] > 5) ind = "light";
    else ind = "dark";

    fetch("https://colorcombi.herokuapp.com/closet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: sessionStorage.getItem("userid"),
        portion: portion,
        color: closetcolor["color"],
        shade: ind,
      }),
    })
      .then((response) => response.json())
      .then((data) => getElements(data));
    function getElements(data) {
      console.log(data);
      sessionStorage.setItem("value", JSON.stringify(data));
    }

    alert("addedd to closet!");
  }

  return (
    <>
      {sessionStorage.getItem("token") ? (
        <div className="model">
          <div className="modelarea">
            <div className="modelheader">
              <div onClick={() => setcloset(false)}>✗</div>
            </div>
            <div className="modelcontent">
              <h5>Chose the section:</h5>
              <div className="selectitems">
                <div className={selector} onClick={() => setportion("top")}>
                  <img src={shirt} alt="top" className="modelimg" />
                </div>
                <div className={selectors} onClick={() => setportion("bottom")}>
                  <img src={pant} alt="bottom" className="modelimg" />
                </div>
              </div>

              <h5>Chose the color you have:</h5>
              <div className="Colorpalette">
                {portion ? (
                  <Colorpalette setclosetcolor={setclosetcolor} />
                ) : (
                  ""
                )}
                <button onClick={clickHandler}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
