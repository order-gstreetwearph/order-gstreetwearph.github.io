const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;

console.log('Hello Bryan')

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});