import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../../components/firebase';


export default function EmailSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Navigate to home or onboarding
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Email is already registered');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        default:
          setError('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] text-white flex flex-col justify-center items-center px-6 space-y-8 overflow-hidden">
      <div className="absolute top-[-150px] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-purple-600 via-purple-800 to-transparent opacity-30 blur-[100px] z-0" />
      <div className="relative z-10 w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full mx-auto" />
          <h1 className="text-2xl font-bold tracking-wide">OUTFLOW</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:border-purple-500 text-sm"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:border-purple-500 text-sm"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:border-purple-500 text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-3 w-full py-3 px-4 rounded-full bg-white text-black font-medium text-sm shadow-md transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <div className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              className="text-purple-400 hover:text-purple-300 transition-colors"
              onClick={() => navigate('/email')}
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-gray-500 text-xs mt-8 text-center mx-auto max-w-xs">
          By signing up, you agree to our{' '}
          <span className="underline">Terms</span> and{' '}
          <span className="underline">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}