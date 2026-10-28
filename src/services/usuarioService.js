import db from '../db/db.js'
import bcrypt from 'bcrypt'

export const findAll = async (cpf, nome, cidade, telefone, email) =>{
    let sql = ' SELECT * FROM usuario ';
    const conditions = [];
    const values = [];

    if(cpf){
        conditions.push('cpf = ?')
        values.push(cpf)
    };

    if(nome){
        conditions.push('LOWER(nome) LIKE ?')
        values.push(`%${nome.toLowerCase()}%`)
    };

    if(cidade){
        conditions.push('LOWER(cidade) LIKE ?')
        values.push(`%${cidade.toLowerCase()}%`)
    };

    if(telefone){
        conditions.push('telefone = ?')
        values.push(telefone)
    };

    if(email){
        conditions.push('email = ?')
        values.push(email)
    };

    if(conditions.length > 0){
        sql += ' WHERE ' + conditions.join(' AND ')
    };

    const [rows] = await db.query(sql, values);
    return rows;
};

export const create = async (usuarioDados) =>{
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(usuarioDados.senha, saltRounds) //Passo 1: fazer o hash da senha

    const novoUsuario = {
        ...usuarioDados,
        senha: hashedSenha
    }//Passo 2: Copiar novoUsuario com os dados que vieram, colocando a senha criptografada

    await db.query('INSERT INTO usuario SET ?', novoUsuario);

    delete novoUsuario.senha;
    return novoUsuario;
}; //Passo 3: Usar a biblioteca db para executar o comando sql usando o usuario com a hashedSenha

export const update = async (cpf, usuarioDados) =>{
    if (usuarioDados.senha){
        const saltRounds = 10;
        usuarioDados.senha = await bcrypt.hash(usuarioDados.senha, saltRounds)
    } //Tanto em create quanto em update, usamos o hash para criptografar a senha, mas no update nós transformamos a senha que o usuário informar, como para trocar a senha, em uma senha com hash

    const resultado = await db.query('UPDATE usuario SET ? WHERE cpf = ?'[cpf, usuarioDados])
    return resultado.affectedRows > 0;
};

export const remove = async (cpf) =>{
    const [resultado] = await db.query('DELETE FROM usuario WHERE cpf = ?', [cpf])
    return resultado.affectedRows > 0;
};