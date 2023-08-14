
class CaixaDaLanchonete {

    //Método construtor da classe CaixaDaLanchonete
    constructor() {
        this.totalDaCompra = 0;
        this.carrinho = [];
        // object literal que representa o cardápio da lanchonete
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length == 0) {
            return "Não há itens no carrinho de compra!";
        }

        //foreach
        for(const item of itens) {
            //Desestruturação do array retornado pelo método split()
            const[produto, quantidade] = item.split(',');
            if(quantidade == 0) {
                return "Quantidade inválida!";
            }
            
            if(this.cardapio.hasOwnProperty(produto)) {
                this.carrinho.push(produto);
                this.totalDaCompra += this.cardapio[produto] * quantidade;
                switch (produto) {
                    case 'chantily':
                        if(!this.carrinho.includes('cafe')){
                            return "Item extra não pode ser pedido sem o principal";
                        }
                        break;
                    case 'queijo':
                        if(!this.carrinho.includes('sanduiche')){
                            return "Item extra não pode ser pedido sem o principal";
                        }
                        break;
                    default:
                        break;
                }
            } else {
                return "Item inválido!";
            }
        }

        const metodoDePagamentoMinusculo = metodoDePagamento.toLowerCase();
        switch (metodoDePagamentoMinusculo) {
            case 'dinheiro':
                //desconto de 5% em compras no dinheiro
                this.totalDaCompra = this.totalDaCompra - ((this.totalDaCompra * 5) / 100);
                break;
            case 'credito':

                this.totalDaCompra = this.totalDaCompra + ((this.totalDaCompra * 3) / 100);
                break;
            case 'debito':
                break
            default:
                return "Forma de pagamento inválida!";
        }

        //objeto com as opções de formatação que serão usadas pelo método toLocaleString()
        const formatacao = { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 };

        // toLocaleString para formatar, por exemplo, um valor de "3.50" para "3,50"
        const precoFormatado = this.totalDaCompra.toLocaleString('pt-BR', formatacao);
        return "R$ " + precoFormatado;
    }

}

export { CaixaDaLanchonete };