const express = require("express");
const mongooseConfig = require("./src/DbConfig/mongooseConfig");
const app = express();

mongooseConfig.connectToDatabase();

app.use(express.json());

app.use("/api/sales", require("./src/routes/sale.route"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
