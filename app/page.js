
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
      setMessage('Website configuration is incomplete.');
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

        setMessage('Registration submitted. Check your email for confirmation.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password
        });

        if (error) throw error;

        setMessage('Login successful!');
      }
    } catch (error) {
      setMessage(error.message);
    }

    setLoading(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <a href="#home" className="brand">
            THE CIVIL ENGINEERING HUB
          </a>

          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#community">Community</a>
            <a href="#resources">Resources</a>
            <a href="#projects">Projects</a>
            <a href="#membership" className="nav-button">Join Us</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container">
            <p className="eyebrow">
              KNOWLEDGE · INNOVATION · ENGINEERING
            </p>

            <h1>
              Engineering Minds.
              <br />
              Building the Future.
            </h1>

            <p className="hero-description">
              A professional community connecting Civil Engineering
              students, graduates and professionals through knowledge,
              collaboration and innovation.
            </p>

            <div className="hero-actions">
              <a href="#membership" className="primary-link">
                Become a Member
              </a>

              <a href="#about" className="secondary-link">
                Discover Our Mission
              </a>
            </div>

            <p className="hero-note">
              A community for the next generation of Civil Engineers.
            </p>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <p className="eyebrow">WHO WE ARE</p>
            <h2>More Than a Community</h2>

            <p className="section-description">
              The Civil Engineering Hub is a professional platform
              created to connect, educate and empower individuals
              interested in the field of Civil Engineering.
            </p>

            <div className="feature-grid">
              <article className="feature-card">
                <h3>Knowledge</h3>
                <p>
                  Explore engineering concepts, learning materials
                  and educational resources.
                </p>
              </article>

              <article className="feature-card">
                <h3>Collaboration</h3>
                <p>
                  Connect with fellow students, graduates and
                  engineering professionals.
                </p>
              </article>

              <article className="feature-card">
                <h3>Innovation</h3>
                <p>
                  Discover ideas, share projects and develop
                  solutions to engineering challenges.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section alternate" id="community">
          <div className="container">
            <p className="eyebrow">OUR COMMUNITY</p>
            <h2>Connect. Learn. Grow.</h2>

            <p className="section-description">
              Engineering is not just about structures and calculations.
              It is also about people, ideas and shared knowledge.
            </p>

            <a href="#membership" className="primary-link">
              Join the Community
            </a>
          </div>
        </section>

        <section className="section" id="resources">
          <div className="container">
            <p className="eyebrow">LEARN AND DEVELOP</p>
            <h2>Engineering Resources</h2>

            <div className="feature-grid">
              <article className="feature-card">
                <h3>Engineering Notes</h3>
                <p>
                  Study materials covering important Civil Engineering
                  subjects.
                </p>
              </article>

              <article className="feature-card">
                <h3>Technical Knowledge</h3>
                <p>
                  Understand engineering principles and practical
                  applications.
                </p>
              </article>

              <article className="feature-card">
                <h3>Career Development</h3>
                <p>
                  Explore professional development and career
                  opportunities.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section alternate" id="projects">
          <div className="container">
            <p className="eyebrow">ENGINEERING IN PRACTICE</p>
            <h2>Projects and Innovation</h2>

            <p className="section-description">
              A space dedicated to showcasing engineering projects,
              creative ideas, technical research and practical work.
            </p>
          </div>
        </section>

        <section className="section" id="membership">
          <div className="container">
            <p className="eyebrow">BECOME PART OF SOMETHING BIGGER</p>
            <h2>Join The Civil Engineering Hub</h2>

            <div className="panel">
              <h3>
                {mode === 'register' ? 'Become a Member' : 'Member Login'}
              </h3>

              <p className="form-description">
                {mode === 'register'
                  ? 'Registration is for Civil Engineering students and graduates.'
                  : 'Sign in to your account.'}
              </p>

              <form onSubmit={handleSubmit}>
                {mode === 'register' && (
                  <>
                    <input name="full_name" placeholder="Full name" required />
                    <input name="phone" type="tel" placeholder="Phone number" required />

                    <label>Date of birth</label>
                    <input name="date_of_birth" type="date" required />

                    <input
                      name="course"
                      placeholder="Course studying or studied"
                      required
                    />
                  </>
                )}

                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password (minimum 6 characters)"
                  minLength="6"
                  required
                />

                <button type="submit" disabled={loading}>
                  {loading
                    ? 'Please wait...'
                    : mode === 'register'
                      ? 'Register as a Member'
                      : 'Sign In'}
                </button>
              </form>

              {message && <p className="form-message">{message}</p>}

              <p className="switch-mode">
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
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <h3>THE CIVIL ENGINEERING HUB</h3>
          <p>Connecting Civil Engineers. Building the Future.</p>
          <p>Founded by Lala Iyanu Qayum</p>
          <p>© 2026 The Civil Engineering Hub. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
