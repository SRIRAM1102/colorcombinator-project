import { Tourtop } from "./tourTop";
import { Tourbottom } from "./tourBottom";
import "./Tourform.css";


export function Tourform({
  index, settourtop, settourbottom, tourtop, tourbottom, settdata, tdata
}) {
 

  function singleDayListner(ev) {
    ev.preventDefault();
    
    tdata.push({
      day: index + 1,
      type: ev.target[0].value,
      top: tourtop,
      bottom: tourbottom,
    })
    settdata(tdata);
    }

  return (
    <div className="tourform">
      <form onSubmit={singleDayListner}>
        <h5>Travel day:{index + 1}</h5>
        <label htmlFor="occasion">Choose an occasion</label>
        <select name="type" id="type" className="tourdrop">
          <option selected disabled>
            Select an option
          </option>
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
          <option value="Ethenic">Ethenic</option>
        </select>
        <br />
        <label htmlFor="colortop">Choose an top:</label>
        <Tourtop settourtop={settourtop} />
        <label htmlFor="colorbottom">Choose an bottom:</label>
        <Tourbottom settourbottom={settourbottom} />
        <button type="submit">done</button>
       
      </form>
    </div>
  );
}
