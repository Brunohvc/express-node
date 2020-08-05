const Atendimentos = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimentos.get(res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimentos.getbyId(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;
        Atendimentos.post(atendimento, res);
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body;
        Atendimentos.patch(id, values, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimentos.delete(id, res);
    });
}