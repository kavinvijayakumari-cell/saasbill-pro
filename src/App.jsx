import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Tenant from "./components/Tenant";
import Customer from "./components/Customer";
import Subscription from "./components/Subscription";
import Invoice from "./components/Invoice";


function App() {


  const [page, setPage] = useState("dashboard");



  const pageTitles = {

    dashboard:"Dashboard",

    tenant:"Tenant Management",

    customer:"Customer Management",

    subscription:"Subscription Plans",

    invoice:"Invoice Management"

  };




  const renderPage = () => {


    switch(page){


      case "dashboard":

        return <Dashboard/>;



      case "tenant":

        return <Tenant/>;



      case "customer":

        return <Customer/>;



      case "subscription":

        return <Subscription/>;



      case "invoice":

        return <Invoice/>;



      default:

        return <Dashboard/>;


    }


  };





  return (


    <div className="app">


      {/* Sidebar */}

      <Sidebar setPage={setPage}/>




      {/* Main Area */}

      <div className="main-content">





        {/* Top Navigation */}

        <header className="topbar">



          <div className="topbar-left">


            <h2>

              SaaSBill

              <span> Pro</span>

            </h2>


            <p>

              {pageTitles[page]}

            </p>


          </div>







          <div className="topbar-right">



            <div className="search-container">


              <input

                type="text"

                placeholder="Search anything..."

                className="search-box"

              />


            </div>







            <button

              className="icon-btn"

              title="Notifications"

            >

              🔔

            </button>








            <div className="profile">



              <div className="avatar">


                KP


              </div>





              <div className="profile-info">


                <strong>

                  Kavin

                </strong>



                <p>

                  Admin

                </p>



              </div>



            </div>





          </div>



        </header>








        {/* Page Content */}


        <main className="page-content">


          {renderPage()}


        </main>





      </div>



    </div>


  );


}



export default App;