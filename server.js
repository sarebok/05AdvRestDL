//create basic server
import express from 'express';
/* import cors from "cors"; */
import router from "./routes/router.js"
/* import { Logger } from 'logger'; */

const app = express();
const port = process.env.PORT || 3000;

//include basic middleware
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
  });

//manage routes
app.use('/', router);


app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
