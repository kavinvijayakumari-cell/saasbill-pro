import { useEffect, useState } from "react";

function Report() {

  const [tenantCount, setTenantCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {

    const tenants =
      JSON.parse(localStorage.getItem("tenants")) || [];

    const customers =
      JSON.parse(localStorage.getItem("customers")) || [];

    const subscriptions =
      JSON.parse(localStorage.getItem("subscriptions")) || [];

    const invoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    const payments =
      JSON.parse(localStorage.getItem("payments")) || [];

    setTenantCount(tenants.length);
    setCustomerCount(customers.length);
    setSubscriptionCount(subscriptions.length);
    setInvoiceCount(invoices.length);
    setPaymentCount(payments.length);

    let total = 0;

    payments.forEach((item) => {
      if (item.status === "Paid") {
        total += Number(item.amount);
      }
    });

    setRevenue(total);

  }, []);

  return (

    <div className="report-page">

      <h1>Reports & Analytics</h1>

      <div className="cards">

        <div className="card">
          <h3>Total Tenants</h3>
          <h2>{tenantCount}</h2>
        </div>

        <div className="card">
          <h3>Total Customers</h3>
          <h2>{customerCount}</h2>
        </div>

        <div className="card">
          <h3>Subscriptions</h3>
          <h2>{subscriptionCount}</h2>
        </div>

        <div className="card">
          <h3>Invoices</h3>
          <h2>{invoiceCount}</h2>
        </div>

        <div className="card">
          <h3>Payments</h3>
          <h2>{paymentCount}</h2>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <h2>₹{revenue}</h2>
        </div>

      </div>

      <div className="recent">

        <h2>Business Summary</h2>

        <table>

          <thead>

            <tr>
              <th>Module</th>
              <th>Total Records</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>Tenants</td>
              <td>{tenantCount}</td>
            </tr>

            <tr>
              <td>Customers</td>
              <td>{customerCount}</td>
            </tr>

            <tr>
              <td>Subscriptions</td>
              <td>{subscriptionCount}</td>
            </tr>

            <tr>
              <td>Invoices</td>
              <td>{invoiceCount}</td>
            </tr>

            <tr>
              <td>Payments</td>
              <td>{paymentCount}</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Report;