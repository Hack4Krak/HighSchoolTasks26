const express = require('express');

const app = express();
const PORT = 4567;

const WEBHOOK_URL = "https://discord.com/api/webhooks/1505958335298535514/L6Pe6R5v8K9fTW-IgIbM_Z2TV8vZzNKkN_fCXoflIf2FAbEWDyqtnR8_ltbMD7gzQ9ib";

app.use(express.json());

app.post('/submit', async (req, res) => {
  const { name, age, city, total, answers } = req.body;
  res.status(200);

  if (Math.random() < (total ** 2 - 400) / (total ** 2)) {
    res.status(418); // I'm a teapot!
  }

  if (!req.body.pleaseNoWebhook) {
    if (!Array.isArray(answers)) {
      res.status(451)
      res.end("wtf you mean no answers")
      return
    }
    const answerFields = answers.map(a => {
      return { name: a.question, value: a.answer };
    });
    
    const webhookPayload = {
      content: `📋 **Nowa odpowiedź od ${name} lat ${age} z ${city}**`,
      embeds: [{
        fields: answerFields,
        timestamp: new Date().toISOString()
      }],
      username: name
    };

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload)
    });
  }

  if (total >= 100) {
    res.write("hack4KrakCTF{st0p-n1ewOlnicTfu-v-hACk4cR@cK}")
  }

  res.end();
})
  
app.listen(PORT, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Listening on 0.0.0.0:${PORT}`)
  }
})
