import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, GraduationCap, ShieldCheck, UserCheck, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const fillDemoCredentials = (email, password) => {
    setValue('email', email);
    setValue('password', password);
    toast.success(`Demo credentials set for ${email}`);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const cleanEmail = data.email ? data.email.toLowerCase().trim() : '';
      const cleanPassword = data.password ? data.password.trim() : '';
      
      const user = await login(cleanEmail, cleanPassword);
      toast.success(`Welcome back, ${user.name}!`);
      
      // Navigate to intended page or dashboard based on role
      if (from !== '/') {
        navigate(from, { replace: true });
      } else {
        navigate(`/${user.role}/dashboard`, { replace: true });
      }
    } catch (error) {
      console.error('Login error details:', error);
      const errorMsg = error.response?.data?.message || 'Login failed. Please check your credentials or server connection.';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex flex-col md:flex-row font-sans">
      
      {/* Left Side - Branding */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex-col items-center justify-center p-12 text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center animate-fade-in">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-xl">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Smart College ERP</h1>
          <p className="text-lg text-primary-100 max-w-md leading-relaxed">
            The AI-enabled comprehensive management solution for modern educational institutions.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 animate-slide-in">
        <div className="w-full max-w-md">
          
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Smart College ERP</h1>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-primary-600"></div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Please enter your credentials to sign in.</p>

            {/* Quick Demo Login Chips */}
            <div className="mb-6 p-3 bg-gray-50 dark:bg-slate-800/80 rounded-xl border border-gray-200 dark:border-slate-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                <KeyRound size={14} className="text-primary-500" /> Click to Quick-Fill Demo Credentials:
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('admin@erp.com', 'admin123')}
                  className="px-2.5 py-1 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors flex items-center gap-1"
                >
                  <ShieldCheck size={12} /> Admin
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('ramesh@erp.com', 'password123')}
                  className="px-2.5 py-1 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-lg text-xs font-medium hover:bg-purple-100 transition-colors flex items-center gap-1"
                >
                  <UserCheck size={12} /> Faculty
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('aarav@erp.com', 'password123')}
                  className="px-2.5 py-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors flex items-center gap-1"
                >
                  <GraduationCap size={12} /> Student
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Email"
                type="email"
                icon={Mail}
                placeholder="e.g. admin@erp.com"
                error={errors.email?.message}
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  icon={Lock}
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                
                <div className="text-xs">
                  <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </form>
          </div>
          
          <p className="text-center mt-8 text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Smart College ERP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
