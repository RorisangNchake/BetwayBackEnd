import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('route works');
})

app.post('/login', async (req, res) => {
    const result = await axios.post('https://fn-uks-dev-eng-fe-mock-svc.azurewebsites.net/api/sign-in', req.body);
    console.log(req.body)
    res.send(result.data);
})

app.listen(port, () => console.log(`listening on port ${port}`));