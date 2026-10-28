export const findAll = async (idPedido, statusPedido, formaPagamento, valorTotal) =>{
    let sql = ' SELECT * FROM pedido ';
    const values = [];
    const conditions = [];

    if(idPedido){
        conditions.push('idPedido = ?')
        values.push(idPedido)
    }

    if(statusPedido){
        conditions.push('LOWER(statusPedido) LIKE ? ')
        values.push(`%${statusPedido.toLowerCase()}%`)
    }
    //Lembrando que toLowerCase deixatudo minúsculo; ${} permite colocar uma variável dentro da string; e % é um elemento do mysql para indicar que há mais caracteres

    if(formaPagamento){
        conditions.push('LOWER(formaPagamento) LIKE ? ')
        values.push(`%${formaPagamento.toLowerCase()}%`)
    }

    if(valorTotal){
        conditions.push(' valorTotal = ? ')
        values.push(valorTotal)
    }

    if(conditions.length > 0){
        sql += ' WHERE ' + join(' AND ') //Só é para fazer isso se conditions for maior que 0, ou sej, houver condições
    //caso contrário poderia ficar uma consulta vazia: SELECT * FROM pedido WHERE AND 
    }
}