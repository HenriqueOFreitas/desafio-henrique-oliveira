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

    validarMetodoDePagamento(metodoDePagamento) {
        const metodoDePagamentoMinusculo = metodoDePagamento.toLowerCase();
        switch (metodoDePagamentoMinusculo) {
            case 'dinheiro':
                //desconto de 5% em compras no dinheiro
                this.totalDaCompra = this.totalDaCompra - ((this.totalDaCompra * 5) / 100);
                return 1;
            case 'credito':
                this.totalDaCompra = this.totalDaCompra + ((this.totalDaCompra * 3) / 100);
                return 1;
            case 'debito':
                return 1;
            default:
                return 0;
        }
    }

    formatadorDePreco() {
        //objeto com as opções de formatação que serão usadas pelo método toLocaleString()
        const formatacao = { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 };

        // toLocaleString para formatar, por exemplo, um valor de "3.50" para "3,50"
        const precoFormatado = this.totalDaCompra.toLocaleString('pt-BR', formatacao);
        
        return ("R$ " + precoFormatado);
    }

    validarProdutoDoCardapio(produto, quantidade) {
        if(this.cardapio.hasOwnProperty(produto)) {
            this.carrinho.push(produto);
            this.totalDaCompra += this.cardapio[produto] * quantidade;
            switch (produto) {
                case 'chantily':
                    if(!this.carrinho.includes('cafe')){
                        throw "Item extra não pode ser pedido sem o principal";
                    }
                    break;
                case 'queijo':
                    if(!this.carrinho.includes('sanduiche')){
                        throw "Item extra não pode ser pedido sem o principal";
                    }
                    break;
                default:
                    break;
            }
        } else {
            throw "Item inválido!";
        }
    }

    validarQuantidadeDoProduto(quantidade) {
        if(quantidade == 0) {
            throw "Quantidade inválida!";
        }
        if(quantidade == null) {
            throw "Item inválido!";
        }
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length == 0) {
            return "Não há itens no carrinho de compra!";
        }

        for(const item of itens) {
            //Desestruturação do array retornado pelo método split()
            const[produto, quantidade] = item.split(',');            

            try {
                this.validarQuantidadeDoProduto(quantidade);
                this.validarProdutoDoCardapio(produto, quantidade);
            } catch (error) {
                return error;
            }
        }

        //Caso o método de pagamento não seja válido
        if(!this.validarMetodoDePagamento(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }
        
        return this.formatadorDePreco();
    }
}

export { CaixaDaLanchonete };
