import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { HiArrowRight, HiEye, HiEyeOff, HiExclamationCircle, HiCheckCircle } from 'react-icons/hi';
import TextInputs from '../../components/input/TextInputs';
import { handlelogin } from '../../api/auth';
import { EncryptedLocalStorage } from '../../utilities/encryptedLocalStorage';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [banner, setBanner] = useState({ type: null, message: '' });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setBanner({ type: null, message: '' });

    try {
      const response = await handlelogin(values);

      if (response && response.data && response.data.status_code === 200) {
        const userData = response.data.user;
        const storage = new EncryptedLocalStorage('wb_lg_user', userData);
        const saveStatus = storage.save();

        if (saveStatus.success) {
          setBanner({
            type: 'success',
            message: 'Login successful! Redirecting to portal...',
          });

          setTimeout(() => {
            navigate('/portal/dashboard');
          }, 1200);
        } else {
          setBanner({
            type: 'error',
            message: saveStatus.message || 'Failed to initialize session storage securely.',
          });
        }
      } else {
        setBanner({
          type: 'error',
          message: 'An unexpected response structure was received from the server.',
        });
      }
    } catch (error) {
      const errorData = error.response?.data;
      const statusCode = errorData?.status_code || error.response?.status;
      const errorMessage = errorData?.message;

      if (statusCode === 400) {
        setBanner({ type: 'error', message: errorMessage || 'Please provide both an email and password.' });
      } else if (statusCode === 401) {
        setBanner({ type: 'error', message: errorMessage || 'Invalid email or password.' });
      } else if (statusCode === 403) {
        setBanner({ type: 'error', message: errorMessage || 'Your account has been disabled.' });
      } else if (statusCode === 500) {
        setBanner({ type: 'error', message: errorMessage || 'A server error occurred. Please try again later.' });
      } else {
        setBanner({ type: 'error', message: 'Unable to connect to the server. Check your network.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-100 px-4">
      
      <div 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center space-x-2 cursor-pointer group select-none"
      >
        <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
          Tiberbu <span className="text-amber-700 font-medium">Docs</span>
        </span>
      </div>

      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        
        <div className="space-y-2">
          <h2 className="font-bold text-2xl text-slate-950">Admin access</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Welcome back. Please provide your credentials to access the admin portal.
          </p>
        </div>

        {banner.type && (
          <div 
            className={`flex items-start space-x-3 p-4 rounded-xl border text-sm transition-all duration-200 ${
              banner.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {banner.type === 'success' ? (
              <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <HiExclamationCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 font-medium">{banner.message}</div>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">            

              <TextInputs 
                name="email"
                type="email" 
                placeholder="john.doe@hospital.com" 
                label="Email Address"
              /> 

              <div className="relative">
                <TextInputs 
                  name="password"
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  label="Password" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex justify-end">
                <a href="#forgot" className="text-xs font-semibold text-amber-600 hover:underline">
                  Forgot?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm transition-all duration-150 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Log in'}</span>
                {!isSubmitting && <HiArrowRight className="w-4 h-4" />}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}