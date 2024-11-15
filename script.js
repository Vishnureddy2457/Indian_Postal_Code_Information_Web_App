function toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }
  
  function fetchPostalData() {
    const input = document.getElementById('searchInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    if (!input) {
      alert("Please enter a pincode or area name.");
      return;
    }
  
    const isPincode = input.length === 6 && !isNaN(input);
    let apiUrl;
    if (isPincode) {
      apiUrl = `https://api.postalpincode.in/pincode/${input}`;
    } else {
      apiUrl = `https://api.postalpincode.in/postoffice/${input}`;
    }
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data[0].Status === "Error") {
          resultDiv.innerHTML = `<p class="text-danger">No results found. Please check the pincode or area name.</p>`;
          return;
        }
  
        data[0].PostOffice.forEach(postOffice => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
            <h5>${postOffice.Name}</h5>
            <p><strong>Pincode:</strong> ${postOffice.Pincode}</p>
            <p><strong>District:</strong> ${postOffice.District}</p>
            <p><strong>State:</strong> ${postOffice.State}</p>
            <p><strong>Post Office:</strong> ${postOffice.Name}</p>
          `;
          resultDiv.appendChild(card);
        });
      })
      .catch(error => {
        resultDiv.innerHTML = `<p class="text-danger">Failed to fetch data. Please try again later.</p>`;
        console.error("Error fetching postal data:", error);
      });
  }
  