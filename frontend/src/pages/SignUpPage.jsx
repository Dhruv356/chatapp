import React, { useState } from 'react';
import { MessageSquare, User, Mail, Lock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ CORRECTED

import { useAuthStore } from '../store/useAuthStore';
import './signup.css'; // Make sure your CSS is imported
import { toast } from 'react-hot-toast';


const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
  if(!formData.fullName.trim()) return toast.error("Please enter your full name");
  if (!formData.email.trim()) return toast.error(" email is required");
  if (!formData.password.trim()) return toast.error("Password is required");
  if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
  return true;
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success===true) signup(formData);
    // if (validateForm()) {
    //   signup(formData);
    // } else {
    //   alert('Please fill all fields');
    // }
  };

  return (
    <div className="container">
      {/* Left side */}
      <div className="left-panel">
        <div className="content-wrapper">
          {/* LOGO Section */}
          <div className="logo-section">
            <div className="logo-group">
              <div className="logo-box">
                <MessageSquare className="logo-icon" />
              </div>
              <h1 className="title">Create Account</h1>
              <p className="subtitle">Get started with your free account</p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="form">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <User className="icon" />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <Mail className="icon" />
                </div>
                <input
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <Lock className="icon" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <label className="show-password">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show Password
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                <Loader2 className='size-5 animate-spin'/>
                Loading..
                </>
                ):("Creating Account")}

            </button>
          </form>
          <div className="div">
            <p>
              already have an account?{""}
              <Link to="/login" className="link">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
