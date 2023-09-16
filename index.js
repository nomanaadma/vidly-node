const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send('api courses');
});


const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening on port ${port}`))