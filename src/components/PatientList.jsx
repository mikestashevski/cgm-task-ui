import React from 'react';

function PatientList({patients, onSelect}) {
    return (
        <div>
            <h2>Patients</h2>
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id} onClick={() => onSelect(patient)}>
                        <p>Name: {patient.name}</p>
                        <p>Surname: {patient.surname}</p>
                        <p>Date of Birth: {patient.dateOfBirth}</p>
                        <p>Social Security Number: {patient.socialSecurityNumber}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PatientList;
