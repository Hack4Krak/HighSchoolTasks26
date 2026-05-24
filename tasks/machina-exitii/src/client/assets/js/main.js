document.getElementById('f').onsubmit = (e) => { 
  e.preventDefault(); 
  const payload = {
      p: e.target.p.value || "1",
      q: e.target.q.value || "1",
      pi_a: "0x01", pi_b: "0x02", pi_c: "0x03",
      contract: "0x0000000000000000000000000000000000000000",
      sender: "0x0000000000000000000000000000000000000000",
      program: e.target.program.value 
  };
  fetch('/api/v1/enterprise/validate', { 
      method: 'POST', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(payload) 
  })
  .then(r=>r.json())
  .then(data => {
      document.getElementById('out').innerText = JSON.stringify(data, null, 2);
  }); 
};
