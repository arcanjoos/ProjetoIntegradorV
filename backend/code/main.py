# IMPORTAÇÃO DO FIREBASE
import json
import mimetypes
# PARA ACESSAR PASTAS DO COMPUTADOR
import os
import smtplib
from email import encoders
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
# ENVIO POR EMAIL
from email.mime.text import MIMEText

import firebase_admin
import numpy as np
# ANALISE DE TABELAS
import pandas as pd
import requests
from firebase_admin import credentials, firestore
# FERRAMENTAS PARA API (TIPO EXPRESS E JSON STRINGFY EM NODE)
from flask import Flask, jsonify, request
from flask_cors import CORS
from imutils import paths


# 'INICIANDO API'
app = Flask(__name__)
CORS(app)
# CONFIGURAÇÕES FIREBASE
cred = credentials.Certificate('firebase-sdk.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


@app.route('/')
def hello():
    rotas = {
        '/api/clientes': '/api/clientes',
        '/api/produtos': '/api/produtos',
        '/api/pedidos': '/api/pedidos',
        '/api/mensagens': '/api/mensagens',
        '/api/mensagens/:id': '/api/mensagens/:id',
        '/api/enviar-email': '/api/enviar-email/tipo',
        '/api/solicitar-relatorio': '/api/solicitar-relatorio/tipo'
    }

    return jsonify(rotas)


@ app.route('/api/clientes')
def get_clientes():

    clientes_ref = db.collection('usuario')
    docs_clientes = clientes_ref.stream()

    clientes = []
    # endereco_entrega = []

    for doc in docs_clientes:
        doc_convertido = doc.to_dict()

        doc_endereco = doc_convertido['endereco']

        for endereco in doc_endereco:
            # PARA MOSTRAR APENAS OS ENDERECOS DE ENTREGA
            if (endereco['entrega'] == True):
                endereco_entrega = endereco

                # ADICIONANDO AO ARRAY
                clientes.append({
                    'idCliente':  doc.id,
                    'nome': doc_convertido['nome'],
                    'telefone': doc_convertido['telefone'],
                    'email': doc_convertido['email'],
                    # 'endereco': endereco_entrega,
                    'logradouro': endereco['logradouro'],
                    'numero': endereco['numero'],
                    'complemento': endereco['complemento'],
                    'bairro': endereco['bairro'],
                    'cidade': endereco['cidade'],
                    'estado': endereco['estado'],

                })

    return jsonify(clientes)


@ app.route('/api/produtos')
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
                'idProduto':  doc.id,
                'nome': doc_convertido['Name'],
                'descricao': doc_convertido['Description'],
                'preco': doc_convertido['Price'],
                'categoria': doc_convertido['Type'],
                'imagem': doc_convertido['Image']
            }
        )

    return jsonify(produtos)


@ app.route('/api/pedidos')
def get_pedidos():

    pedidos_ref = db.collection('pedido')

    docs_pedidos = pedidos_ref.stream()

    print(docs_pedidos)

    pedidos = [ ]
 

    for doc in docs_pedidos:
        # CONVERTER EM DICIONARIO
        doc_convertido = doc.to_dict()
        
        # ALTERAR O TEXTO DA TABELA 
        finalizado = ''
        if (doc_convertido['finalizado'] == True):
            finalizado = 'Sim'
        else:
            finalizado = 'Não'

        for item in doc_convertido['itens']:

         
            pedidos.append({   
                    # 'codigoPedido': contador,
                    'idPedido':  doc.id,
                    'data': doc_convertido['data'],
                    'finalizado': finalizado,
                    'formaPagamento': doc_convertido['formaPagamento'],
                    'idCliente': doc_convertido['idCliente'],
                    'idProduto': item['id'],
                    'nome': item['nome'],
                    'quantidade': item['quantidade'],
                    'preco': item['preco'],
                    'observacao': doc_convertido['observacao'],
            })

    # return 'docs_pedidos'
    return jsonify(pedidos)


@ app.route('/api/mensagens')
def get_mensagens():

    mensagens_ref = db.collection('mensagens')

    docs_mensagens = mensagens_ref.stream()

    mensagens = []

    for doc in docs_mensagens:

        # CONVERTER EM DICIONARIO
        doc_convertido = doc.to_dict()

        # ADICIONANDO AO ARRAY
        mensagens.append(
            {
                'idMensagem':  doc.id,
                'assunto': doc_convertido['assunto'],
                'mensagem': doc_convertido['mensagem']
            }
        )

    return jsonify(mensagens)


@ app.route('/api/mensagens/<id>')
def get_mensagem_por_id(id):

    mensagens_ref = db.collection('mensagens')  # .where()

    docs_mensagens = mensagens_ref.stream()

    mensagens = []

    for doc in docs_mensagens:

        # CONVERTER EM DICIONARIO
        doc_convertido = doc.to_dict()

        # ADICIONANDO AO ARRAY
        if(id == doc.id):

            mensagens.append(
                {
                    'idMensagem':  doc.id,
                    'assunto': doc_convertido['assunto'],
                    'mensagem': doc_convertido['mensagem']
                }
            )

    return jsonify(mensagens)
 
def adiciona_anexo(msg, filename):
    if not os.path.isfile(filename):
        return

    ctype, encoding = mimetypes.guess_type(filename)

    if ctype is None or encoding is not None:
        ctype = 'application/octet-stream'

    maintype, subtype = ctype.split('/', 1)

    if maintype == 'text':
        with open(filename) as f:
            mime = MIMEText(f.read(), _subtype=subtype)
    elif maintype == 'image':
        with open(filename, 'rb') as f:
            mime = MIMEImage(f.read(), _subtype=subtype)
    elif maintype == 'audio':
        with open(filename, 'rb') as f:
            mime = MIMEAudio(f.read(), _subtype=subtype)
    else:
        with open(filename, 'rb') as f:
            mime = MIMEBase(maintype, subtype)
            mime.set_payload(f.read())

        encoders.encode_base64(mime)

    mime.add_header('Content-Disposition', 'attachment', filename=filename)
    msg.attach(mime)

@app.route('/api/enviar-email/', methods=['POST'])
def enviar_email():

    # DADOS PARA CONEXAO COM O SERVIDOR
    usuario = ''
    senha = ''
    porta = ''
    host = ''

    # DADOS ENVIO MENSAGEM
    nome = ''
    remetente = ''
    destinatario = ''
    assunto = ''
    mensagem = ''
    anexo = ''

    dados = json.loads(request.data)

    # DADOS PARA CONEXAO COM O SERVIDOR
    usuario = dados['usuario']
    senha = dados['senha']
    porta = dados['porta']
    host = dados['host']

    # DADOS ENVIO MENSAGEM
    nome = dados['nome']
    remetente = dados['remetente']
    destinatario = dados['destinatario']
    assunto = dados['assunto']
    mensagem = dados['mensagem']
    anexo = dados['anexo']

    # VALIDAÇÕES BÁSICAS DOS CAMPOS

    if (anexo == '' or anexo == None):
        anexo = False
        return anexo

    if (host == '' or host == None):
        mensagem_erro = {'mensagem': 'Campo host é obrigatório', 'status': 404}
        return jsonify(mensagem_erro)

    if (porta == '' or porta == None):
        mensagem_erro = {
            'mensagem': 'Campo porta é obrigatório', 'status': 404}
        return jsonify(mensagem_erro)

    if ((usuario == '' and remetente == '') or (usuario == None and remetente == None)):
        mensagem_erro = {
            'mensagem': 'Campo usuário é obrigatório', 'status': 404}
        return jsonify(mensagem_erro)

    if (senha == '' or senha == None):
        mensagem_erro = {
            'mensagem': 'Campo senha é obrigatório', 'status': 404}
        return jsonify(mensagem_erro)

    if (assunto == '' or assunto == None):
        mensagem_erro = {
            'mensagem': 'Campo assunto é obrigatório', 'status': 404}
        return jsonify(mensagem_erro)

    # SELECIONANDO MENSAGEM A SER ENVIADA
    mensagem_email = mensagem
 
    # CRIAÇÃO DA MENSAGEM DE EMAIL
    msg = MIMEMultipart()
    msg['From'] = remetente
    msg['To'] = ', '.join(destinatario)
    msg['Subject'] = assunto

    msg.attach(MIMEText(mensagem_email, 'html', 'utf-8'))

    raw = msg.as_string()
  
    # ENVIO PROPRIAMENTE DITO DO EMAIL
    smtp = smtplib.SMTP_SSL(host, porta)
    smtp.login(usuario, senha)
    smtp.sendmail(remetente, destinatario, raw)
    smtp.quit()

    return jsonify({'mensagem': 'Email enviado com sucesso', 'status': 200})


@app.route('/api/gerar-relatorio/<tipo>', methods=['POST'])
def enviar_relatorio(tipo):
    # DADOS PARA CONEXAO COM O SERVIDOR
    usuario = ''
    senha = ''
    porta = ''
    host = ''
    enviar = ''

    # DADOS ENVIO MENSAGEM
    nome = ''
    remetente = ''
    destinatario = ''
    assunto = ''
    mensagem = ''
    anexo = ''

    dados = json.loads(request.data)

    # DADOS PARA CONEXAO COM O SERVIDOR
    usuario = dados['usuario']
    senha = dados['senha']
    porta = dados['porta']
    host = dados['host']

    # DADOS ENVIO MENSAGEM
    nome = dados['nome']
    remetente = dados['remetente']
    destinatario = dados['destinatario']
    assunto = dados['assunto']
    mensagem = dados['mensagem']
    anexo = dados['anexo']
    enviar = dados['enviar']


    msg = MIMEMultipart() 
    msg['From'] = remetente
    msg['To'] = ', '.join(destinatario)
    msg['Subject'] = assunto
    
    # SELECIONANDO MENSAGEM A SER ENVIADA
    mensagem_email = mensagem

    msg.attach(MIMEText(mensagem_email, 'html', 'utf-8'))
    # VALIDAÇÕES BÁSICAS DOS CAMPOS
   

    if (anexo == '' or anexo == None):
        anexo = False
        return anexo

    if (host == '' or host == None):
        mensagem_erro = {'mensagem': 'Campo host é obrigatório', 'status': 404}
        return jsonify(mensagem_erro)

    if (porta == '' or porta == None):
        mensagem_erro = {
            'mensagem': 'Campo porta é obrigatório', 'status': 404}
        return jsonify(mensagem_erro)

    if ((usuario == '' and remetente == '') or (usuario == None and remetente == None)):
        mensagem_erro = {
            'mensagem': 'Campo usuário é obrigatório', 'status': 404}
        return jsonify(mensagem_erro)

    if (senha == '' or senha == None):
        mensagem_erro = {
            'mensagem': 'Campo senha é obrigatório', 'status': 404}
        return jsonify(mensagem_erro)

    if (assunto == '' or assunto == None):
        mensagem_erro = {
            'mensagem': 'Campo assunto é obrigatório', 'status': 404}
        return jsonify(mensagem_erro)


    if(tipo == 'clientes'): 
        # IMPORTAÇÃO DAS BASES DE DADOS
        tabelaClientes = pd.read_json(r'http://localhost:8080/api/clientes')

        # TRATAMENTO TABELA DE CLIENTES
        tabelaClientes = tabelaClientes.drop('idCliente', axis=1)
 
        # ANALISE DE DADOS
        # CALCULANDO QUNATIDADE DE ITENS EM CADA TABELA
        quantidadeClientesCadastrados = tabelaClientes['nome'].count() 

        tabelaClientes.to_excel('./anexos/tabelaClientes.xlsx', index=False)


        if(enviar == True):
            # ADICIONAR ARQUIVOS ANEXOS
            adiciona_anexo(msg, 'anexos/tabelaClientes.xlsx')  

    if(tipo == 'produtos'): 
        # IMPORTAÇÃO DAS BASES DE DADOS
        tabelaProdutos = pd.read_json(r'http://localhost:8080/api/produtos')
 
        # TRATAMENTO TABELA DE PRODUTOS
        tabelaProdutos = tabelaProdutos.drop('idProduto', axis=1)
        tabelaProdutos = tabelaProdutos.drop('imagem', axis=1)

        # ANALISE DE DADOS
        # CALCULANDO QUNATIDADE DE ITENS EM CADA TABELA
        quantidadeProdutosCadastrados = tabelaProdutos['nome'].count() 
 
        # EXPORTAÇÃO DA PLANILHA
        tabelaProdutos.to_excel('./anexos/tabelaProdutos.xlsx', index=False)


        if(enviar == True):
            # ADICIONAR ARQUIVOS ANEXOS 
            adiciona_anexo(msg, 'tabelaProdutos.xlsx') 

    if(tipo == 'pedidos'): 
        # IMPORTAÇÃO DAS BASES DE DADOS
        tabelaClientes = pd.read_json(r'http://localhost:8080/api/clientes')
        tabelaProdutos = pd.read_json(r'http://localhost:8080/api/produtos')
        tabelaPedidos = pd.read_json(r'http://localhost:8080/api/pedidos')    
 
        # TRATAMENTO DOS DADOS
        # TRATAMENTO TABELA DE PRODUTOS
        tabelaProdutos = tabelaProdutos.drop('idProduto', axis=1)
        tabelaProdutos = tabelaProdutos.drop('imagem', axis=1)

        # TRATAMENTO TABELA DE CLIENTES
        tabelaClientes = tabelaClientes.drop('idCliente', axis=1)

        # TRATAMENTO TABELA DE PEDIDOS
        tabelaPedidos = tabelaPedidos.drop('idPedido', axis=1)
        tabelaPedidos = tabelaPedidos.drop('idCliente', axis=1)

        # ANALISE DE DADOS
        # CALCULANDO QUNATIDADE DE ITENS EM CADA TABELA
        quantidadeClientesCadastrados = tabelaClientes['nome'].count()
        quantidadeProdutosCadastrados = tabelaProdutos['nome'].count()
        quantidadePedidosRealizados = tabelaPedidos.loc[tabelaPedidos['finalizado'] == True].count()
    
        tabelaClientes.to_excel('./anexos/tabelaClientes.xlsx', index=False)
        tabelaProdutos.to_excel('./anexos/tabelaProdutos.xlsx', index=False)
        tabelaPedidos.to_excel('./anexos/tabelaPedidos.xlsx', index=False)



        if(enviar == True):

            adiciona_anexo(msg, 'tabelaProdutos.xlsx')
            # adiciona_anexo(msg, 'anexos/tabelaPedidos.xlsx')   

    raw = msg.as_string()

    if(enviar == True and anexo == True ):
        # ENVIO PROPRIAMENTE DITO DO EMAIL
        smtp = smtplib.SMTP_SSL(host, porta)
        smtp.login(usuario, senha)
        smtp.sendmail(remetente, destinatario, raw)
        smtp.quit()
    
        return jsonify({'mensagem': 'Relatório enviado por email', 'status': 200})

    else : 
        return jsonify({'mensagem': 'Relatório salvo com sucesso', 'status': 200})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)