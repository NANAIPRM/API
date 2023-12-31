require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const homeListRoute = require("./routes/houseList-route");
const postCodeRoute = require("./routes/postCode-route");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

if (process.env.NODE_ENV === "develop") {
  app.use(morgan("combined"));
}

app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 1000,
    message: { message: "too many request" },
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("", homeListRoute);
app.use("", postCodeRoute);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 8888;

app.listen(port, () => console.log("server running in port " + port));
