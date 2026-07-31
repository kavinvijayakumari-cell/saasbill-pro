import { useState, useEffect } from "react";

function Payment() {

  const [company, setCompany] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const [status, setStatus] = useState("Paid");

  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [payments, setPayments] = useState(() => {
    const data = localStorage.getItem("payments");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(payments));
  }, [payments]);

  function savePayment() {

    if (!company || !invoiceNo || !amount) {
      alert("Please fill all fields");
      return;
    }

    const payment = {
      id: editId || Date.now(),
      paymentId: "PAY-" + (editId || Date.now()),
      company,
      invoiceNo,
      amount,
      method,
      status,
      date: new Date().toLocaleDateString()
    };

    if (editId) {
      setPayments(
        payments.map((item) =>
          item.id === editId ? payment : item
        )
      );
      setEditId(null);
    } else {
      setPayments([...payments, payment]);
    }

    setCompany("");
    setInvoiceNo("");
    setAmount("");
    setMethod("UPI");
    setStatus("Paid");
  }

  function editPayment(payment) {
    setCompany(payment.company);
    setInvoiceNo(payment.invoiceNo);
    setAmount(payment.amount);
    setMethod(payment.method);
    setStatus(payment.status);
    setEditId(payment.id);
  }

  function deletePayment(id) {
    setPayments(
      payments.filter((item) => item.id !== id)
    );
  }

  const filtered = payments.filter((item) =>
    item.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tenant-page">

      <h1>Payment Center</h1>

      <div className="tenant-form">

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Invoice Number"
          value={invoiceNo}
          onChange={(e) => setInvoiceNo(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option>UPI</option>
          <option>Credit Card</option>
          <option>Debit Card</option>
          <option>Net Banking</option>
          <option>Cash</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Paid</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>

        <button onClick={savePayment}>
          {editId ? "Update Payment" : "Add Payment"}
        </button>

      </div>

      <input
        className="search-box"
        type="text"
        placeholder="Search Company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>

        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Company</th>
            <th>Invoice</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filtered.map((payment) => (

            <tr key={payment.id}>

              <td>{payment.paymentId}</td>
              <td>{payment.company}</td>
              <td>{payment.invoiceNo}</td>
              <td>₹{payment.amount}</td>
              <td>{payment.method}</td>
              <td>{payment.status}</td>
              <td>{payment.date}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => editPayment(payment)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deletePayment(payment.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Payment;