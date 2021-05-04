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

# CONEXÃO COM SERVIDOR

# IMPORTANDO CONFIGURAÇÕES DE EMAIL
# LER ARQUIVO


def enviar_email():
    arquivo = open('./.env', 'r')
    config = []

    # ARMAZENAR EM VARIAVEL
    for linha in arquivo:
        linha = linha.strip()
        config.append(linha)

    host = config[0]
    port = config[1]
    user = config[2]
    password = config[3]

    # CRIAÇÃO DA MENSAGEM DE EMAIL
    de = 'projetointegrador500@gmail.com'
    para = ['projetointegrador500+orcamento@gmail.com']
    assunto = 'Proposta de Orçamento'

    msg = MIMEMultipart()

    msg['From'] = de
    msg['To'] = ', '.join(para)
    msg['Subject'] = assunto

    textoEmail = f'''
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

    msg.attach(MIMEText(textoEmail, 'html', 'utf-8'))

    raw = msg.as_string()

    smtp = smtplib.SMTP_SSL(host, port)
    smtp.login(user, password)
    smtp.sendmail(de, para, raw)
    smtp.quit()


enviar_email()
# FINALIZADO COM SUCESSO
print('Email enviado com sucesso')
