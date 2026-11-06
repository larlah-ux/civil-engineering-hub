'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function Home() {
  const [mode, setMode] = useState('register');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      setMessage('Website configuration is not complete yet.');
      setLoading(false);
      return;
    }

    const supabase = createClient(url, key);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              full_name: data.full_name,
              phone: data.phone,
              date_of_birth: data.date_of_birth,
              course: data.course
            }
          }
        });

        if (error) throw error;

        setMessage('Registration submitted. Check your email if confirmation is required.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password
        });

        if (error) throw error;

        setMessage('Login successful. Your account is being verified.');
      }
    } catch (error) {
      setMessage(error.message);
    }

    setLoading(false);
  }

  return (
    <>
      <header>
        <div className="container">
          <div className="brand">THE CIVIL ENGINEERING HUB</div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <p>ENGINEERING KNOWLEDGE · DISCUSSION · COMMUNITY</p>

          <h1>Connecting Civil Engineers. Building the Future.</h1>

          <p>
            A professional community for Civil Engineering students
            and graduates to exchange knowledge, discuss ideas
            and develop engineering expertise.
          </p>
        </section>

        <section className="panel">
          <h2>{mode === 'register' ? 'Become a Member' : 'Member Login'}</h2>

          <p style={{ color: '#b9c3cf', marginTop: 10 }}>
            {mode === 'register'
              ? 'Registration is exclusively for Civil Engineering students and graduates.'
              : 'Sign in to access your account.'}
          </p>

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <>
                <input name="full_name" placeholder="Full name" required />
                <input name="phone" type="tel" placeholder="Phone number" required />
                <label>Date of birth</label>
                <input name="date_of_birth" type="date" required />
                <input name="course" placeholder="Course studying or studied" required />
              </>
            )}

            <input name="email" type="email" placeholder="Email address" required />

            <input
              name="password"
              type="password"
              placeholder="Password (minimum 6 characters)"
              minLength="6"
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Please wait...' :
                mode === 'register' ? 'Register as a Member' : 'Sign In'}
            </button>
          </form>

          {message && (
            <p style={{ marginTop: 15, color: '#b9c3cf' }}>{message}</p>
          )}

          <p style={{ marginTop: 22 }}>
            {mode === 'register'
              ? 'Already registered?'
              : 'New to the community?'}
            {' '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'register' ? 'login' : 'register');
                setMessage('');
              }}
            >
              {mode === 'register' ? 'Sign in' : 'Register'}
            </button>
          </p>
        </section>

        <section className="hero">
          <h2>Founded by Lala Iyanu Qayum</h2>
          <p>
            A dedicated space for the Civil Engineering community.
          </p>
        </section>
      </main>

      <footer>
        © 2026 The Civil Engineering Hub. All rights reserved.
      </footer>
    </>
  );
}