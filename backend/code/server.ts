import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { listarClientes } from './src/controller/clienteController'
import { listarProdutos } from './src/controller/produtoController'
import { listarPedidos } from './src/controller/pedidoController'
import { pythonOrcamento, pythonRelatorio } from './src/controller/pythonController'

const app = express()
const porta = 3333
// lista das origens que você deseja permitir que acessem recursos do servidor 
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
}

app.use(cors(options))
app.use(express.json())

app.get('/', (request: any, response: any) => {
    response.send({
        'rotas_disponiveis': 'get',
        "rota_01": '/solicitar_orcamento',
        "rota_02": '/solicitar_relatorio',
        "rota_03": '/pedidos',
        "rota_04": '/produtos',
        "rota_05": '/clientes',
    })
})
app.get('/solicitar_orcamento', pythonOrcamento)
app.get('/solicitar_relatorio', pythonRelatorio)

app.get('/pedidos', listarPedidos)
app.get('/produtos', listarProdutos)
app.get('/clientes', listarClientes)

app.listen(porta, () => { `Servidor rodando na porta ${porta}` })