async function getIpInfo() {
  try {
    const ipInput = document.getElementById('ipInput');
    const ip = ipInput.value.trim();
    if (ip) {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();

      if (data.status === 'success') {
        const ipInfo = {
          ip: data.query,
          isp: data.isp,
          org: data.org,
          country: data.country,
          regionName: data.regionName,
          city: data.city,
          zip: data.zip,
          lat: data.lat,
          lon: data.lon,
        };

        // Display IP info on the page
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        Object.keys(ipInfo).forEach((key) => {
          const paragraph = document.createElement('p');
          paragraph.textContent = `${key} : ${ipInfo[key]}`;
          resultsDiv.appendChild(paragraph);
        });

        // Create the map
        const map = L.map('map').setView([ipInfo.lat, ipInfo.lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
          subdomains: ['a', 'b', 'c'],
        }).addTo(map);
        const marker = L.marker([ipInfo.lat, ipInfo.lon]).addTo(map);
      } else {
        alert('Failed to retrieve IP information.');
      }
    } else {
      alert('Please enter an IP address!');
    }
  } catch (error) {
    console.error(error);
    alert('Connection error!');
  }
}
