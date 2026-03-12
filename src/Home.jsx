import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Home = () => {

  const [name, setName] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [amount, setAmount] = useState(0);
  const [data, setData] = useState({});

  const year = new Date().getFullYear();

  const daysInMonth = new Date(year, month, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleChange = (day, type, value) => {

    setData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: Number(value),
      },
    }));

  };

  const getSubtotal = (day) => {

    const morning = data[day]?.morning || 0;
    const evening = data[day]?.evening || 0;

    return morning + evening;

  };

  const totalLitre = days.reduce((sum, day) => sum + getSubtotal(day), 0);

  const totalAmount = totalLitre * amount;

  const preventScroll = (e) => {
    e.target.blur();
  };

  const handleEnterMove = (e) => {

    if (e.key === "Enter") {

      e.preventDefault();

      const inputs = Array.from(document.querySelectorAll(".milk-input"));

      const index = inputs.indexOf(e.target);

      if (index > -1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }

    }

  };

  const monthNames = [
    "",
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const downloadPDF = () => {

    if (!name || !amount) {
      alert("Please fill Name and Amount");
      return;
    }

    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Milk Monthly Report", 70, 15);

    pdf.setFontSize(12);
    pdf.text(`Name : ${name}`, 14, 30);
    pdf.text(`Month : ${monthNames[month]}`, 14, 38);
    pdf.text(`Amount per litre : ${amount}`, 14, 46);

    const tableData = days.map((day) => [

      day,
      data[day]?.morning || 0,
      data[day]?.evening || 0,
      getSubtotal(day),

    ]);

    autoTable(pdf, {

      startY: 55,

      head: [["Date", "Morning", "Evening", "Subtotal"]],

      body: tableData,

      styles: {
        halign: "center",
      },

    });

    pdf.text(
      `Total Litre : ${totalLitre}`,
      14,
      pdf.lastAutoTable.finalY + 15
    );

    pdf.text(
      `Total Amount : ${totalAmount}`,
      14,
      pdf.lastAutoTable.finalY + 25
    );

    pdf.save(`${name}.pdf`);

  };

  return (

    <div className="p-4 md:p-8">

      <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
        Milk Monthly Calculator
      </h1>

      <div className="flex flex-col md:flex-row gap-4 md:items-center">

        <div>
          <label>Name :</label>

          <input
            type="text"
            className="border ml-2 px-2 py-1"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>

        <div>
          <label>Month :</label>

          <select
            className="border ml-2 px-2 py-1"
            value={month}
            onChange={(e)=>setMonth(Number(e.target.value))}
          >

            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>

          </select>
        </div>

        <div>
          <label>Amount :</label>

          <input
            type="number"
            className="border ml-2 px-2 py-1"
            value={amount}
            onWheel={preventScroll}
            onChange={(e)=>setAmount(Number(e.target.value))}
          />
        </div>

      </div>

      <div className="mt-6 overflow-x-auto">

        <table className="border border-black w-full text-center">

          <thead className="bg-gray-200">

            <tr>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Morning</th>
              <th className="border px-2 py-1">Evening</th>
              <th className="border px-2 py-1">Subtotal</th>
            </tr>

          </thead>

          <tbody>

            {days.map((day)=> (

              <tr key={day}>

                <td className="border">{day}</td>

                <td className="border">

                  <input
                    type="number"
                    className="milk-input w-16 md:w-20 border text-center"
                    onWheel={preventScroll}
                    onKeyDown={handleEnterMove}
                    onChange={(e)=>handleChange(day,"morning",e.target.value)}
                  />

                </td>

                <td className="border">

                  <input
                    type="number"
                    className="milk-input w-16 md:w-20 border text-center"
                    onWheel={preventScroll}
                    onKeyDown={handleEnterMove}
                    onChange={(e)=>handleChange(day,"evening",e.target.value)}
                  />

                </td>

                <td className="border font-semibold">
                  {getSubtotal(day)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-6 text-lg space-y-1">

        <h1>Total Litre : {totalLitre}</h1>

        <h1>Amount : {amount}</h1>

        <h1 className="font-bold">
          Total Amount : {totalAmount}
        </h1>

      </div>

      <button
        onClick={downloadPDF}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Download PDF
      </button>

    </div>

  );

};

export default Home;