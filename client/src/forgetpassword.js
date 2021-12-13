import {Link} from 'react-router-dom';
import {useHistory} from "react-router";


export function Login({setlogin,setclosetcolor}){
    const history=useHistory();
     function handleLoginEvent(e){
           e.preventDefault();
         fetch('http://localhost:3001/login',{
             method:"POST",
             headers:{
                 "Content-Type":"application/json",
             },
             body:JSON.stringify({ emailId:e.target[0].value,
                                   password:e.target[1].value
                                  })
         }).then((response)=>response.json())
         .then((data)=>getElements(data))
}
function getElements(data){
   
 if(!data.msg) {
     setlogin(true);
   var closetData={
        top:[[],[]],
        bottom:[[],[]]
    }
   closetData.top[0]=[...[data.value.top.light]]
   closetData.top[1]=[...[data.value.top.dark]];
   closetData.bottom[0]=[...[data.value.bottom.light]];
   closetData.bottom[1]=[...[data.value.bottom.dark]]
    console.log(closetData); 
setclosetcolor(closetData);
    history.push("/");
}
else alert(data.msg)
 localStorage.setItem("userid",data.id);
   
//    window.location.reload();
   }

    return(
       <div className="welcomelayout">
            <form onSubmit={handleLoginEvent}>
            <label htmlFor="EmailId"/> <span>*</span> EmailId:
                <input type="email" name="EmailId" id="EmailId" required/><br/><br/>
                <label htmlFor="Password"/>  <span>*</span> Password:
                <input type="password" name="Password" id="Password" required/><br/><br/>
                <h6>New user<Link to="/signup">Signup</Link></h6>    
                <Link to="/forgetpassword">Forget password?</Link><br/>
                <button type="submit">Submit</button>
            </form>
         <div className="design"></div>  
        </div>
    );
} 