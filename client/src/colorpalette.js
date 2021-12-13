import './colorpalette.css';

export function Colorpalette({setclosetcolor}){
  var result=[{"color":"red","count":1},{"color":"black","count":2},{"color":"green","count":3},
  {"color":"darkslategray","count":4},{"color":"darkslateblue","count":5},{"color":"skyblue","count":6},{"color":"plum","count":7},
  {"color":"#95ce95","count":8},{"color":"white","count":9},{"color":"tan","count":10}]
     return(
        <div className="palette">
       {result.map((el)=><Elements count={el.count} colour={el.color} setclosetcolor={setclosetcolor}/>)}
      </div>
    );
}

function Elements({ count, colour, setclosetcolor }) {
  return (
    <div className="elements">
      <label htmlfor="values"><div className={`star ${count}`} style={{ background: colour }}></div></label>
      <input type="radio" name="values" id={`value${count}`} value={count} onChange={() => setclosetcolor({ "count": count, "color": colour })} />

    </div>
  );
}