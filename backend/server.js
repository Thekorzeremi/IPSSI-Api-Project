require("dotenv").config({ path: ".env.local" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const usersRouter = require("./routes/users.routes");
const authRouter = require("./routes/auth.routes");
const articlesRouter = require("./routes/articles.routes");
const threadsRouter = require("./routes/threads.routes");
const logsRouter = require("./routes/logs.routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

if (!process.env.JWT_SECRET) {
  throw new Error("Configuration manquante: JWT_SECRET n'est pas defini dans .env.local");
}

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/threads", threadsRouter);
app.use("/api/logs", logsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.API_PORT, () => {
  console.log("Serveur démarré sur le port " + process.env.API_PORT);
});
