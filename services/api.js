import axios from 'axios';

const API_BASE = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page = 1, name = '') => {
  const params = { page };
  if (name) params.name = name;

  const response = await axios.get(`${API_BASE}/character`, { params });
  return response.data; // { info: { next, prev, ... }, results: [...] }
};

export const fetchCharacterById = async (id) => {
  const response = await axios.get(`${API_BASE}/character/${id}`);
  return response.data;
};