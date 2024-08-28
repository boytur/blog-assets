import express from "express";
import titleRoutes from "./routes/title.route";

const app = express();

app.use(express.json());
app.use("/api", titleRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
