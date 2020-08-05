const customExpress = require('./config/customExpress')
const conection = require('./infra/conection');
const Tabelas = require('./infra/tabelas');


conection.connect(erro => {
    if (erro) {
        console.log(erro)
    } else {
        console.log('conectado')
        Tabelas.init(conection);
        const app = customExpress();
        app.get('/', (req, res) => res.send('Servidor rodando'));
    }
})


