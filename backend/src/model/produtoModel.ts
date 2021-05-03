import firebase from './../services/firebaseConection'
const dbRef = firebase.firestore()

export const getProdutos = async () => {

    const data = [] as any
    await dbRef.collection('produtos').onSnapshot(
        querySnapshot => {
            querySnapshot.forEach(doc => {
                data.push({
                    id: doc.id,
                    nome: doc.data().Name,
                    descricao: doc.data().Description,
                    preco: doc.data().Price,
                    imagem: doc.data().Image,
                    categoria: doc.data().Type,
                })
            })
            return data
        }
    )
}