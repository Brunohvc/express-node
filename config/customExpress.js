const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser')


module.exports = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.listen(3000, () => console.log('servidor rodando na porta 3000'));

    consign()
        .include('controllers')
        .into(app);

    return app;
}