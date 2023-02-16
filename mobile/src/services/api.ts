import axios from 'axios';

// No android nao funciona o local host, temos que usar o ip fixo da nossa maquina
export const api = axios.create({
    baseURL: 'http://192.168.15.25:3333'
});