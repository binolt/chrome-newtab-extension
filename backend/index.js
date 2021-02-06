const express = require("express");
const app = express();

app.get('/api', (req, res) => {  res.send(<h1>Hello Express!</h1>);});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});