import React, { createContext, useContext, useEffect, useState } from 'react'
import { get } from '../lib/storage'

interface AutenticacaoContextData {
    usuario: string
}

export const AutenticacaoContext = createContext({} as AutenticacaoContextData)


export function AutenticacaoProvider({ children }: any) {
    const [usuario, setUsuario] = useState<string>('')

    const buscarUsuario = async () => {
        const response = await get('idUsuario')
        setUsuario(String(response))
    }

    useEffect(() => {
        buscarUsuario()
    }, [])

    // Para o context ter acesso a todas as funções
    return (
        <AutenticacaoContext.Provider value={{ usuario }}>
            {children}
        </AutenticacaoContext.Provider>
    )
}

export function useAutenticacao() {

    const context = useContext(AutenticacaoContext)

    const { usuario } = context

    return { usuario }
}