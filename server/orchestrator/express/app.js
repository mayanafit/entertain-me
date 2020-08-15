require('dotenv').config();
const express = require(`express`);
const routes = require(`./routes`);
const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)
app.get(`/`, (req, res) => {
    res.send(`welcome to EntertainMe!`)
})

app.listen(port, () => {
    console.log(`welcome to EntertainMe EM! at ${port}`)
})