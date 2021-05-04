import { spawn } from 'child_process'

export default async (request, response) => {

  var dados = [{},{}]

  response.send(dados)

  // // GERA UM NOVO PROCESSO FILHO PARA CHAMAR O SCRIPT PYTHON 
  // const python = await spawn('python', ['script_relatorio.py', 'a', 'python'])

  // // PEGAR DADOS DO SCRIPT PYTHON
  // python.stdout.on('data', function (data) {
  //     // console.log('Pipe data from python script ...')
  //     dados = data.toString()
  // })
  // // NO EVENTO DE FECHAMENTO, TEMOS CERTEZA DE QUE O FLUXO DO PROCESSO FILHO ESTÁ FECHADO
  // python.on('close', (code) => {
  //     // console.log(`child process close all stdio with code ${code}`)

  //     // ENVIA DADOS PARA O NAVEGADOR
  //     response.send(dados)
  // })

}