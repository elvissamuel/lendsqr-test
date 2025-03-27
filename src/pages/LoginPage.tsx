"use client"

import type React from "react"

import { useState } from "react"
import "../styles/login-page.scss"
import lendsqrLogo from "../assets/logo.svg"
import loginIllustration from "../assets/pablo-sign-in 1.svg"

interface LoginPageProps {
  onLogin: () => void
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate credentials here
    onLogin()
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="logo-container">
            <img src={lendsqrLogo || "/placeholder.svg"} alt="Lendsqr Logo" className="logo" />
          </div>
          <div className="illustration-container">
            <img src={loginIllustration || "/placeholder.svg"} alt="Login Illustration" className="illustration" />
          </div>
        </div>
        <div className="login-right">
          <div className="login-form-container">
            <h1 className="welcome-text">Welcome!</h1>
            <p className="login-subtitle">Enter details to login.</p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="form-input"
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              <div className="forgot-password">
                <a href="#forgot-password">FORGOT PASSWORD?</a>
              </div>

              <button type="submit" className="login-button">
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

