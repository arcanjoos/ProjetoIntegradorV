import { Injectable } from '@angular/core';
import  axios  from  'axios';

@Injectable({
  providedIn: 'root'
})
export class NotifyAPIService {

  constructor() { }
  async chamarAPI(newStatus: boolean) {
    const api = axios.create({
      baseURL: 'https://onesignal.com/api/v1',
      headers: {
        "Authorization": "Basic MzczZjhhZWUtNWY5NC00ZmVmLThkZTMtZjFmZmIyZDBiYjI0",
        "Content-Type": "application/json"
      }
    })

    const data = {
      "app_id": "9e0b97f6-b531-4e0b-8296-c7f3617ced15", // PEGA DO ONE SIGNAL
      "included_segments": ["Subscribed Users"], // CATEGORIA DE PESSOAS QUE VÃO RECEBER NOTIFICACAO
      // "include_player_ids": ["1046e56c-66d3-4c19-a177-3858e6f1136c", "ccc49d72-5111-43e8-a89b-eb866e9868f3"], // PESSOAS QUE VÃO RECEBER NOTIFICACAO
      "contents": { "en": "Descrição da mensagem FRONTEND" }, // CORPO DA NOTIFICACAO
      "headings": { "en": "Titulo da mensagem FRONTEND" } // TITULO DA NOTIFICACÃO
    }

    const res = await api.get('/players?app_id=9e0b97f6-b531-4e0b-8296-c7f3617ced15&limit=300&offset=0')

    if (newStatus === true) {
      const response = await api.post('/notifications', data)

      if (response.status == 200) {
        alert('Notificação enviada com sucesso')
      }
    }
  }
}
