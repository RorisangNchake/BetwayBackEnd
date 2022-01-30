const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

//front end endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

//mock sign in endpoint
app.post('/login', async (req, res) => {
    const result = await axios.post('https://fn-uks-dev-eng-fe-mock-svc.azurewebsites.net/api/sign-in', req.body);
    console.log(req.body)
    res.send(result.data);
})

//temporary fix for client-server routing conflict since front end has no real routes
app.all('*', function(req, res) {
    res.redirect(`http://localhost:${port}`);
  });

app.listen(port, () => console.log(`listening on port ${port}`));