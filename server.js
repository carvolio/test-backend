const express = require("express");
const cors = require("cors");
require('dotenv').config();
// const ejs = require('ejs');
const deepl = require('deepl-node');
const authKey = process.env.API_KEY;

const app = express();
app.use(express.json());
app.use(cors());

const porta = process.env.PORT || 3000;
// app.set('view engine', 'ejs');
// app.use(express.static('public'));

const router = express.Router();
app.use(router);

app.listen(porta, () => {
    console.log("API respondendo na porta 3000");
});

const teste = (req, res) => {
    res.json("API gerenciador de tarefas respondendo!");
};
router.get("/", teste);

const translator = new deepl.Translator(authKey);

const textTraslate = async (text, lang) => {
    const result = await translator.translateText(text, null, lang, { formality: 'less' })
    // console.log(result.text);
    return result.text;
};

const testeUrl = async (req, res) => {
    let text = req.query.text;
    let lang = req.query.lang;
 
    let textPT = await textTraslate("dog", "pt-BR");
    // console.log(textPT);
    res.json(textPT);
    // res.render('index', { text: textPT });
    // return await textPT;
};
router.get("/t", testeUrl);

