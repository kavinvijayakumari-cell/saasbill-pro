import { useState, useEffect } from "react";


function Customer() {


const [name,setName] = useState("");

const [email,setEmail] = useState("");

const [phone,setPhone] = useState("");

const [status,setStatus] = useState("Active");


const [search,setSearch] = useState("");

const [editId,setEditId] = useState(null);




const [customers,setCustomers] = useState(()=>{


const data = localStorage.getItem("customers");


return data ? JSON.parse(data):[];


});





useEffect(()=>{


localStorage.setItem(

"customers",

JSON.stringify(customers)

);


},[customers]);









function saveCustomer(){



if(!name || !email || !phone){


alert("Please complete all customer details");

return;


}





if(editId){



setCustomers(

customers.map(customer=>

customer.id===editId

?

{

...customer,

name,

email,

phone,

status

}

:

customer

)

);



setEditId(null);



}

else{



const newCustomer={


id:Date.now(),


customerId:

"CUST-"+Date.now(),


name,

email,

phone,

status,


createdDate:

new Date().toLocaleDateString()


};




setCustomers(

[...customers,newCustomer]

);



}




clearForm();


}









function clearForm(){


setName("");

setEmail("");

setPhone("");

setStatus("Active");


}







function editCustomer(customer){


setName(customer.name);

setEmail(customer.email);

setPhone(customer.phone);

setStatus(customer.status);


setEditId(customer.id);



}







function deleteCustomer(id){


setCustomers(

customers.filter(

customer=>customer.id!==id

)

);



}








const filtered = customers.filter(customer=>


customer.name

.toLowerCase()

.includes(

search.toLowerCase()

)


);







const activeCount = customers.filter(

customer=>customer.status==="Active"

).length;









return(


<div className="tenant-page">





<h1>

👥 Customer Management

</h1>








<div className="billing-summary">



<div>


<h3>Total Customers</h3>

<p>

{customers.length}

</p>


</div>





<div>


<h3>Active Users</h3>


<p>

{activeCount}

</p>


</div>





<div>


<h3>Inactive Users</h3>


<p>

{customers.length-activeCount}

</p>


</div>



</div>









<div className="tenant-form">





<input


type="text"


placeholder="Customer Name"


value={name}


onChange={e=>setName(e.target.value)}


/>






<input


type="email"


placeholder="Email Address"


value={email}


onChange={e=>setEmail(e.target.value)}


/>








<input


type="text"


placeholder="Phone Number"


value={phone}


onChange={e=>setPhone(e.target.value)}


/>








<select


value={status}


onChange={e=>setStatus(e.target.value)}


>


<option>

Active

</option>


<option>

Inactive

</option>


</select>







<button onClick={saveCustomer}>


{

editId

?

"Update Customer"

:

"Add Customer"

}



</button>







</div>









<input


className="search-box"


placeholder="Search customer..."


value={search}


onChange={e=>setSearch(e.target.value)}


/>









<div className="table-container">





<table>



<thead>


<tr>


<th>ID</th>

<th>Name</th>

<th>Email</th>

<th>Phone</th>

<th>Status</th>

<th>Created</th>

<th>Action</th>


</tr>


</thead>







<tbody>



{


filtered.map(customer=>(



<tr key={customer.id}>


<td>

{customer.customerId}

</td>




<td>

{customer.name}

</td>





<td>

{customer.email}

</td>





<td>

{customer.phone}

</td>





<td>


<span

className={

customer.status==="Active"

?

"active-status"

:

"inactive-status"

}


>


{customer.status}


</span>



</td>





<td>

{customer.createdDate}

</td>





<td>




<button


className="edit-btn"


onClick={()=>editCustomer(customer)}


>

Edit

</button>






<button


className="delete-btn"


onClick={()=>deleteCustomer(customer.id)}


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



export default Customer;