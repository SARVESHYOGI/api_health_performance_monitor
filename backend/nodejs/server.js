import app from './src/app.js'
import { configDotenv } from 'dotenv';
configDotenv();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log("server is running on port", PORT);
})