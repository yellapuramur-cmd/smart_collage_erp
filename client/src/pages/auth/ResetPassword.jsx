import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Eye, EyeOff, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import api from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const password = watch('password', '');

  // Password strength checks
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await api.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        password: data.password
      });
      toast.success('Password successfully reset! You can now login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password. Link may be expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Set new password</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Your new password must be different from previous used passwords.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <Input
                label="New Password"
                type={showPassword ? "text" : "password"}
                icon={Lock}
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 8, message: "Must be at least 8 characters" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d).+$/,
                    message: "Must include uppercase and number"
                  }
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            <div className="space-y-2 mt-2">
              <div className="flex items-center text-sm">
                {hasMinLength ? <Check className="w-4 h-4 text-green-500 mr-2" /> : <X className="w-4 h-4 text-gray-400 mr-2" />}
                <span className={hasMinLength ? "text-gray-700 dark:text-gray-300" : "text-gray-500"}>At least 8 characters</span>
              </div>
              <div className="flex items-center text-sm">
                {hasUppercase ? <Check className="w-4 h-4 text-green-500 mr-2" /> : <X className="w-4 h-4 text-gray-400 mr-2" />}
                <span className={hasUppercase ? "text-gray-700 dark:text-gray-300" : "text-gray-500"}>At least one uppercase letter</span>
              </div>
              <div className="flex items-center text-sm">
                {hasNumber ? <Check className="w-4 h-4 text-green-500 mr-2" /> : <X className="w-4 h-4 text-gray-400 mr-2" />}
                <span className={hasNumber ? "text-gray-700 dark:text-gray-300" : "text-gray-500"}>At least one number</span>
              </div>
            </div>

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                icon={Lock}
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: val => val === password || "Passwords do not match"
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-500"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Reset Password
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
