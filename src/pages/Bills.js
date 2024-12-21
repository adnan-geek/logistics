import React, { useState, useEffect } from "react";

const Bills = () => {
  const [billsData, setBillsData] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch(
          "http://localhost/adyologistics/src/backend/scripts/shipments.php"
        );
        const data = await response.json();
        setBillsData(data);
      } catch (error) {
        console.error("Error fetching bills data: ", error);
      }
    };
    fetchBills();
  }, []);

  const generatePDF = (shipment) => {
    if (window.jspdf) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
  
      // Add Header Logo
      const logoURL = "data:image/png;base64,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OICKrigOoKIrigOo6IriACq6ojiAiq4oDqCiK4oDqOiK4gAquqI4gIquKA6goiuKA6joiuIAKrqiOICKrigOoKIrigOo6IriACq6ojiAiq4oDqCiK4oDqOiK4gAquqI4gIquKA6goiuKA6joiuIAKrqiOICKrigOoKIrigOo6IriACq6ojiAiq4oDqCiK4oDqOiK4gAquqI4gIquKA6goiuKA6joiuIAKrqiOICKrigOoKIrigOo6IriACq6ojiAiq4oDqCiK4oDqOiK4gAquqI4gIquKA6goiuKA6joiuIAKrqiOICKrigOoKIrigOo6IriACq6ojiAiq4oDqCiK4oDqOiK4gAquqI4gIquKA6goiuKA6joiuIAKrqiOICKrigOoKIrigOo6IriACq6ojiAiq4oDqCiK4oDqOiK4gAquqI4gIquKA6goiuKA6joiuIAKrqiOICKrigOoKIrigOo6IriACq6ojiAiq4oDqCiK4oDqOiK4gAquqI4gIquKA6goiuKA6joiuIAKrqiOICKrigOoKIrigOo6IriACq6ojiAiq4oDqCiK4oDqOiK4gAquqI4gIquKA6goiuKA6joiuIAKrqiOICKrigOoKIrigOo6IriACq6ojiAiq4oDqCiK4oDqOiK4gAquqI4wP8D3Emhbcr8jIEAAAAASUVORK5CYII="; // Replace with your logo URL or Base64 image
      doc.addImage(logoURL, "PNG", 10, 10, 40, 20); // x, y, width, height
  
      // Add Title
      doc.setFontSize(18);
      doc.text("Shipment Bill", 70, 20); // Center-aligned title
      doc.setFontSize(12);
      doc.text("Detailed Information", 20, 40);
  
      // Table Header and Rows
      const headers = [["Field", "Value"]];
      const rows = [
        ["Shipment ID", shipment.id],
        ["Tracking ID", shipment.trackingNumber],
        ["Sender", shipment.sender],
        ["Receiver", shipment.receiver],
        ["Destination", shipment.location],
        ["Total Price", `$${shipment.shipment_total_price}`],
      ];
  
      // Use autoTable for creating the table
      doc.autoTable({
        startY: 50, // Start position below the subtitle
        head: headers,
        body: rows,
        theme: "grid",
        headStyles: { fillColor: [52, 152, 219] }, // Blue header
        margin: { left: 10, right: 10 },
      });
  
      // Add Footer with Company Info
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(10);
      doc.text("All Rights Reserved - Adyo Logistics", 10, pageHeight - 10); // Footer text
      doc.addImage(logoURL, "PNG", 160, pageHeight - 20, 30, 10); // Footer logo
  
      // Save the generated PDF
      doc.save(`shipment_${shipment.id}.pdf`);
    } else {
      console.error("jsPDF is not loaded");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shipment Bills</h1>

      {/* Table */}
      <div className="w-full  bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Shipment ID</th>
              <th className="px-4 py-2">Tracking ID</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {billsData.map((shipment, index) => (
              <tr
                key={index}
                className={`border-t border-gray-300 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-2">{shipment.id}</td>
                <td className="px-4 py-2">{shipment.trackingNumber}</td>
                <td className="px-4 py-2">${shipment.shipment_total_price}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => generatePDF(shipment)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Download/Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bills;
