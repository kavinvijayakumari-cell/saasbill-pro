import { useState, useContext } from "react";
import { TenantContext } from "../context/TenantContext";
import "./Tenants.css";

import {
  FaBuilding,
  FaCrown,
  FaUsers,
} from "react-icons/fa";


function Tenant() {


const {tenants,setTenants}=useContext(TenantContext);



const [search,setSearch]=useState("");

const [isEditing,setIsEditing]=useState(false);

const [editId,setEditId]=useState(null);





const [form,setForm]=useState({

company:"",
owner:"",
email:"",
phone:"",
plan:"Basic"

});







const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const resetForm=()=>{


setForm({

company:"",
owner:"",
email:"",
phone:"",
plan:"Basic"

});


setIsEditing(false);

setEditId(null);


};









function addTenant(){



if(

!form.company ||

!form.owner ||

!form.email ||

!form.phone

){


alert("Please fill all tenant details");

return;


}






const tenant={


id:Date.now(),


tenantId:"TEN-"+Date.now(),


...form


};






setTenants([

...tenants,

tenant

]);



resetForm();



}









function editTenant(tenant){



setForm({

company:tenant.company,

owner:tenant.owner,

email:tenant.email,

phone:tenant.phone,

plan:tenant.plan

});



setEditId(tenant.id);

setIsEditing(true);


}









function updateTenant(){



const updated=tenants.map(item=>

item.id===editId

?

{

...item,

...form

}

:

item


);



setTenants(updated);


resetForm();


}









function deleteTenant(id){



if(window.confirm(

"Delete this tenant?"

)){



setTenants(

tenants.filter(

item=>item.id!==id

)

);


}



}









const filteredTenants=tenants.filter(item=>



item.company

.toLowerCase()

.includes(search.toLowerCase())

||

item.owner

.toLowerCase()

.includes(search.toLowerCase())

||

item.email

.toLowerCase()

.includes(search.toLowerCase())



);








const planClass=(plan)=>{


return `plan ${plan.toLowerCase()}`;


};









const premiumCount=tenants.filter(

t=>t.plan==="Premium"

).length;







return(



<div className="tenant-page">






<h1>

🏢 Tenant Management

</h1>







<div className="billing-summary">



<div className="summary-card">


<FaBuilding/>

<div>

<h3>Total Tenants</h3>

<p>

{tenants.length}

</p>

</div>


</div>






<div className="summary-card">


<FaCrown/>

<div>

<h3>Premium Tenants</h3>

<p>

{premiumCount}

</p>

</div>


</div>







<div className="summary-card">


<FaUsers/>

<div>

<h3>Active Clients</h3>

<p>

{tenants.length}

</p>

</div>


</div>





</div>









<div className="tenant-form">





<input

name="company"

placeholder="Company Name"

value={form.company}

onChange={handleChange}

/>







<input

name="owner"

placeholder="Owner Name"

value={form.owner}

onChange={handleChange}

/>







<input

name="email"

type="email"

placeholder="Email Address"

value={form.email}

onChange={handleChange}

/>







<input

name="phone"

placeholder="Phone Number"

value={form.phone}

onChange={handleChange}

/>







<select

name="plan"

value={form.plan}

onChange={handleChange}

>


<option>Basic</option>

<option>Standard</option>

<option>Premium</option>


</select>








{

isEditing

?

<>


<button

className="update-btn"

onClick={updateTenant}

>

Update Tenant

</button>




<button

className="cancel-btn"

onClick={resetForm}

>

Cancel

</button>


</>



:

<button onClick={addTenant}>

Create Tenant

</button>



}







</div>









<div className="search-box">


<input


placeholder="Search tenant company, owner or email..."

value={search}

onChange={e=>setSearch(e.target.value)}


/>


</div>









<div className="table-container">





<table>



<thead>


<tr>

<th>ID</th>

<th>Company</th>

<th>Owner</th>

<th>Email</th>

<th>Phone</th>

<th>Plan</th>

<th>Action</th>


</tr>


</thead>








<tbody>


{


filteredTenants.length===0

?


<tr>

<td colSpan="7">


<div className="empty">

No Tenant Records Found

</div>


</td>

</tr>


:



filteredTenants.map(tenant=>(



<tr key={tenant.id}>


<td>

{tenant.tenantId}

</td>





<td>

{tenant.company}

</td>






<td>

{tenant.owner}

</td>






<td>

{tenant.email}

</td>







<td>

{tenant.phone}

</td>







<td>


<span className={planClass(tenant.plan)}>

{tenant.plan}

</span>


</td>







<td>



<button

className="edit-btn"

onClick={()=>editTenant(tenant)}

>

Edit

</button>






<button

className="delete-btn"

onClick={()=>deleteTenant(tenant.id)}

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



export default Tenant;