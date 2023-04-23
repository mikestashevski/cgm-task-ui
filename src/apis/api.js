import CryptoJS from 'crypto-js';

const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
};

export const loadVisits = async (selectedPatientId, credentials) => {
    const response = await fetch(`http://localhost:8080/api/patients/${selectedPatientId}/visits`, {
        headers: {
            'Authorization': `Basic ${credentials.username}:${hashPassword(credentials.password)}`,
        },
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to load visits');
    }
};

export const createVisit = async (selectedPatientId, visit, credentials) => {
    const response = await fetch(`http://localhost:8080/api/patients/${selectedPatientId}/visits`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${credentials.username}:${hashPassword(credentials.password)}`,
        },
        body: JSON.stringify(visit),
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to create visit');
    }
};

export const loadPatients = async (credentials) => {
    const response = await fetch('http://localhost:8080/api/patients', {
        headers: {
            'Authorization': `Basic ${credentials.username}:${hashPassword(credentials.password)}`,
        },
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to load patients');
    }
};

export const updateVisit = async (selectedPatientId, updatedVisit, credentials) => {
    const response = await fetch(`http://localhost:8080/api/patients/${selectedPatientId}/visits/${updatedVisit.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${credentials.username}:${hashPassword(credentials.password)}`,
        },
        body: JSON.stringify(updatedVisit),
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to update visit');
    }
};