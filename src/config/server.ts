import express from "express";
import cors from "cors";
import routers from "../routers/routers";
const app = express();

const corOP: cors.CorsOptions = {
  origin: "*",
  credentials: true,

  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corOP));

//Enable CORS for all HTTP methods
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token"
  );
  next();
});

app.use("/", routers)

export default app 