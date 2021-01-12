
import express from "express";

const app = express();

app.use(express.json());

const PORT = 3003;

app.get("/ping", (_req, res) => {
    console.log("ping...");
    res.send("pong");
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});