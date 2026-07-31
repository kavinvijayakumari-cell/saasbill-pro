import { useState, useEffect } from "react";
import "./Billing.css";


function Billing() {


  const [company,setCompany] = useState("");

  const [customer,setCustomer] = useState("");

  const [plan,setPlan] = useState("Basic");

  const [amount,setAmount] = useState("");

  const [status,setStatus] = useState("Pending");


  const [search,setSearch] = useState("");

  const [editId,setEditId] = useState(null);



  const [bills,setBills] = useState(()=>{

    const data = localStorage.getItem("bills");

    return data ? JSON.parse(data):[];

  });





  useEffect(()=>{

    localStorage.setItem(
      "bills",
      JSON.stringify(bills)
    );

  },[bills]);







  const gst = amount ? Number(amount)*0.18 : 0;


  const total = amount ? Number(amount)+gst : 0;






  const formatMoney=(value)=>{


    return Number(value).toLocaleString(
      "en-IN",
      {
        style:"currency",
        currency:"INR"
      }
    );

  };






  function saveBill(){



    if(!company || !customer || !amount){

      alert("Please complete all details");

      return;

    }





    const id = editId || Date.now();




    const bill={


      id,


      billNo:`INV-${id}`,

      company,

      customer,

      plan,

      amount:Number(amount),


      gst:gst.toFixed(2),


      total:total.toFixed(2),


      status



    };







    if(editId){


      setBills(

        bills.map(

          item=>item.id===editId ? bill:item

        )

      );


      setEditId(null);



    }

    else{


      setBills(

        [...bills,bill]

      );


    }





    clearForm();


  }








  function clearForm(){


    setCompany("");

    setCustomer("");

    setPlan("Basic");

    setAmount("");

    setStatus("Pending");


  }






  function editBill(item){


    setCompany(item.company);

    setCustomer(item.customer);

    setPlan(item.plan);

    setAmount(item.amount);

    setStatus(item.status);


    setEditId(item.id);


  }







  function deleteBill(id){


    setBills(

      bills.filter(

        item=>item.id!==id

      )

    );


  }








  const filtered = bills.filter(

    item=>

    item.company

    .toLowerCase()

    .includes(

      search.toLowerCase()

    )

  );









return(


<div className="billing-page">



<h1>

💳 Billing Center

</h1>







<div className="billing-summary">


<div>

<h3>Total Bills</h3>

<p>{bills.length}</p>

</div>



<div>

<h3>Total Revenue</h3>

<p>

{formatMoney(

bills.reduce(

(sum,item)=>sum+Number(item.total),

0

)

)}

</p>

</div>



<div>

<h3>Paid Bills</h3>

<p>

{
bills.filter(
b=>b.status==="Paid"
).length
}

</p>

</div>



</div>









<div className="billing-form">



<input

placeholder="Company Name"

value={company}

onChange={
e=>setCompany(e.target.value)
}

/>



<input

placeholder="Customer Name"

value={customer}

onChange={
e=>setCustomer(e.target.value)
}

/>




<select

value={plan}

onChange={
e=>setPlan(e.target.value)
}

>

<option>Basic</option>

<option>Standard</option>

<option>Premium</option>

<option>Enterprise</option>


</select>





<input

type="number"

placeholder="Amount"

value={amount}

onChange={
e=>setAmount(e.target.value)
}

/>





<select

value={status}

onChange={
e=>setStatus(e.target.value)
}

>

<option>Pending</option>

<option>Paid</option>


</select>






<button onClick={saveBill}>


{
editId
?
"Update Invoice"
:
"Generate Invoice"
}


</button>




</div>







<div className="tax-box">


GST 18% :
<strong>
{formatMoney(gst)}
</strong>


<br/>


Final Amount :

<strong>

{formatMoney(total)}

</strong>


</div>







<input

className="search-box"

placeholder="Search company..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>









<div className="table-container">


<table>


<thead>


<tr>

<th>Invoice</th>

<th>Company</th>

<th>Customer</th>

<th>Plan</th>

<th>Amount</th>

<th>GST</th>

<th>Total</th>

<th>Status</th>

<th>Action</th>


</tr>


</thead>







<tbody>


{

filtered.map(item=>(


<tr key={item.id}>


<td>{item.billNo}</td>


<td>{item.company}</td>


<td>{item.customer}</td>


<td>

<span className={`plan ${item.plan.toLowerCase()}`}>

{item.plan}

</span>

</td>



<td>

{formatMoney(item.amount)}

</td>



<td>

{formatMoney(item.gst)}

</td>



<td>

{formatMoney(item.total)}

</td>




<td>

<span

className={

item.status==="Paid"

?

"paid"

:

"pending"

}

>

{item.status}

</span>

</td>







<td>


<button

className="edit-btn"

onClick={()=>editBill(item)}

>

Edit

</button>





<button

className="delete-btn"

onClick={()=>deleteBill(item.id)}

>

Delete

</button>



</td>



</tr>


))


}



</tbody>


</table>


</div>



</div>


);


}



export default Billing;