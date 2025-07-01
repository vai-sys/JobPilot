


import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, Shield } from 'lucide-react';
import API from '../services/API';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');


 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await API.post("/auth/register",{ name, email, password });
      console.log("res",res)
      
      if (res.success) {
        setSuccess(true);
        console.log("Registration successful:", res.data);
       
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
    
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join the AI revolution today</p>
        </div>

       
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
              <p className="text-green-200 text-sm">Account created successfully! You can now sign in.</p>
            </div>
          )}

          <div className="space-y-6">
          
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

         
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

           
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="mt-2">
                <div className="flex space-x-1">
                  <div className={`h-1 flex-1 rounded ${password.length >= 6 ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                  <div className={`h-1 flex-1 rounded ${password.length >= 8 ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                  <div className={`h-1 flex-1 rounded ${/[A-Z]/.test(password) && /[0-9]/.test(password) ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                </div>
                <p className="text-xs text-slate-400 mt-1">Use 8+ characters with numbers and uppercase letters</p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !name || !email || !password}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Privacy Policy</a>
            </p>
          </div>

       
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>

      
        
      </div>
    </div>
  );
};

export default Register;