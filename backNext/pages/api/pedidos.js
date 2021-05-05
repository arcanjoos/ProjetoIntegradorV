import firebase from './../services/firebaseConection'
import { format } from 'date-fns'
const dbRef = firebase.firestore()

export default (request, response) => {

  const data = []
  const filtered = []

  dbRef.collection('pedido').onSnapshot(
    querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push({
          idPedido: doc.id,
          idCliente: doc.data().idCliente,
          formaPagamento: doc.data().formaPagamento,
          finalizado: doc.data().finalizado,
          data: doc.data().data,

          ...doc.data(),
        })
      })

      data.map((i) => {

        const data = format(new Date(i.data.seconds * 1000), 'dd/MM/yyyy')
        const hora = format(new Date(i.data.seconds * 1000), 'HH:mm')

        // CALCULAR VALOR TOTAL DA COMPRA
        let total = 0
        i.itens.map((item) => {
          total = item.preco * item.quantidade + total
        })

        let object = {
          idPedido: i.idPedido,
          idCliente: i.idCliente,
          formaPagamento: i.formaPagamento,
          // itens: i.itens,
          data: data,
          hora: hora,
          total: total,
          finalizado: i.finalizado,
        }

        filtered.push(object)
      })

      return response.json(filtered)
    }
  )
}