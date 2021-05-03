import React, {useState} from 'react'
import { Inicio } from './pages/Inicio';
import Routes from './routes'

export default function App() {
    /*const[user, setUser] = useState(null);

    const actionLoginDataGoogle = (u) =>{
        let newUser ={
            id: u.id,
            name: u.displayName,
            avatar: u.photoURL
        }
    }
    if(user == null){
    //   return(<Inicio onReceiveGoogle={actionLoginDataGoogle} /> );
    }
   */
    return (
        <Routes />
    )
}