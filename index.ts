import app from "./src/config/server";
const port = process.env.PORT || 3333
// const web = new web3(window.ethereum)
app.listen(port, () => console.log(`Starter API`))