import app from "./app.js";
import { PORT } from "./config/env.js"
import { connectDB } from "./config/db.js";

const startServer = async ()=> {

    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
  console.log(`API server running on port ${PORT}`);
});

}

startServer();