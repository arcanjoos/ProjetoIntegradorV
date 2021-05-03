import axios from 'axios'

const api = axios.create({
    baseURL: 'https://onesignal.com/api/v1',
    headers: {
        "Authorization": "Basic MzczZjhhZWUtNWY5NC00ZmVmLThkZTMtZjFmZmIyZDBiYjI0",
        "Content-Type": "application/json"
    }
})

export default api