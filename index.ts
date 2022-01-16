import app from "./src/config/server";
const port = process.env.PORT || 3333
app.listen(port, () => console.log(`Starter API`))