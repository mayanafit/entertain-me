require('dotenv').config();
const express = require('express');
const routes = require(`./routes`);
const app = express();
const port = process.env.PORT || 4002;


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(`/series`, routes)

app.listen(port, () => {
    console.log(`now we are at series! ${port}`)
})
