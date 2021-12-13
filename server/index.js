import  express, { response } from "express";
import bcrypt, { compare } from "bcrypt";
import dotenv from "dotenv";
import {MongoClient,ObjectId} from "mongodb";
import cors from "cors";
import  jwt  from "jsonwebtoken";
import nodemailer from "nodemailer"


const app=express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL;

//Mongodb Connect
export async function createConnection() 
{  
  const client=new MongoClient(MONGO_URL);
  return await client.connect();
}


async function genpassword(userPassword)
    {
      const salt= await bcrypt.genSalt(10);
       const haspassword=await bcrypt.hash(userPassword,salt);
      return (haspassword);
    }

    async function searchedMail(emailId){
    const client = await createConnection();
    const result = await client
                .db("colorcombinator")
                .collection("user")
                .findOne({emailId:emailId})

                return result;

    }
//Signup
app.post("/signup",async(req,res)=>{
    const {userName,emailId,userPassword}=req.body;
    const value=await searchedMail(emailId);
    if(!value){
      const hashedpassword=await genpassword(userPassword);
      const client = await createConnection();
            const result = await client
              .db("colorcombinator")
              .collection("user")
              .insertOne({
                  userName:userName,
                   emailId:emailId,
                   userPassword:hashedpassword,
                   top:{"light":[],"dark":[]},
                   bottom:{"light":[],"dark":[]},
                   tourdata:{}
           });

         
           
var transporter = nodemailer.createTransport({
  service: 'outlook', 
  auth: {
    user: 'sriramsaravanan11@outlook.com',
    pass: 'Sriram4924'
  }
});           

var mailOptions = {  
  from: 'sriramsaravanan11@outlook.com',
  to: emailId,
  subject: 'Welcome message',
  text: 'Colorcombinator welcomes you!!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else { 
    console.log('Email sent: ' + info.response);
  }
});
    }
else{
  res.send({msg:"existing mailid"})
}
    
})

async function searchedUser(userEmailId)
{
    const client = await createConnection();
    const result = await client 
                   .db("colorcombinator")
                   .collection("user")
                   .findOne({"emailId":userEmailId});
                 return result;
}
//login
app.post("/login",async(req,res)=>{ 
    const{emailId,password}=req.body;
    const value=await searchedUser(emailId);

      if(value!=null)
      {
        const passindb=value.userPassword;
        const passinlogin=password;
        const ispasstrue=await bcrypt.compare(passinlogin,passindb);

     
     if(ispasstrue)
        {
          const token=jwt.sign({id:value._id},process.env.UNIQUE_KEY);
           res.send({token:token,id:value._id,value:value});
       }
        else{
          res.send({msg:"invalid login"});
        }
      }   
        else
      {    
        res.send({msg:"wrong user"});
      
      }
})

//closet

app.put("/closet",async(req,res)=>{
  const{portion,color,shade,id} =req.body;
  var dress=`${portion}.${shade}`;

 const client = await createConnection();
const result = await client
          .db("colorcombinator")
         .collection("user")          
          .updateOne({_id:ObjectId(id)},{$push:{[dress]:color}})
 const value=await client
            .db("colorcombinator")
           .collection("user")          
           .findOne({_id:ObjectId(id)});
              res.send(value);
})




//get
app.post("/tourdata",async(req,res)=>{
  const{id}=req.body;
  const client = await createConnection();
  const result = await client
    .db("colorcombinator")
    .collection("user")   
    .findOne({"_id":ObjectId(id)});
    
 res.send(result);
 console.log(result)
})



app.put("/tourpackdata",async(req,res)=>{  
  const{id,tourname,data}=req.body;  
  var key=`tourdata.${tourname}`;
  console.log(id,tourname,key,data);  
  const client = await createConnection();

  const result = await client  
    .db("colorcombinator")
    .collection("user")
    .updateOne({_id:ObjectId(id)}, { $addToSet: { [key]: { $each: data } } } );

 const value=await client
 .db("colorcombinator")
.collection("user")          
.findOne({_id:ObjectId(id)});
   res.send(value);
})          

app.get("/get",(req,res)=>{
  res.send("working fine");
})
     

app.listen(PORT,()=>console.log("sev started"));