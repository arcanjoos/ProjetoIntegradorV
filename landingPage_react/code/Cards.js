import React from 'react'
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
  return (
    <div className="cards">
      <h1>Algumas funcionalidades do nosso sistema!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <div className="cards__items">
           <CardItem
            src="images/web3.jpg"
            text="Cadastre seu comércio adicionando sua logo personalizada e tambem seu banner."
            label='Web'
            path='servicos'
            />
             <CardItem
            src="images/web2.jpg"
            text="Tenha um maior controle a partir da tela gerenciar pedidos."
            label='Web'
            path='servicos'
            />
          </div>
          <div className="cards__items">
           <CardItem
            src="images/app1.jpg"
            text="Faça login em seu smartphone e realize pedidos a qualquer momento."
            label='App'
            path='servicos'
            />
            </div>
            <div className="cards__items">
             <CardItem
            src="images/app2.jpg"
            text="Personalize seu pedido adicionando uma observação ou optando pela forma de pagamento."
            label='App'
            path='servicos'
            />
            </div>
            <div className="cards__items">
           <CardItem
           
            src="images/app3.jpg"
            text="Crie endereços personalizados de entrega."
            label='App'
            path='servicos'
            />
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
