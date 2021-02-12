const express = require("express");
const app = express();

const menuRouter = require("./routes/menu");
app.use("/api/menu", menuRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});