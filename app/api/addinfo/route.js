import { NextResponse } from "next/server";
import { db } from "@/connection";

export async function POST(request, response) {
  try {
    const { name, email, address, city, state, contact, imageUrl } =
      await request.json();
    console.log(name, email, address, city, contact, imageUrl);

    const q =
      "INSERT INTO schoolinfo(`name`, `address`, `city`, `state`, `image`, `contact`, `email`) VALUES(?, ?, ?, ?, ?, ?, ?)";
    const values = [name, address, city, state, imageUrl, contact, email];

    const result = await new Promise((resolve, reject) => {
      db.query(q, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ success: false, error: err.message });
  }
}

export async function GET(){
    try{
        const q="SELECT * FROM Schoolinfo";
        const result =await new Promise((resolve, reject) =>{
            db.query(q,(err,res)=>{
              if(err) reject(err);
               resolve(res);
            })
        })
        return NextResponse.json({ success: true, data: result });
    }catch(err){
       return NextResponse.json({ success: false, error: err.message });
    } 
}