import axios from 'axios'

// API USADA APENAS PARA TESTE, NÃO TEM RELAÇÃO COM O PROJETO
const api = axios.create({
    baseURL: 'http://mobile-aceite.tcu.gov.br/mapa-da-saude/'
})

export default api