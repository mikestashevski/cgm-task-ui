import React, {useState} from 'react';

function VisitList({visits, onCreateVisit, onUpdateVisit}) {
    const [visitType, setVisitType] = useState('');
    const [visitReason, setVisitReason] = useState('');
    const [familyHistory, setFamilyHistory] = useState('');

    const handleCreateVisit = () => {
        onCreateVisit({visitType, visitReason, familyHistory});
    };

    const handleUpdateVisit = (visit) => {
        onUpdateVisit(visit);
    };

    return (
        <div>
            <h2>Visits</h2>
            <form>
                <label>
                    Type of visit:
                    <select value={visitType} onChange={(e) => setVisitType(e.target.value)}>
                        <option value="">Select visit type</option>
                        <option value="home">At home</option>
                        <option value="doctor_office">At the doctor's office</option>
                    </select>
                </label>
                <label>
                    Reason for visit:
                    <select value={visitReason} onChange={(e) => setVisitReason(e.target.value)}>
                        <option value="">Select visit reason</option>
                        <option value="first_visit">First visit</option>
                        <option value="recurring_visit">Recurring visit</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </label>
                <label>
                    Family history:
                    <textarea value={familyHistory} onChange={(e) => setFamilyHistory(e.target.value)}/>
                </label>
                <button type="button" onClick={handleCreateVisit}>Create Visit</button>
            </form>
            <ul>
                {visits.map((visit) => (
                    <li key={visit.id}>
                        <div>
                            <p>Date and Time: {visit.dateTime}</p>
                            <p>Type: {visit.visitType}</p>
                            <p>Reason: {visit.visitReason}</p>
                            <p>Family history: {visit.familyHistory}</p>
                            <button onClick={() => handleUpdateVisit(visit)}>Update Visit</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default VisitList;
