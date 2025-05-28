import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FileList({ onSelect }) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/drools/files')
            .then(res => setFiles(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <ul className="file-list">
            {files.map(name =>
                <li key={name}>
                    <button onClick={() => onSelect(name)}>{name}</button>
                </li>
            )}
        </ul>
    );
}
