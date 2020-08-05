class Tabelas {
    init(conection) {
        this.conection = conection;
        this.criarAtendimentos();
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (ID int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, ' +
            'pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(ID))';

        this.conection.query(sql, erro => {
            if (erro) {
                console.log('Erro ao criar tabela Atendimentos: ', erro);
            } else {
                console.log('Tabela Atendimentos Criada!');
            }
        })
    }
}

module.exports = new Tabelas;