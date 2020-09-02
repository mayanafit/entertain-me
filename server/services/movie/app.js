require('dotenv').config();
const express = require('express');
const routes = require(`./routes`);
const app = express();
const port = process.env.PORT || 4001;


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(`/movies`, routes)

app.listen(port, () => {
    console.log(`now we are at movies! at ${port}`)
})
