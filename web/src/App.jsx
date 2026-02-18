import React, { useState } from 'react';
import { createRequest } from './api.js';

const initialForm = {
  customer_name: '',
  location: '',
  note: '',
};

const initialLogin = {
  name: '',
  phone: '',
  role: 'customer',
};

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [loginError, setLoginError] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSelectRole = (role) => {
    setLoginForm((prev) => ({ ...prev, role }));
  };

  const onLoginSubmit = (event) => {
    event.preventDefault();
    const trimmedName = loginForm.name.trim();
    if (!trimmedName) {
      setLoginError('Please enter your name to continue.');
      return;
    }

    setUser({
      name: trimmedName,
      phone: loginForm.phone.trim(),
      role: loginForm.role,
    });
    setLoginError('');
    setForm((prev) => ({ ...prev, customer_name: trimmedName }));
  };

  const onLogout = () => {
    setUser(null);
    setLoginForm(initialLogin);
    setForm(initialForm);
    setStatus('');
    setLoginError('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await createRequest(form);
      console.log('Towing request response:', response);
      setStatus('Request submitted. A driver will see it shortly.');
      setForm(initialForm);
    } catch (error) {
      setStatus('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Tareeqk Car Recovery</p>
          <h1>Request a tow in minutes.</h1>
          <p className="subhead">
            Share your pickup and dropoff details and our nearest driver will respond.
          </p>
        </div>
        <div className="badge">24/7 Dispatch</div>
      </header>

      <main className="card">
        {user ? (
          <div className="account-header">
            <div className="account-info">
              <span className="account-pill">{user.role}</span>
              <div>
                <p className="account-name">{user.name}</p>
                {user.phone && <p className="account-phone">{user.phone}</p>}
              </div>
            </div>
            <button type="button" className="secondary" onClick={onLogout}>
              Sign out
            </button>
          </div>
        ) : null}

        {!user ? (
          <>
            <h2>Login</h2>
            <p className="subhead">Choose your role to continue.</p>
            <form onSubmit={onLoginSubmit} className="form login-form">
              <div className="role-toggle">
                <button
                  type="button"
                  className={loginForm.role === 'customer' ? 'role-button active' : 'role-button'}
                  onClick={() => onSelectRole('customer')}
                >
                  Customer
                </button>
                <button
                  type="button"
                  className={loginForm.role === 'driver' ? 'role-button active' : 'role-button'}
                  onClick={() => onSelectRole('driver')}
                >
                  Driver
                </button>
              </div>
              <label>
                Full name
                <input
                  name="name"
                  value={loginForm.name}
                  onChange={onLoginChange}
                  required
                />
              </label>
              <label>
                Phone (optional)
                <input name="phone" value={loginForm.phone} onChange={onLoginChange} />
              </label>
              <button type="submit">Continue</button>
            </form>
            {loginError && <p className="status error">{loginError}</p>}
          </>
        ) : user.role === 'customer' ? (
          <>
            <h2>New Towing Request</h2>
            <form onSubmit={onSubmit} className="form">
              <label>
                Customer name
                <input name="customer_name" value={form.customer_name} onChange={onChange} required />
              </label>
              <label>
                Location
                <input name="location" value={form.location} onChange={onChange} required />
              </label>
              <label>
                Notes
                <textarea name="note" value={form.note} onChange={onChange} rows="3" />
              </label>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit request'}
              </button>
            </form>
            {status && <p className="status">{status}</p>}
          </>
        ) : (
          <div className="driver-panel">
            <h2>Driver Console</h2>
            <p className="subhead">
              You are signed in to monitor dispatches and customer requests.
            </p>
            <div className="driver-grid">
              <div className="driver-card">
                <h3>Dispatch Feed</h3>
                <p>Live requests will appear here once connected.</p>
              </div>
              <div className="driver-card">
                <h3>Shift Status</h3>
                <p>Set availability and alert dispatch when ready.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
