
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import {Card, CardBody} from "@heroui/card";
import axios from "axios";
import { useState } from "react";


interface address {
  custDetails:{
  fullName: string;
  phone: string;
  email:string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  timestamp: string;
  }
  itemDetails:[{
    price:string;
    qty:number;
    title:string;
  }]
  paymentDetails:{
    totalamount: number;
    razorpay_order_id: string;
    razorpay_signature: string;
    razorpay_payment_id: string;
  }
}
export default function IndexPage() {

const [state, setState]=useState<address[]>([])

  async function getData(){
    const {data}=await axios.get<address[]>("https://app-lnzuadrfbq-uc.a.run.app/api/fetch-data")
    setState(data)
    console.log(data)
  }
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">

       <Button color="primary" onPress={()=>{getData()}}>Update</Button>
       {state.map((item,index)=>(
       <Card key={index} className="max-w-[500px]">
      <CardBody>
      <h2 className="font-bold text-large">Customer Details:</h2>
      <p><span className="font-bold">Name: </span><span>{item.custDetails.fullName}</span></p>
      <p><span className="font-bold">Phone: </span><span>{item.custDetails.phone}</span></p>
      <p><span className="font-bold">Email: </span><span>{item.custDetails.email}</span></p>
      <p><span className="font-bold">Address: </span><span>{item.custDetails.street}, {item.custDetails.city}, {item.custDetails.state}, {item.custDetails.country}, {item.custDetails.zip}</span></p>
      <p><span className="font-bold">Time: </span><span>{item.custDetails.timestamp}</span></p>
        
        {item.itemDetails.map((item,index)=>(
          <div key={index}>
            <h2 className="font-bold text-large">Products:</h2>
            <p><span className="font-bold">Item Name: </span><span>{item.title}</span></p>
            <p><span className="font-bold">Item price: </span><span>{item.price}</span></p>
            <p><span className="font-bold">Quantity: </span><span>{item.qty}</span></p>
            
            </div>
        ))}
        <h2 className="font-bold text-large">Payment Details:</h2>
        <p><span className="font-bold">Total Amount: </span><span className="amount">{item.paymentDetails.totalamount}</span></p>
        <p><span className="font-bold">Order Id: </span><span>{item.paymentDetails.razorpay_order_id}</span></p>
        <p><span className="font-bold">Payment Id: </span><span>{item.paymentDetails.razorpay_payment_id}</span></p>
        
        {/* <p>Total Amount: {item.paymentDetails.razorpay_signature}</p> */}
      </CardBody>
    </Card> 
  ))}
      </section>
    </DefaultLayout>
  );
}
