const app = require("./app");
const swaggerDocs = require("./swagger");

const PORT = process.env.PORT || 5000;

swaggerDocs(app, PORT);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
