import "./Dashboard.css";

import { useContext } from "react";

import { TenantContext } from "../context/TenantContext";


import {
  FaUsers,
  FaCrown,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaArrowUp,
  FaChartLine,
  FaCheckCircle
} from "react-icons/fa";




function Dashboard(){



const {tenants}=useContext(TenantContext);



const totalTenants = tenants.length;




const premium = tenants.filter(

(t)=>t.plan==="Premium"

).length;




const standard = tenants.filter(

(t)=>t.plan==="Standard"

).length;




const basic = tenants.filter(

(t)=>t.plan==="Basic"

).length;





const revenue =

(premium*4999)+

(standard*2999)+

(basic*999);







return(



<div className="dashboard">






{/* Header */}


<div className="dashboard-header">


<div>


<h1>

Welcome Back, Kavin 👋

</h1>


<p>

Monitor your SaaS business performance

</p>


</div>





<div className="growth">


<FaChartLine/>

12.5% Growth

</div>



</div>









{/* Cards */}


<div className="dashboard-cards">





<div className="card blue">


<div className="icon">

<FaUsers/>

</div>


<div>


<h4>

Total Tenants

</h4>


<h2>

{totalTenants}

</h2>


<span>

Active Companies

</span>


</div>


</div>







<div className="card green">


<div className="icon">

<FaMoneyBillWave/>

</div>



<div>


<h4>

Monthly Revenue

</h4>


<h2>

₹{revenue.toLocaleString("en-IN")}

</h2>


<span>

Subscription Income

</span>


</div>


</div>







<div className="card orange">


<div className="icon">

<FaCrown/>

</div>




<div>


<h4>

Premium Customers

</h4>


<h2>

{premium}

</h2>


<span>

High Value Plans

</span>


</div>


</div>








<div className="card purple">


<div className="icon">

<FaFileInvoiceDollar/>

</div>




<div>


<h4>

Invoices Generated

</h4>


<h2>

0

</h2>


<span>

Billing Records

</span>


</div>


</div>





</div>









{/* Bottom Section */}



<div className="dashboard-grid">






<div className="activity">



<h3>

Recent Activity

</h3>




<div className="activity-item">


<FaCheckCircle/>


Tenant Management Updated


</div>




<div className="activity-item">


<FaCheckCircle/>


Billing Module Connected


</div>




<div className="activity-item">


<FaCheckCircle/>


Subscription Engine Ready


</div>




</div>










<div className="plans">


<h3>

Subscription Analytics

</h3>





<div className="plan-row">


<span>

Premium

</span>


<strong>

{premium}

</strong>



</div>







<div className="plan-row">


<span>

Standard

</span>


<strong>

{standard}

</strong>



</div>








<div className="plan-row">


<span>

Basic

</span>


<strong>

{basic}

</strong>



</div>







</div>







</div>





</div>


);


}



export default Dashboard;