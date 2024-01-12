import axios from 'axios';

const API_URL = 'http://fauques.freeboxos.fr:3000'; // URL de votre API

// GET /matches
export function getMatches() {
  return axios.get(`${API_URL}/matches`);
}

// GET /matches/:id
export function getMatch(id) {
  return axios.get(`${API_URL}/matches/${id}`);
}

// POST /matches
export function postMatch() {
  return axios.post(`${API_URL}/matches`);
}

// POST /matches/:id/turns/:idTurn
export function postTurn(id, idTurn, move) {
  return axios.post(`${API_URL}/matches/${id}/turns/${idTurn}`, {
    move: move
  });
}