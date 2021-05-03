import React, { createContext, useContext, useEffect, useState } from 'react'

interface ProdutoProps {
    preco: number,
    quantidade: number,
    id: string,
    nome: string,
    descricao: string,
    imagem: string,
    categoria: string,
}

interface CartProviderProps {
    carrinho: ProdutoProps[]
    total: number
    adicionar: (item: ProdutoProps) => void
    remover: (item: ProdutoProps) => void
    removerItem: (item: ProdutoProps) => void
    limparCarrinho: () => void

}

export const CarrinhoContext = createContext({} as CartProviderProps)

export function CarrinhoProvider({ children }: any) {

    const [carrinho, setCarrinho] = useState<ProdutoProps[]>([])

    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        let total = 0
        if (carrinho) {
            carrinho.map(({ preco, quantidade }: any) => {
                total = total + preco * quantidade

            })
        }
        setTotal(total)
    }, [carrinho])



    function limparCarrinho() {
        setCarrinho([])
    }


    function adicionar(produto: ProdutoProps) {
        // verifica se o produto está no carrinho
        const exist = carrinho.find((item: ProdutoProps) => produto.id === item.id)

        // se tiver o produto, percorre o array de produtos e adiciona 1, no produto que está sendo adiciona
        if (exist) {
            setCarrinho(
                carrinho.map((item: ProdutoProps) =>
                    produto.id === item.id ? { ...exist, quantidade: exist.quantidade + 1 } : item
                )
            )
            // se não tiver adiciona com quantidade 1
        } else {
            setCarrinho([...carrinho, { ...produto, quantidade: 1 }])
        }
    }
    
    
    function remover(produto: ProdutoProps) {
        // verifica se o produto não está no carrinho 
        const exist = carrinho.find((item: ProdutoProps) => produto.id === item.id)

        if (exist) {
            if (exist.quantidade == 1) {

                setCarrinho(
                    carrinho.filter((item: ProdutoProps) => produto.id !== item.id)
                )

            } else {
                setCarrinho(
                    carrinho.map((item: ProdutoProps) =>
                        produto.id === item.id ? { ...exist, quantidade: exist.quantidade - 1 } : item
                    )
                )
            }
        }
    }



    function removerItem(produto: ProdutoProps) {
        setCarrinho(
            carrinho.filter((item: ProdutoProps) => produto.id !== item.id)
        )
    }

    // Para o context ter acesso a todas as funções
    return (
        <CarrinhoContext.Provider value={{ carrinho, total, adicionar, remover, removerItem, limparCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

// criando um hook para utilizar no restante do app
export function useCart() {

    const context = useContext(CarrinhoContext)

    const { carrinho, total, adicionar, remover, removerItem, limparCarrinho } = context

    return { carrinho, total, adicionar, remover, removerItem, limparCarrinho }
}
