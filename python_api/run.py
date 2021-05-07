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

    for doc in docs_clientes:

        doc_convertido = doc.to_dict()

        # ADICIONANDO AO ARRAY
        clientes.append({
            'id':  doc.id,
            'nome': doc_convertido['nome'],
            'telefone': doc_convertido['telefone'],
            'email': doc_convertido['email'],
            'endereco': doc_convertido['endereco'],
        })

    return jsonify(clientes)


@app.route('/produtos')
def get_produtos():

    produtos_ref = db.collection('produtos')

    docs_produtos = produtos_ref.stream()

    produtos = []

    for doc in docs_produtos:

        # CONVERTER EM DICIONARIO
        doc_convertido = doc.to_dict()

        # ADICIONANDO AO ARRAY
        produtos.append(
            {
                'id':  doc.id,
                'nome': doc_convertido['Name'],
                'descricao': doc_convertido['Description'],
                'preco': doc_convertido['Price'],
                'categoria': doc_convertido['Type'],
                'imagem': doc_convertido['Image']
            }
        )

    return jsonify(produtos)


@app.route('/pedidos')
def get_pedidos():

    pedidos_ref = db.collection('pedido')

    docs_pedidos = pedidos_ref.stream()

    print(docs_pedidos)

    pedidos = []

    for doc in docs_pedidos:

        # CONVERTER EM DICIONARIO
        doc_convertido = doc.to_dict()

        # ADICIONANDO AO ARRAY
        pedidos.append(
            {
                'id':  doc.id,
                'data': doc_convertido['data'],
                'finalizado': doc_convertido['finalizado'],
                'formaPagamento': doc_convertido['formaPagamento'],
                'idCliente': doc_convertido['idCliente'],
                'itens': doc_convertido['itens'],
                'observacao': doc_convertido['observacao'],
            }
        )

    # return 'docs_pedidos'
    return jsonify(pedidos)


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



@app.route('/solicitar_relatorio')
def enviar_relatorio():

    # tabelaProdutos = pd.read_json('/produtos')
    # tabelaClientes = pd.read_json('/clientes')
    # tabelaPedidos = pd.read_json('/pedidos')

#     # display(tabelaClientes)

    return 'Em desenvolvimento'


if __name__ == '__main__':
    app.run()
    panda()
