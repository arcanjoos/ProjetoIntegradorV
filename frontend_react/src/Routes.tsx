import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard';
import Clientes from './pages/Clientes/Dashboard';
import Produtos from './pages/Produtos/Dashboard';
import Pedidos from './pages/Pedidos/Dashboard';

import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/clientes' exact component={Clientes} />
        <Route path='/produtos' exact component={Produtos} />
        <Route path='/pedidos' exact component={Pedidos} />

      </Switch>
    </BrowserRouter>
  )
}

export default App;