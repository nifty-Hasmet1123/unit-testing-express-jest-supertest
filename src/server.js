import dotenv from "dotenv";
import app from "./app.js";

dotenv.config()

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started at: http://localhost:${port}`))