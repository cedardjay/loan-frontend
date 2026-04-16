import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';
import Layout from '../components/Layout';

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, password, phoneNumber } = formData;
    if (!name || !email || !password || !phoneNumber) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage('Please fill all the fields.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    try {
      // Call the register method from ApiService
      const response = await ApiService.registerUser(formData);

      // Check if the response is successful
      if (response.statusCode === 200) {
        // Clear the form fields after successful registration
        setFormData({
          username: '',
          email: '',
          password: '',
          phoneNumber: ''
        });

        setSuccessMessage('User registered successfully');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/verify');
        }, 3000);
      }
    }
    catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };


  return (
    <Layout hideFooter>
      <header className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md h-20 border-b border-outline-variant/10">
        <nav className="max-w-7xl mx-auto px-8 h-full relative flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-[#0F1C2F]">loan@</Link>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link className="text-sm font-bold text-tertiary hover:text-primary" to="/">Home</Link>
          </div>
          <div className="text-sm font-medium text-tertiary">
            Already have an account?{' '}
            <Link className="text-primary hover:underline" to="/login">Login</Link>
          </div>
        </nav>
      </header>

      <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <section className="flex flex-col gap-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold tracking-tighter text-[#1E2A3E] leading-[1.1]">
                Create your free account
              </h1>
              <p className="text-lg text-tertiary font-medium">
                Start borrowing, Investing, One account.
              </p>
            </div>
            <ul className="space-y-5">
              {['No hidden fees — ever', 'Bank-grade encryption', '2-minute signup'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-tertiary font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-6 order-1 lg:order-2">

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-10 shadow-sm">
              <header class="mb-10">
                <h2 className="text-3xl font-extrabold text-[#1E2A3E] tracking-tight">Sign Up</h2>
                <p className="text-[#5A6C7E] font-medium mt-1">It's free and takes less than 2 minutes</p>
              </header>
              <form className="space-y-6"
                onSubmit={handleSubmit}>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-on-surface uppercase tracking-wider" >Full name</label>
                  <input className="w-full h-12 px-4 rounded-xl border-none bg-surface-container-low focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline/50 font-medium"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Smith"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-on-surface uppercase tracking-wider" for="email">Email address</label>
                  <input className="w-full h-12 px-4 rounded-xl border-none bg-surface-container-low focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline/50 font-medium"
                    name="email"
                    placeholder="john@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required />
                  <p className="text-[11px] text-outline font-medium">We'll send verification and account updates here</p>
                </div>

                <div class="space-y-2">
                  <label className="block text-sm font-bold text-on-surface uppercase tracking-wider" for="phone">Phone number</label>
                  <input className="w-full h-12 px-4 rounded-xl border-none bg-surface-container-low focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline/50 font-medium"
                    name="phoneNumber"
                    type="text"
                    placeholder="+237 657 890 690"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-on-surface uppercase tracking-wider" for="password">Create a password</label>
                  <div className="relative">
                    <input className="w-full h-12 px-4 pr-12 rounded-xl border-none bg-surface-container-low focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline/50 font-medium"
                      name="password"
                      placeholder="••••••••"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" type="button">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <div className="pt-0.5">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" id="terms" type="checkbox" />
                  </div>
                  <label className="text-sm text-tertiary font-medium leading-relaxed" for="terms">
                    I agree to the <a class="text-primary-container font-bold hover:underline" href="#">Terms of Service</a> and <a class="text-primary-container font-bold hover:underline" href="#">Privacy Policy</a>
                  </label>
                </div>

                <button className="w-full h-14 bg-primary-container text-white font-extrabold rounded-lg hover:bg-primary active:scale-[0.98] transition-all shadow-lg shadow-primary/10"
                  type="submit">
                  Create Free Account
                </button>

                <div className="flex items-center gap-4 py-2">
                  <div className="h-px flex-1 bg-outline-variant/30"></div>
                  <span className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Or join with</span>
                  <div className="h-px flex-1 bg-outline-variant/30"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-outline-variant/50 hover:bg-surface-container transition-all active:scale-[0.98]" type="button">
                    <img alt="Google" class="w-5 h-5" data-alt="Google logo icon in multi-color standard branding" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIG-hJSgbiAnx-Ulz-lZRDTtlJ19DiOFq4HPvJRVKbMzO5Tx5IuYdYdJDxmUhOe88br2eyOQHg-ax_etZh7zcJokmwbsE63ppmGgQOtAVcdludgIToOmPYAXSVef0lRfW_RDaSMTCbD-359uNX06sdeR5XaUeZCONkcXoMwqPoskyKdvhfjavU87G64Eom4l9rnD6pKp71Vk5MiKAUu9TcZ6ztEDhNQl8MXU6Qo1gquxEeVFGWgNft0lGFB4_RklkPn1TBlphCTQk" />
                    <span className="text-sm font-bold text-tertiary">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-outline-variant/50 hover:bg-surface-container transition-all active:scale-[0.98]" type="button">
                    <span className="material-symbols-outlined text-lg">ios</span>
                    <span className="text-sm font-bold text-tertiary">Apple</span>
                  </button>
                </div>
              </form>
            </div>
          </section>


        </div>
      </div>
    </Layout>
  );
}