import { useState, useEffect } from "react";


function Invoice() {


const [company,setCompany]=useState("");

const [customer,setCustomer]=useState("");

const [amount,setAmount]=useState("");

const [status,setStatus]=useState("Pending");


const [search,setSearch]=useState("");

const [editId,setEditId]=useState(null);





const [invoices,setInvoices]=useState(()=>{


const data=localStorage.getItem("invoices");


return data ? JSON.parse(data):[];


});






useEffect(()=>{


localStorage.setItem(

"invoices",

JSON.stringify(invoices)

);


},[invoices]);









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









function saveInvoice(){



if(!company || !customer || !amount){


alert("Please complete invoice details");

return;


}





const id = editId || Date.now();




const invoice={


id,


invoiceNo:"INV-"+id,


company,


customer,


amount:Number(amount),


gst:gst.toFixed(2),


total:total.toFixed(2),


status,


date:new Date().toLocaleDateString()


};






if(editId){



setInvoices(

invoices.map(item=>

item.id===editId

?

invoice

:

item

)

);



setEditId(null);


}

else{


setInvoices(

[...invoices,invoice]

);


}





clearForm();


}









function clearForm(){


setCompany("");

setCustomer("");

setAmount("");

setStatus("Pending");


}








function editInvoice(item){


setCompany(item.company);

setCustomer(item.customer);

setAmount(item.amount);

setStatus(item.status);

setEditId(item.id);


}








function deleteInvoice(id){


setInvoices(

invoices.filter(

item=>item.id!==id

)

);


}









const filtered=invoices.filter(item=>


item.company

.toLowerCase()

.includes(

search.toLowerCase()

)


);







const paidInvoices=invoices.filter(

item=>item.status==="Paid"

).length;





const revenue=invoices.reduce(

(sum,item)=>sum+Number(item.total),

0

);








return(



<div className="tenant-page">






<h1>

🧾 Invoice Management

</h1>








<div className="billing-summary">



<div>

<h3>Total Invoice</h3>

<p>

{invoices.length}

</p>

</div>





<div>

<h3>Total Revenue</h3>

<p>

{formatMoney(revenue)}

</p>

</div>





<div>

<h3>Paid Invoice</h3>

<p>

{paidInvoices}

</p>

</div>




</div>









<div className="tenant-form">





<input


placeholder="Company Name"


value={company}


onChange={e=>setCompany(e.target.value)}


/>







<input


placeholder="Customer Name"


value={customer}


onChange={e=>setCustomer(e.target.value)}


/>







<input


type="number"


placeholder="Invoice Amount"


value={amount}


onChange={e=>setAmount(e.target.value)}


/>








<select


value={status}


onChange={e=>setStatus(e.target.value)}


>


<option>

Pending

</option>


<option>

Paid

</option>


</select>








<button onClick={saveInvoice}>


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


<p>

GST (18%)

</p>


<h3>

{formatMoney(gst)}

</h3>



<p>

Total Amount

</p>


<h2>

{formatMoney(total)}

</h2>



</div>









<input


className="search-box"


placeholder="Search company invoice..."


value={search}


onChange={e=>setSearch(e.target.value)}


/>









<div className="table-container">





<table>



<thead>


<tr>


<th>Invoice ID</th>

<th>Company</th>

<th>Customer</th>

<th>Amount</th>

<th>GST</th>

<th>Total</th>

<th>Date</th>

<th>Status</th>

<th>Action</th>


</tr>


</thead>








<tbody>


{

filtered.map(invoice=>(



<tr key={invoice.id}>


<td>

{invoice.invoiceNo}

</td>




<td>

{invoice.company}

</td>




<td>

{invoice.customer}

</td>





<td>

{formatMoney(invoice.amount)}

</td>





<td>

{formatMoney(invoice.gst)}

</td>





<td>

{formatMoney(invoice.total)}

</td>






<td>

{invoice.date}

</td>







<td>


<span

className={

invoice.status==="Paid"

?

"active-status"

:

"inactive-status"

}


>


{invoice.status}


</span>


</td>







<td>



<button

className="edit-btn"

onClick={()=>editInvoice(invoice)}

>

Edit

</button>






<button

className="delete-btn"

onClick={()=>deleteInvoice(invoice.id)}

>

Delete

</button>







<button

className="print-btn"

onClick={()=>window.print()}

>

Print

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



export default Invoice;