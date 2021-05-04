from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.mime.base import MIMEBase
from email.mime.audio import MIMEAudio
from email import encoders
import smtplib
import os
import mimetypes
import pandas as pd

# ANÁLISE DE DADOS
# IMPORTAÇÃO DAS BASES DE DADOS
tabelaProdutos = pd.read_json(r'http://localhost:3333/produtos')
tabelaClientes = pd.read_json(r'http://localhost:3333/clientes')
tabelaPedidos = pd.read_json(r'http://localhost:3333/pedidos')

# TRATAMENTO DOS DADOS
# TRATAMENTO TABELA DE PRODUTOS
tabelaProdutos = tabelaProdutos.drop('idProduto', axis=1)
tabelaProduto = tabelaProdutos.drop('imagem', axis=1)

# TRATAMENTO TABELA DE CLIENTES
tabelaCliente = tabelaClientes.drop('idCliente', axis=1)

# #
# TRATAMENTO TABELA DE PEDIDOS
tabelaPedidos = tabelaPedidos.drop('idPedido', axis=1)
tabelaPedido = tabelaPedidos.drop('idCliente', axis=1)

# ANALISE DE DADOS
# CALCULANDO QUNATIDADE DE ITENS EM CADA TABELA
quantidadeClientesCadastrados = tabelaCliente['nome'].count()
quantidadeProdutosCadastrados = tabelaProduto['nome'].count()
quantidadePedidosRealizados = tabelaPedido.loc[tabelaPedido['finalizado'] == True].count()
quantidadePedidosFinalizados = tabelaPedido['finalizado'].count()

# Calculando valor total vendido
totalPedidos = tabelaPedido['total'].sum()

# EXPORTAÇÃO DA PLANILHA
tabelaProduto.to_excel('relatorios/tabelaProdutos.xlsx', index=False)
tabelaCliente.to_excel('relatorios/tabelaClientes.xlsx', index=False)
tabelaPedido.to_excel('relatorios/tabelaPedidos.xlsx', index=False)
# ENVIO POR EMAIL
# CONEXÃO COM SERVIDOR

# FUNÇÃO RESPONSÁVEL POR ANEXAR OS ARQUIVOS


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


# IMPORTANDO CONFIGURAÇÕES DE EMAIL
# LER ARQUIVO
arquivo = open('./.env', 'r')
config = []


def enviar_relatorio():

    # ARMAZENAR EM VARIAVEL
    for linha in arquivo:
        linha = linha.strip()
        config.append(linha)

    host = 'smtp.gmail.com' #config[0]
    port = 465 #config[1]
    user = 'projetointegrador500@gmail.com' #config[2]
    password = 'qwe102030' #config[3]

    msg = MIMEMultipart()

    # CRIAÇÃO DA MENSAGEM DE EMAIL
    de = 'projetointegrador500@gmail.com'
    para = ['projetointegrador500+500@gmail.com']
    assunto = 'Relatório de Vendas Diárias'

    #
    msg['From'] = de
    msg['To'] = ', '.join(para)
    msg['Subject'] = assunto

    textoEmail = f'''
            <p>Prezados Diretores,</p>
            <p>Bom dia!</p>

            <br />
            <p>Conforme solicitado, envio em anexo planilhas com produtos, pedidos e clientes.</p>

            <br />
            <h2>Os números em resumos são: </h2>
            <p>Total de clientes cadastrados: <strong>{quantidadeClientesCadastrados}</strong></p>
            <p>Total de produtos cadastrados: <strong>{quantidadeProdutosCadastrados}</strong></p>
            <p>Quantidade de pedidos finalizados: <strong>{quantidadePedidosFinalizados}</strong></p>
            <p>Valor total vendido: <strong>{totalPedidos}</strong></p>
            <br /><br />
            <p>Qualquer dúvida estamos à disposição</p>
            <h4>Atenciosamente </h4>
            <h4>Equipe Padaria Delivery</h4>
    '''

    msg.attach(MIMEText(textoEmail, 'html', 'utf-8'))

    # # ADICIONAR ARQUIVOS ANEXOS
    adiciona_anexo(msg, 'relatorios/tabelaClientes.xlsx')
    adiciona_anexo(msg, 'relatorios/tabelaProdutos.xlsx')
    adiciona_anexo(msg, 'relatorios/tabelaPedidos.xlsx')

    raw = msg.as_string()

    smtp = smtplib.SMTP_SSL(host, port)
    smtp.login(user, password)
    smtp.sendmail(de, para, raw)
    smtp.quit()

enviar_relatorio()
# FINALIZADO COM SUCESSO 
print('Email enviado com sucesso')
