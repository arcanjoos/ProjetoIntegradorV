# IMPORTAÇÃO DO FIREBASE
import firebase_admin
from firebase_admin import credentials, firestore

# FERRAMENTAS PARA API (TIPO EXPRESS E JSON STRINGFY EM NODE)
from flask import Flask, jsonify, request
import json

# ANALISE DE TABELAS
import pandas as pd

# ENVIO POR EMAIL
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.mime.base import MIMEBase
from email.mime.audio import MIMEAudio
from email import encoders
import smtplib
import os
import mimetypes

import numpy as np

# 'INICIANDO API'
app = Flask(__name__)

# CONFIGURAÇÕES FIREBASE
cred = credentials.Certificate('firebase-sdk.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


@app.route('/')
def hello():

    html = '''
    <!DOCTYPE html>
    <html>
        <title>W3.CSS Template</title>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto'>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
        <style>
        html,body,h1,h2,h3,h4,h5,h6 {font-family: 'Roboto', sans-serif}
        </style>
        <body class='w3-light-grey'>

            <div class='w3-content w3-margin-top' style='max-width:1400px;'>

            <div class='w3-row-padding'>


                <div class='w3-container w3-card w3-white'>
                    <h2 class='w3-text-grey w3-padding-16'><i class='fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal'></i>Rotas Disponíveis</h2>
                    <div class='w3-container'>
                        <h5 class='w3-opacity'><b>Listar Clientes</b></h5>
                        <a href='/clientes' target='_blank'>Abrir</p>
                        <hr>
                    </div>
                    
                    <div class='w3-container'>
                        <h5 class='w3-opacity'><b>Listar Produtos</b></h5>
                        <a href='/produtos' target='_blank'>Abrir</a>
                        <hr>
                    </div>

                    <div class='w3-container'>
                        <h5 class='w3-opacity'><b>Listar Pedidos</b></h5>
                        <a href='/pedidos' target='_blank'>Abrir</a>
                        <hr>
                    </div>

                    <div class='w3-container'>
                        <h5 class='w3-opacity'><b>Solicitar Orçamento</b></h5>
                        <a href='/solicitar_orcamento' target='_blank'>Abrir</a>
                        <hr>
                    </div>

                    <div class='w3-container'>
                        <h5 class='w3-opacity'><b>Gerar Relatórios</b></h5>
                        <a href='/solicitar_relatorio' target='_blank'>Abrir</a>
                        <hr>
                    </div>
                
                </div>
                </div>
            </div>

        </body>
    </html>
    '''

    return html


@app.route('/clientes')
def get_clientes():

    clientes_ref = db.collection('usuario')
    docs_clientes = clientes_ref.stream()

    clientes = []

    # for doc in docs_clientes:
    # doc['nome'] = doc.to_dict()
    # print('{}'.format(doc['nome']))
    # clientes.append({
    #     'id':  doc.id,
    #     # doc.to_dict()
    # })

    return jsonify(clientes)


@app.route('/produtos')
def get_produtos():

    produtos_ref = db.collection('produto')

    docs_produtos = produtos_ref.stream()

    produtos = []
    for doc in docs_produtos: 

        an_array = np.array(doc.to_dict())
 
        produtos.append({
            'id':  doc.id,
            # doc: an_array
        })

    return jsonify(produtos)


@app.route('/pedidos')
def get_pedidos():

    pedidos_ref = db.collection('pedido')

    docs_pedidos = pedidos_ref.stream()

    pedidos = []
    for doc in docs_pedidos:
        pedidos.append({
            'id':  doc.id,
            # doc.to_dict()
        })

    return jsonify(pedidos)


@app.route('/produto')
def get_produto():

    # dbRef.collection('produto').onSnapshot(
    #     querySnapshot => {
    #         querySnapshot.forEach(doc => {
    #             data.push({
    #                 idProduto: doc.id,
    #                 // ...doc.data(),
    #                  nome: doc.data().nome,
    #                  descricao: doc.data().descricao,
    #                  preco: doc.data().preco,
    #                  categoria: doc.data().categoria,
    #                  imagem: doc.data().imagem,

    #                 //  nome: doc.data().Name,
    #                 // descricao: doc.data().Description,
    #                 // preco: doc.data().Price,
    #                 // categoria: doc.data().Type,
    #                 // imagem: doc.data().Image,
    #             })
    #         })
    #         return response.json(data)
    #     }

    return 'produto.'


de = 'projetointegrador500@gmail.com'
para = ['projetointegrador500+orcamento@gmail.com']
assunto = 'Proposta de Orçamento'

mensagem_orcamento = f'''
    <p>Bom dia!</p>
    <br />
    <p>Conforme solicitado, envio orçamento para contratação mensal do sistema Padaria Delivery</p>
    <br />
    <h2>Os itens inclusos em resumos são: </h2>
    <p>Sistema Web</p>
    <p>Aplicativo</p>
    <p>Suporte técnico especializado</p>
    <p>Valor contratação mensal: <strong>R$ 99,99</strong></p>
    <br /><br />
    <p>Qualquer dúvida estamos à disposição</p>
    <h4>Atenciosamente </h4>
    <h4>Equipe Padaria Delivery</h4>
'''


@app.route('/solicitar_orcamento', methods=['POST'])
def enviar_email():
    # configurar_email()

    dados = json.loads(request.data)
    print(dados)

    # CRIAÇÃO DA MENSAGEM DE EMAIL
    msg = MIMEMultipart()
    msg['From'] = de
    msg['To'] = ', '.join(para)
    msg['Subject'] = assunto

    msg.attach(MIMEText(mensagem_orcamento, 'html', 'utf-8'))
    raw = msg.as_string()
    host = 'smtp.gmail.com'  # config[0]
    port = 465  # config[1]
    user = 'projetointegrador500@gmail.com'  # config[2]
    password = 'qwe102030'  # config[3]

    smtp = smtplib.SMTP_SSL(host, port)
    smtp.login(user, password)
    smtp.sendmail(de, para, raw)
    smtp.quit()

    return jsonify({'mensagem': 'Email enviado com sucesso', 'status': 200})


# @app.route('/solicitar_relatorio')
# def enviar_relatorio():

#     # tabelaProdutos = pd.read_json('/produtos')
#     # tabelaClientes = pd.read_json('/clientes')
#     # tabelaPedidos = pd.read_json('/pedidos')

#     # display(tabelaClientes)

#     return 'tabelaClientes'


if __name__ == '__main__':
    app.run()
