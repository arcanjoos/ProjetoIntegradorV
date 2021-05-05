export default (request, response) => {
  response.status(200).json({
    "VEJA": "ROTAS GET",
    "clientes": '/api/clientes',
    "pedidos": '/api/pedidos',
    "produtos": '/api/produtos',
    "solicitar_orcamento": '/api/solicitar_orcamento',
    "solicitar_relatorio": '/api/solicitar_relatorio',
  })
}