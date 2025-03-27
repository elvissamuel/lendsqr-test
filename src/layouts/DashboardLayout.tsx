"use client"

import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Search, Bell, ChevronDown, Menu, X } from "lucide-react"
import "../styles/dashboard-layout.scss"
import lendsqrLogo from "../assets/logo.svg"
import userAvatar from "../assets/avatar.png"

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    // Add a class to the body to prevent scrolling when sidebar is open on mobile
    if (!isSidebarOpen) {
      document.body.classList.add("sidebar-open")
    } else {
      document.body.classList.remove("sidebar-open")
    }
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname.includes(path)
  }

  return (
    <div className="dashboard-layout">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-container">
            <img src={lendsqrLogo || "/placeholder.svg"} alt="Lendsqr Logo" className="logo" />
          </div>
          <button className="menu-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="header-center">
          <div className="search-container">
            <input type="text" placeholder="Search for anything" className="search-input" />
            <button className="search-button">
              <Search size={20} color="#fff" />
            </button>
          </div>
        </div>

        <div className="header-right">
          <a href="#docs" className="docs-link">
            Docs
          </a>
          <div className="notifications">
            <Bell size={20} />
          </div>
          <div className="user-profile">
            <img src={userAvatar || "/placeholder.svg"} alt="User Avatar" className="avatar" />
            <span className="username">Adedeji</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-content">
            <div className="sidebar-section">
              <div className="sidebar-item organization">
                <span className="item-icon">🏢</span>
                <span className="item-text">Switch Organization</span>
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="sidebar-section">
              <div className={`sidebar-item ${isActive("/dashboard") ? "active" : ""}`}>
                <span className="item-icon">🏠</span>
                <span className="item-text">Dashboard</span>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="section-title">CUSTOMERS</div>
              <div className={`sidebar-item ${isActive("/dashboard/users") ? "active" : ""}`}>
                <span className="item-icon">👥</span>
                <span className="item-text">Users</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">🤝</span>
                <span className="item-text">Guarantors</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">💰</span>
                <span className="item-text">Loans</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">🔄</span>
                <span className="item-text">Decision Models</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">💹</span>
                <span className="item-text">Savings</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">📝</span>
                <span className="item-text">Loan Requests</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">✅</span>
                <span className="item-text">Whitelist</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">❌</span>
                <span className="item-text">Karma</span>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="section-title">BUSINESSES</div>
              <div className="sidebar-item">
                <span className="item-icon">🏢</span>
                <span className="item-text">Organization</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">💼</span>
                <span className="item-text">Loan Products</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">🏦</span>
                <span className="item-text">Savings Products</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">💲</span>
                <span className="item-text">Fees and Charges</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">📊</span>
                <span className="item-text">Transactions</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">⚙️</span>
                <span className="item-text">Services</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">👤</span>
                <span className="item-text">Service Account</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">📄</span>
                <span className="item-text">Settlements</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">📈</span>
                <span className="item-text">Reports</span>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="section-title">SETTINGS</div>
              <div className="sidebar-item">
                <span className="item-icon">⚙️</span>
                <span className="item-text">Preferences</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">💰</span>
                <span className="item-text">Fees and Pricing</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">📝</span>
                <span className="item-text">Audit Logs</span>
              </div>
              <div className="sidebar-item">
                <span className="item-icon">⚠️</span>
                <span className="item-text">Systems Messages</span>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-item logout">
                <span className="item-icon">🚪</span>
                <span className="item-text">Logout</span>
              </div>
              <div className="version">v1.2.0</div>
            </div>
          </div>
        </aside>
        {isSidebarOpen && <div className="sidebar-backdrop" onClick={closeSidebar}></div>}

        {/* Main Content Area */}
        <main className="main-content" onClick={closeSidebar}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

