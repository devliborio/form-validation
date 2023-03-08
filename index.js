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

    let emailError = req.flash("emailError");
    let nomeError = req.flash("nomeError");
    let pontosError = req.flash("pontosError");
    let email = req.flash("email");
    let nome = req.flash("nome");
    let pontos = req.flash("pontos");

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError;
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError;

    email = (email == undefined || email.length == 0) ? "" : email;
    nome = (nome == undefined || nome.length == 0) ? "" : nome;
    pontos = (pontos == undefined || pontos.length == 0) ? "" : pontos;

    res.render("index", { emailError, nomeError, pontosError, email: email, nome: nome, pontos: pontos });
});

app.post("/form", (req, res) => {

    let { email, nome, pontos } = req.body;
    let emailError;
    let nomeError;
    let pontosError;

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

    if (nome.length < 4) {
        nomeError = "Nome deve ter mais que 4 caracteres!";
    }

    if (emailError != undefined || nomeError != undefined || pontosError != undefined) {
        req.flash("emailError", emailError);
        req.flash("nomeError", nomeError);
        req.flash("pontosError", pontosError);
        req.flash("email", email);
        req.flash("nome", nome);
        req.flash("pontos", pontos);
        res.redirect("/");
    } else {
        res.send("Formulário todo ok!!");
    }

});

app.listen(8080, (req, res) => {
    console.log("Server Running!");
});