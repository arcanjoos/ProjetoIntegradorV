import firebase from './../services/firebaseConection'
const dbRef = firebase.firestore()

export default (request, response) => {
  const data = []
  dbRef.collection('produto').onSnapshot(
    querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push({
          idProduto: doc.id,
          // ...doc.data(),
          nome: doc.data().nome,
          descricao: doc.data().descricao,
          preco: doc.data().preco,
          categoria: doc.data().categoria,
          imagem: doc.data().imagem,

          //  nome: doc.data().Name,
          // descricao: doc.data().Description,
          // preco: doc.data().Price,
          // categoria: doc.data().Type, 
          // imagem: doc.data().Image,
        })
      })
      return response.json(data)
    }
  )
}