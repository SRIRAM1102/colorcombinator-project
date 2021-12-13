import { Navbar } from "./navbar";
import { useHistory } from "react-router";
import "./History.css";


export function History({lighting,setlighting}){
    const history=useHistory();
    var totaltour=JSON.parse(localStorage.getItem("value")).tourdata;
   const objArray = [];
   const tourname=[]
   Object.keys(totaltour).forEach(key => { 
       objArray.push(totaltour[key]);
       tourname.push(key)
   });    

   return(
       <div id="tour">
          <Navbar setlighting={setlighting} lighting={lighting} />
          <hr />
         <div className="tourheaders">
          <h3 className="tourheading">Your tour history!</h3>
          <button onClick={()=>history.push("/tour")}>Back to Tour</button>
          </div>
        <div className="tourhistorycontent">
          {objArray.map((data, index) =>  <Singletour data={data} tourname={tourname} index={index}/>)}
          </div>
        </div>
    );
}              

function Singletour({data,tourname,index}){
    
return(   
    <>
    <h3 className="tourhistoryheaders">{tourname[index]}</h3>
   <div className="historycontent">
{ data.map((data,index)=>( 
       <>
           <h6>Day:{data.day}</h6>
           <div className="singledaycontent">
           <h6>Ocassion Type:{data.type}</h6>
           <h6>Your preferred top color:{data.top}</h6>
           <h6>Your preferred bottom color:{data.bottom}</h6>
           </div>
     </>
    ))} 
  </div>
  </>);
 
}
