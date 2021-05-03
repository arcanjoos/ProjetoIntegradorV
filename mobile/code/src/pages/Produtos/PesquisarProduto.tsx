import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, FlatList, Alert } from 'react-native'
import { Searchbar, } from 'react-native-paper'
import Header from '../../components/Header'
import { CardProduto } from '../../components/CardProduto'
import { ButtonCard } from '../../components/ButtonCard'
// import { saveJson } from '../../lib/storage'

interface ProdutoProps {
    id: string,
    nome: string,
    descricao: string,
    imagem: string,
    preco: number,
    categoria: string,
}

export function PesquisarProduto() {

    const navigation = useNavigation()
    const routes = useRoute()

    const { categoria: categoriaParams, produtos }: any = routes.params



    const [data, setData] = useState<[ProdutoProps]>([] as any)
    const [filteredData, setFilteredData] = useState<[ProdutoProps]>()
    const [categorias, setCategorias] = useState([] as string[]);
    const [categoria, setCategoria] = useState<string>(categoriaParams);
    const [pesquisa, setPesquisa] = useState<string>('');

    const pesquisar = async (search: string) => {
        setPesquisa(search)
        const filtrados = [] as any;
        data.filter((produto) => {
            if (produto.descricao == search) {
                filtrados.push(produto)
            }
        })
        setFilteredData(filtrados)
    };

    const filtrar = async (search: string) => {
        if (search === 'Todos') {
            setCategoria(search)
            return setFilteredData(data)
        }
        else {
            const filtrados = [] as any;
            data.filter((produto) => {
                if (produto.categoria == search || produto.descricao == search) {
                    filtrados.push(produto)
                }
            })
            setFilteredData(filtrados)
            setCategoria(search)
        }
    }

    const getProduct = async () => {
        const data = [] as any;
        const filtrados = [] as any
        const categorias = ['Todos'] as any;

        produtos.map((produto: any) => {
            // array de produtos
            data.push({
                ...produto,
                id: produto.id
            })

            //para usar como filtro
            categorias.push(
                produto.categoria,
            )

            const categoriaFiltradas = [...new Set(categorias)];



            // filtrar de acordo com a categoria
            if (categoriaParams === produto.categoria) {
                filtrados.push(produto)
            }

            // set as categorias para usar como filtro
            setCategorias(categoriaFiltradas as string[])

            // set para exibir os dados
            setFilteredData(filtrados)

            // salvando todos os produtos
            setData(data)
        })

    }

    useEffect(() => {
        getProduct()
    }, [])

    // const adicionarProdutoFavorito = async (item: ProdutoProps) => {
    //     await saveJson(item)
    //     Alert.alert("Salvo com sucesso")
    // }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header navigation={navigation} isHome={true} title='Produtos' />

            <Searchbar
                placeholder="Digite para pesquisar"
                style={{ margin: 10 }}
                value={`${pesquisa}`}
                onChangeText={(value) => pesquisar(value)}
            />
            <View style={{ marginBottom: 10 }}>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categorias}
                    keyExtractor={(item: string) => item}
                    renderItem={({ item }) => (
                        <ButtonCard active={item === categoria} renderItem={item} action={() => filtrar(item)} />
                    )}

                />
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredData}
                renderItem={({ item }) => (<CardProduto buttonTitle="Adicionar Favoritos" renderItem={item} /* action={() => adicionarProdutoFavorito(item)} */ />)}
                keyExtractor={({ id }) => id}
            />

        </View>
    )

}