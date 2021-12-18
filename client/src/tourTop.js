export function Tourtop({ settourtop }) {
  console.log(JSON.parse(sessionStorage.getItem("value")));
  var topColor = [];
  var topRangeDark = JSON.parse(sessionStorage.getItem("value")).top["dark"];
  var topRangeLight = JSON.parse(sessionStorage.getItem("value")).top["light"];
  topColor.push(...topRangeLight, ...topRangeDark);
  return (
    <div className="palettet">
      {topColor.map((el) => (
        <Elementstop el={el} settourtop={settourtop} />
      ))}
    </div>
  );
}

export function Elementstop({ el, settourtop }) {
  return (
    <div className="elements">
      <label htmlFor="colorbot">
        <div className={`star ${el}`} style={{ background: el }}></div>
      </label>
      <input
        type="radio"
        name="colorbot"
        id={`value${el}`}
        value={el}
        onChange={() => settourtop(el)}
      />
    </div>
  );
}
