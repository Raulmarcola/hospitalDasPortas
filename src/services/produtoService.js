import db from '../db/db.js'

export const findAll = async (idProduto, nomeProduto, tipo, descricao) =>{
    let sql = ' SELECT * FROM produtos ';
    const conditions = [];
    const values = [];

    if(idProduto){
        conditions.push('idProduto = ?')
        values.push(idProduto)
    };

    if(nomeProduto){
        conditions.push('LOWER(nomeProduto) LIKE ?')
        values.push(`%${nomeProduto.toLowerCase()}%`)
    };

    if(tipo){
        conditions.push('LOWER(tipo) LIKE ?')
        values.push(`%${tipo.toLowerCase()}%`)
    };

    if(descricao){
        conditions.push('LOWER(descricao) LIKE ?')
        values.push(`%${descricao.toLowerCase()}%`)
    };

    if(conditions.length > 0){
        sql += ' WHERE ' + conditions.join(' AND ')
    };

    const [rows] = await db.query(sql, values);

    return rows;
}

export const create = async (produtoDados) =>{
    const novoProduto ={
        ...produtoDados
    }

    await db.query('SET INTO produto SET ?', produtoDados);
    return novoProduto;
}