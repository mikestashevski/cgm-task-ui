import React, {useState, useEffect} from 'react';
import './App.css';
import DoctorCredentials from "./components/DoctorCredentials";
import {createVisit, loadPatients, loadVisits, updateVisit} from "./apis/api";
import PatientList from "./components/PatientList";
import VisitList from "./components/VisitList";

function App() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [visits, setVisits] = useState([]);
    const [credentials, setCredentials] = useState({username: '', password: ''});

    useEffect(() => {
        if (selectedPatient && credentials.username && credentials.password) {
            loadVisits(selectedPatient.id, credentials)
                .then((data) => setVisits(data))
                .catch((error) => console.error('Error:', error));
        }
    }, [selectedPatient, credentials]);

    useEffect(() => {
        if (credentials.username && credentials.password) {
            loadPatients(credentials)
                .then((data) => setPatients(data))
                .catch((error) => console.error('Error:', error));
        }
    }, [credentials]);

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
    };

    const handleCreateVisit = async (visit) => {
        try {
            const newVisit = await createVisit(selectedPatient.id, visit, credentials);
            setVisits([...visits, newVisit]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateVisit = async (updatedVisit) => {
        try {
            const updated = await updateVisit(selectedPatient.id, updatedVisit, credentials);
            setVisits(visits.map((visit) => (visit.id === updatedVisit.id ? updated : visit)));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCredentialsChange = async (newCredentials) => {
        setCredentials(newCredentials);

        try {
            const patientsList = await loadPatients(newCredentials);
            setPatients(patientsList);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (<div className="App">
        <header className="App-header">
            <h1>Patient Management System</h1>
        </header>
        <main>
            <DoctorCredentials onCredentialsChange={handleCredentialsChange}/>
            <PatientList patients={patients} onSelect={handleSelectPatient}/>
            {selectedPatient && (
                <VisitList visits={visits} onCreateVisit={handleCreateVisit} onUpdateVisit={handleUpdateVisit}/>
            )}
        </main>
    </div>);
}

export default App;
