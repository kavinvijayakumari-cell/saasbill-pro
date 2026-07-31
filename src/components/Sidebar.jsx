import "./Sidebar.css";

import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaCreditCard,
  FaFileInvoiceDollar,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import { useState } from "react";



function Sidebar({ setPage }) {



const [active,setActive]=useState("dashboard");





const menuItems=[


{
id:"dashboard",
name:"Dashboard",
icon:<FaTachometerAlt/>
},


{
id:"tenant",
name:"Tenants",
icon:<FaBuilding/>
},


{
id:"customer",
name:"Customers",
icon:<FaUsers/>
},


{
id:"subscription",
name:"Subscriptions",
icon:<FaCreditCard/>
},


{
id:"invoice",
name:"Invoices",
icon:<FaFileInvoiceDollar/>
}



];








function changePage(page){


setActive(page);

setPage(page);


}







return(



<div className="sidebar">





{/* Logo */}


<div className="logo">


<h2>

SaaSBill

</h2>


<span>

PRO

</span>


<p>

Billing Engine

</p>


</div>









{/* Menu */}



<ul className="menu">


{

menuItems.map(item=>(


<li


key={item.id}


className={

active===item.id

?

"active"

:

""

}


onClick={()=>changePage(item.id)}



>


{item.icon}


<span>

{item.name}

</span>



</li>



))


}



</ul>









{/* Bottom */}



<div className="bottom-menu">





<button>


<FaCog/>


<span>

Settings

</span>


</button>







<button className="logout-btn">


<FaSignOutAlt/>


<span>

Logout

</span>


</button>






</div>






</div>



);


}



export default Sidebar;