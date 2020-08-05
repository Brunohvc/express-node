const moment = require('moment')
const conection = require('../infra/conection')

class Atendimentos {
    post(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 5;
        const validacoes = [
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter pelo menos 5 catacteres!'
            },
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual!'
            }
        ];
        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;
        if (existemErros) {
            res.status(400).json(erros);
        } else {
            const atendimentoData = { ...atendimento, dataCriacao, data }
            const sql = 'INSERT INTO Atendimentos SET ?'
            conection.query(sql, atendimentoData, (erro, result) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(result);
                }
            })
        }
    }

    getbyId(id, res) {
        const sql = `SELECT * from Atendimentos WHERE ID = ?`

        conection.query(sql, id, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                const atendimento = result[0];
                res.status(200).json(atendimento);
            }
        })
    }

    patch(id, values, res) {
        if (values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conection.query(sql, [values, id], (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ id, ...values });
            }
        })
    }

    get(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conection.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(result);
            }
        })
    }

    delete(id, res) {
        const sql = `DELETE FROM Atendimentos WHERE ID = ?`

        conection.query(sql, id, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ id });
            }
        })
    }
}

module.exports = new Atendimentos;