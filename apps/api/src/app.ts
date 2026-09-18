import express from "express";

import apiRoutes from "./routes/apiRoutes";
import databaseRoutes from "./routes/databaseRoutes";
import healthRoutes from "./routes/healthRoutes";
import productRoutes from "./routes/productRoutes";
import projectRoutes from "./routes/projectRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use("/api", apiRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/database", databaseRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;