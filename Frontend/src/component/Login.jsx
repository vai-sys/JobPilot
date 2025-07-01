


import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import  useAuth  from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr('');
    
    const res = await login(email, password);
    console.log(res);
    
    if (res.success) {
      navigate('/');
      console.log('Login successful!');
    } else {
      setErr(res.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
     
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        
        </div>

  
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          {err && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-200 text-sm">{err}</p>
            </div>
          )}

          <div className="space-y-6">
         
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
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
            </div>

        
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

     
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Don't have an account?{' '}
              <a href="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Sign up
              </a>
            </p>
          </div>
        </div>

       
        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-slate-400 text-center">
            Demo: test@example.com / password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;