import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/drools',
});

export const fetchFiles = () =>
    api.get('/files').then(res => res.data);

export const fetchFileContent = name =>
    api.get(`/files/${name}`).then(res => res.data);

export const saveFileContent = (name, content) =>
    api.post(`/files/${name}`, content, {
        headers: { 'Content-Type': 'text/plain' },
    });
