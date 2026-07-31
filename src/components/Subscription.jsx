import { useState, useEffect } from "react";


function Subscription() {


const [company,setCompany]=useState("");

const [plan,setPlan]=useState("Basic");

const [price,setPrice]=useState("");

const [startDate,setStartDate]=useState("");

const [endDate,setEndDate]=useState("");

const [status,setStatus]=useState("Active");



const [search,setSearch]=useState("");

const [editId,setEditId]=useState(null);







const [subscriptions,setSubscriptions]=useState(()=>{


const data=localStorage.getItem("subscriptions");


return data ? JSON.parse(data):[];


});







useEffect(()=>{


localStorage.setItem(

"subscriptions",

JSON.stringify(subscriptions)

);


},[subscriptions]);









function saveSubscription(){



if(

!company ||

!price ||

!startDate ||

!endDate

){


alert("Please complete subscription details");

return;


}







const id=editId || Date.now();





const subscription={


id,


subscriptionId:"SUB-"+id,


company,


plan,


price:Number(price),


startDate,


endDate,


status


};








if(editId){



setSubscriptions(


subscriptions.map(sub=>

sub.id===editId

?

subscription

:

sub

)


);



setEditId(null);



}

else{



setSubscriptions(

[...subscriptions,subscription]

);



}







clearForm();


}









function clearForm(){


setCompany("");

setPlan("Basic");

setPrice("");

setStartDate("");

setEndDate("");

setStatus("Active");


}









function editSubscription(sub){


setCompany(sub.company);

setPlan(sub.plan);

setPrice(sub.price);

setStartDate(sub.startDate);

setEndDate(sub.endDate);

setStatus(sub.status);


setEditId(sub.id);


}









function deleteSubscription(id){


setSubscriptions(

subscriptions.filter(

sub=>sub.id!==id

)

);


}









const filtered=subscriptions.filter(sub=>

sub.company

.toLowerCase()

.includes(

search.toLowerCase()

)

);







const revenue=subscriptions.reduce(

(sum,item)=>sum+Number(item.price),

0

);





const active=subscriptions.filter(

item=>item.status==="Active"

).length;






const premium=subscriptions.filter(

item=>item.plan==="Premium"

).length;








const money=(value)=>{


return Number(value).toLocaleString(

"en-IN",

{

style:"currency",

currency:"INR"

}

);


};









return(



<div className="tenant-page">







<h1>

💳 Subscription Management

</h1>









<div className="billing-summary">



<div>


<h3>Total Plans</h3>

<p>

{subscriptions.length}

</p>


</div>





<div>


<h3>Monthly Revenue</h3>

<p>

{money(revenue)}

</p>


</div>






<div>


<h3>Active Plans</h3>

<p>

{active}

</p>


</div>





<div>


<h3>Premium Users</h3>

<p>

{premium}

</p>


</div>





</div>













<div className="tenant-form">






<input


placeholder="Company Name"


value={company}


onChange={e=>setCompany(e.target.value)}


/>







<select


value={plan}


onChange={e=>setPlan(e.target.value)}


>


<option>Basic</option>

<option>Standard</option>

<option>Premium</option>

<option>Enterprise</option>


</select>








<input


type="number"


placeholder="Subscription Price"


value={price}


onChange={e=>setPrice(e.target.value)}


/>







<input


type="date"


value={startDate}


onChange={e=>setStartDate(e.target.value)}


/>







<input


type="date"


value={endDate}


onChange={e=>setEndDate(e.target.value)}


/>







<select


value={status}


onChange={e=>setStatus(e.target.value)}


>


<option>Active</option>

<option>Expired</option>


</select>








<button onClick={saveSubscription}>


{

editId

?

"Update Subscription"

:

"Create Subscription"

}



</button>







</div>









<input


className="search-box"


placeholder="Search company subscription..."


value={search}


onChange={e=>setSearch(e.target.value)}


/>









<div className="table-container">





<table>



<thead>


<tr>


<th>ID</th>

<th>Company</th>

<th>Plan</th>

<th>Price</th>

<th>Start Date</th>

<th>End Date</th>

<th>Status</th>

<th>Action</th>


</tr>


</thead>







<tbody>



{


filtered.map(sub=>(



<tr key={sub.id}>


<td>

{sub.subscriptionId}

</td>





<td>

{sub.company}

</td>






<td>


<span className={`plan ${sub.plan.toLowerCase()}`}>

{sub.plan}

</span>


</td>







<td>

{money(sub.price)}

</td>






<td>

{sub.startDate}

</td>







<td>

{sub.endDate}

</td>







<td>


<span

className={

sub.status==="Active"

?

"active-status"

:

"inactive-status"

}

>


{sub.status}


</span>



</td>









<td>



<button

className="edit-btn"

onClick={()=>editSubscription(sub)}

>

Edit

</button>






<button

className="delete-btn"

onClick={()=>deleteSubscription(sub.id)}

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


export default Subscription;