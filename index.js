const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser("senhaaleatoriaparagerarocookie"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash());

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/form", (req, res) => {

    let { email, nome, pontos } = req.body;
    let emailError;
    let pontosError;
    let nomeError;

    if (email == undefined || email == "") {
        // erro na validação!
        emailError = "Email não informado!";
    }

    if (pontos == undefined || pontos < 20) {
        // erro na validação!
        pontosError = "Pontos não informado ou menor do que 20!";
    }

    if (nome == undefined || nome == "") {
        // erro na validação!
        nomeError = "Nome não pode ser vazio!";
    }

    if(nome.length < 4 ){
        nomeError = "Nome deve ter mais que 4 caracteres!";
    }

    if (emailError != undefined || nomeError != undefined || pontosError != undefined) {
        res.redirect("/");
    } else {
        res.send("Formulário todo ok!!");
    }

});

app.listen(8080, (req, res) => {
    console.log("Server Running!");
});