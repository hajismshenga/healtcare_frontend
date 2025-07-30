import React, { useState } from 'react';
import './styles/LaboratoryStyles.css';

const initialReceived = [
  {
    id: 1,
    patientName: 'Alice Johnson',
    testName: 'CBC',
    date: '2025-07-30',
    status: 'Pending',
  },
  {
    id: 2,
    patientName: 'Bob Smith',
    testName: 'Blood Sugar',
    date: '2025-07-29',
    status: 'Pending',
  },
];

const initialSent = [
  {
    id: 1,
    patientName: 'Alice Johnson',
    result: 'Normal',
    date: '2025-07-30',
  },
];

export default function LabTestWorkflow() {
  const [tab, setTab] = useState('received');

  // Received CRUD
  const [received, setReceived] = useState(initialReceived);
  const [receivedEdit, setReceivedEdit] = useState(null);
  const [receivedForm, setReceivedForm] = useState({ patientName: '', testName: '', date: '', status: 'Pending' });

  // Sent CRUD
  const [sent, setSent] = useState(initialSent);
  const [sentEdit, setSentEdit] = useState(null);
  const [sentForm, setSentForm] = useState({ patientName: '', doctorId: '', result: '', date: '' });

  // Received handlers
  const handleReceivedAdd = () => {
    if (!receivedForm.patientName || !receivedForm.testName || !receivedForm.date) return;
    setReceived([
      ...received,
      { ...receivedForm, id: Date.now(), status: 'Pending' },
    ]);
    setReceivedForm({ patientName: '', testName: '', date: '', status: 'Pending' });
  };
  const handleReceivedEdit = (r) => setReceivedEdit(r.id);
  const handleReceivedSave = (id) => {
    setReceived(received.map(r => r.id === id ? { ...r, ...receivedForm } : r));
    setReceivedEdit(null);
    setReceivedForm({ patientName: '', testName: '', date: '', status: 'Pending' });
  };
  const handleReceivedDelete = (id) => setReceived(received.filter(r => r.id !== id));
  const handleReceivedDone = (id) => setReceived(received.map(r => r.id === id ? { ...r, status: 'Done' } : r));

  // Sent handlers
  const handleSentAdd = () => {
    if (!sentForm.patientName || !sentForm.doctorId || !sentForm.result || !sentForm.date) return;
    setSent([
      ...sent,
      { ...sentForm, id: Date.now(), sent: false },
    ]);
    setSentForm({ patientName: '', doctorId: '', result: '', date: '' });
  };
  const handleSentEdit = (r) => setSentEdit(r.id);
  const handleSentSave = (id) => {
    setSent(sent.map(r => r.id === id ? { ...r, ...sentForm } : r));
    setSentEdit(null);
    setSentForm({ patientName: '', doctorId: '', result: '', date: '' });
  };
  const handleSentSend = (id) => {
    setSent(sent.map(r => r.id === id ? { ...r, sent: true } : r));
  };
  const handleSentDelete = (id) => setSent(sent.filter(r => r.id !== id));

  return (
    <div className="lab-tests-container">
      <h2>Laboratory Workflow</h2>
      <div style={{ display: 'flex', gap: 18, marginBottom: 24 }}>
        <button className={`btn-primary${tab==='received' ? ' active' : ''}`} onClick={() => setTab('received')}>Received Tests</button>
        <button className={`btn-primary${tab==='sent' ? ' active' : ''}`} onClick={() => setTab('sent')}>Send Results</button>
      </div>
      {tab === 'received' && (
        <div>
          <h3>Received Tests</h3>
          <div className="results-table">
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Test Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {received.map(r => (
                  <tr key={r.id}>
                    {receivedEdit === r.id ? (
                      <>
                        <td><input value={receivedForm.patientName} onChange={e => setReceivedForm(f => ({ ...f, patientName: e.target.value }))} /></td>
                        <td><input value={receivedForm.testName} onChange={e => setReceivedForm(f => ({ ...f, testName: e.target.value }))} /></td>
                        <td><input type="date" value={receivedForm.date} onChange={e => setReceivedForm(f => ({ ...f, date: e.target.value }))} /></td>
                        <td>{r.status}</td>
                        <td>
                          <button className="btn-primary" onClick={() => handleReceivedSave(r.id)}>Save</button>
                          <button className="btn-secondary" onClick={() => setReceivedEdit(null)}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{r.patientName}</td>
                        <td>{r.testName}</td>
                        <td>{r.date}</td>
                        <td>{r.status}</td>
                        <td style={{ display: 'flex', gap: 6 }}>
                          {r.status !== 'Done' && <button className="btn-primary" onClick={() => handleReceivedDone(r.id)}>Done</button>}
                          <button className="btn-secondary" onClick={() => { setReceivedEdit(r.id); setReceivedForm(r); }}>Edit</button>
                          <button className="btn-danger" onClick={() => handleReceivedDelete(r.id)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab === 'sent' && (
        <div>
          <h3>Send Results</h3>
          <div style={{ marginBottom: 16 }}>
            <input type="text" placeholder="Patient Name" value={sentForm.patientName} onChange={e => setSentForm(f => ({ ...f, patientName: e.target.value }))} style={{ marginRight: 8 }} />
            <input type="text" placeholder="Doctor ID" value={sentForm.doctorId} onChange={e => setSentForm(f => ({ ...f, doctorId: e.target.value }))} style={{ marginRight: 8 }} />
            <input type="text" placeholder="Result" value={sentForm.result} onChange={e => setSentForm(f => ({ ...f, result: e.target.value }))} style={{ marginRight: 8 }} />
            <input type="date" value={sentForm.date} onChange={e => setSentForm(f => ({ ...f, date: e.target.value }))} style={{ marginRight: 8 }} />
            <button className="btn-primary" onClick={handleSentAdd}>Add</button>
          </div>
          <div className="results-table">
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Doctor ID</th>
                  <th>Result</th>
                  <th>Date</th>
                  <th>Actions</th>
                  <th>Send</th>
                </tr>
              </thead>
              <tbody>
                {sent.map(r => (
                  <tr key={r.id}>
                    {sentEdit === r.id ? (
                      <>
                        <td><input value={sentForm.patientName} onChange={e => setSentForm(f => ({ ...f, patientName: e.target.value }))} /></td>
                        <td><input value={sentForm.doctorId} onChange={e => setSentForm(f => ({ ...f, doctorId: e.target.value }))} /></td>
                        <td><input value={sentForm.result} onChange={e => setSentForm(f => ({ ...f, result: e.target.value }))} /></td>
                        <td><input type="date" value={sentForm.date} onChange={e => setSentForm(f => ({ ...f, date: e.target.value }))} /></td>
                        <td>
                          <button className="btn-primary" onClick={() => handleSentSave(r.id)}>Save</button>
                          <button className="btn-secondary" onClick={() => setSentEdit(null)}>Cancel</button>
                        </td>
                        <td></td>
                      </>
                    ) : (
                      <>
                        <td>{r.patientName}</td>
                        <td>{r.doctorId}</td>
                        <td>{r.result}</td>
                        <td>{r.date}</td>
                        <td style={{ display: 'flex', gap: 6 }}>
                          <button className="btn-secondary" onClick={() => { setSentEdit(r.id); setSentForm(r); }} disabled={r.sent}>Edit</button>
                          <button className="btn-danger" onClick={() => handleSentDelete(r.id)} disabled={r.sent}>Delete</button>
                        </td>
                        <td>
                          {r.sent ? (
                            <span style={{ color: 'green', fontWeight: 600 }}>Sent</span>
                          ) : (
                            <button className="btn-primary" onClick={() => handleSentSend(r.id)}>Send</button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
