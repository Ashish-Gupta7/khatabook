const express = require('express');
const app = express();
const path = require('path');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get("/register", (req, res ) => {
    res.render('register');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening at localhost:${PORT}`);
});
