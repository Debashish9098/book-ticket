let passengers = []; // Array to store passenger details

    function addPassenger() {
      let name = document.getElementById('name').value;
      let gender = document.querySelector('input[name="gender"]:checked').value;
      let age = parseInt(document.getElementById('age').value);
      let mobile = document.getElementById('mobile').value;
      let stationFrom = document.getElementById('stationFrom').value;
      let stationTo = document.getElementById('stationTo').value;

      passengers.push({
        name: name,
        gender: gender,
        age: age,
        mobile: mobile,
        stationFrom: stationFrom,
        stationTo: stationTo
      });

      document.getElementById('name').value = '';
      document.querySelector('input[name="gender"][value="female"]').checked = true;
      document.getElementById('age').value = '';
      document.getElementById('mobile').value = '';
      document.getElementById('stationFrom').value = 'Marathalli';
      document.getElementById('stationTo').value = 'Select';
    }

    document.getElementById('addPassengerBtn').addEventListener('click', function () {
      addPassenger();
    });

    document.getElementById('ticketForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    addPassenger();

    let passengerDetails = 'Passenger Details:\n';
    let totalAmount = 0; // Initialize total amount counter

    passengers.forEach(function (passenger, index) {
        passengerDetails += `Passenger ${index + 1}:\n`;
        passengerDetails += `Name: ${passenger.name}\n`;
        passengerDetails += `Gender: ${passenger.gender}\n`;
        passengerDetails += `Age: ${passenger.age}\n`;
        passengerDetails += `Mobile No: ${passenger.mobile}\n`;
        passengerDetails += `From: ${passenger.stationFrom}\n`;
        passengerDetails += `To: ${passenger.stationTo}\n`;
        
        // Calculate age discount
        let agediscount;
        if (passenger.age <= 5) {
            agediscount = '0';
        } else if (passenger.gender === 'female' && passenger.age <= 8) {
            agediscount = 'Rs.500';
            totalAmount += 500; // Add discount to total amount
        } else if (passenger.age >= 65) {
            agediscount = 'Rs.300';
            totalAmount += 300; // Add discount to total amount
        } else {
            agediscount = 'Rs.1000';
            totalAmount += 1000; // Add default amount to total amount
        }
        passengerDetails += `Age Discount: ${agediscount}\n\n`;
    });

    // Add total amount to passenger details
    passengerDetails += `Total Amount: Rs.${totalAmount}\n`;

    document.getElementById('passengerDetails').value = passengerDetails;
    document.getElementById('myModal').style.display = "block";
});


    document.getElementById('downloadBtn').addEventListener('click', function () {
      generatePDF();
    });

    // When the user clicks on <span> (x), close the modal
    document.getElementsByClassName('close')[0].addEventListener('click', function () {
      document.getElementById('myModal').style.display = "none";
    });

    // Function to generate PDF from HTML content
    function generatePDF() {
    const element = document.getElementById('passengerDetails');
    html2pdf(element, {
        margin: 0.5,
        filename: 'passenger_details.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
}

    