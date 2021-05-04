import firebase from './../services/firebaseConection'
const dbRef = firebase.firestore()

export default (request, response) => {
  const data = []
  dbRef.collection('usuario').onSnapshot(
    querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push({
          idCliente: doc.id,
          nome: doc.data().nome,
          telefone: doc.data().telefone,
          email: doc.data().email,
          // ...doc.data(),
        })
      })
      return response.json(data)
    }
  )
}