import"./tourpalette.css";

export function Tourbottom({settourbottom}){
var bottomColor=[];
var bottomRangeDark=JSON.parse(localStorage.getItem("value")).bottom["dark"];
var bottomRangeLight=JSON.parse(localStorage.getItem("value")).bottom["light"];
bottomColor.push(...bottomRangeDark,...bottomRangeLight)

 return(
        <div className="palettet">
       {bottomColor.map((el)=><Elementsnbottom el={el} settourbottom={settourbottom}/>)}
      </div>
    );
}

export function Elementsnbottom({el,settourbottom}) {
    
    return (
      <div className="elements">
        <label htmlFor="color"><div className={`star ${el}`} style={{ background: el }}></div></label>
        <input type="radio" name="color" id={`value${el}`} value={el} onChange={() => settourbottom(el)}/>
       </div>
    );
  }