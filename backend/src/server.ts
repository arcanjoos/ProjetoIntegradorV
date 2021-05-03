import express from 'express'
import { spawn } from 'child_process'

import { listarClientes } from './controller/clienteController'
import { listarProdutos } from './controller/produtoController'
import { listarPedidos } from './controller/pedidoController'
import { pythonAction, pythonActionEmail } from './controller/pythonController'

const app = express()

const porta = 3333

app.get('/', pythonAction)
app.get('/solicite-orcamento', pythonActionEmail)


app.get('/pedidos', listarPedidos)
app.get('/produtos', listarProdutos)
app.get('/clientes', listarClientes)

app.listen(porta, () => { `Servidor rodando na porta ${porta}` })
