"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Star } from "lucide-react"
import "../styles/user-details-page.scss"

// Mock user data
const mockUserDetails = {
  id: 3,
  firstName: "Grace",
  lastName: "Effiom",
  avatar: "",
  accountBalance: "₦200,000.00",
  accountNumber: "Providus Bank",
  tier: 2,
  bvn: "07060780922",
  gender: "Female",
  maritalStatus: "Single",
  children: "None",
  typeOfResidence: "Parent's Apartment",
  education: {
    level: "B.Sc",
    employmentStatus: "Employed",
    sector: "FinTech",
    duration: "2 Years",
    officeEmail: "grace@lendsqr.com",
    monthlyIncome: ["₦200,000.00", "₦400,000.00"],
    loanRepayment: "₦40,000",
  },
  socials: {
    twitter: "@grace_effiom",
    facebook: "Grace Effiom",
    instagram: "@grace_effiom",
  },
  guarantor: {
    firstName: "Debby",
    lastName: "Ogana",
    phoneNumber: "07060780922",
    email: "debby@gmail.com",
    relationship: "Sister",
  },
}

const UserDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("general")

  // In a real app, you would fetch user data based on the ID
  const user = mockUserDetails

  return (
    <div className="user-details-page">
      <Link to="/dashboard/users" className="back-link">
        <ArrowLeft size={16} />
        <span>Back to Users</span>
      </Link>

      <div className="page-header">
        <h1 className="page-title">User Details</h1>
        <div className="action-buttons">
        <button className="action-button blacklist">
            <span className="d-none d-md-inline">BLACKLIST USER</span>
            <span className="d-inline d-md-none">BLACKLIST</span>
          </button>
          <button className="action-button activate">
            <span className="d-none d-md-inline">ACTIVATE USER</span>
            <span className="d-inline d-md-none">ACTIVATE</span>
          </button>
        </div>
      </div>

      <div className="user-summary-card">
        <div className="user-info-section">
          <div className="user-avatar">
            {user.avatar ? (
              <img src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
            ) : (
              <div className="avatar-placeholder">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
            )}
          </div>
          <div className="user-name-info">
            <h2 className="user-name">
              {user.firstName} {user.lastName}
            </h2>
            <p className="user-id">LSQFf587g90</p>
          </div>
          <div className="user-tier">
            <p className="tier-label">User's Tier</p>
            <div className="tier-stars">
              <Star className="filled" size={16} />
              <Star className={user.tier >= 2 ? "filled" : ""} size={16} />
              <Star className={user.tier >= 3 ? "filled" : ""} size={16} />
            </div>
          </div>
          <div className="user-financials">
            <h3 className="account-balance">{user.accountBalance}</h3>
            <p className="account-number">{user.accountNumber}</p>
          </div>
        </div>

        <div className="tabs">
          <button className={`tab ${activeTab === "general" ? "active" : ""}`} onClick={() => setActiveTab("general")}>
            General Details
          </button>
          <button
            className={`tab ${activeTab === "documents" ? "active" : ""}`}
            onClick={() => setActiveTab("documents")}
          >
            Documents
          </button>
          <button className={`tab ${activeTab === "bank" ? "active" : ""}`} onClick={() => setActiveTab("bank")}>
            Bank Details
          </button>
          <button className={`tab ${activeTab === "loans" ? "active" : ""}`} onClick={() => setActiveTab("loans")}>
            Loans
          </button>
          <button className={`tab ${activeTab === "savings" ? "active" : ""}`} onClick={() => setActiveTab("savings")}>
            Savings
          </button>
          <button className={`tab ${activeTab === "app" ? "active" : ""}`} onClick={() => setActiveTab("app")}>
            App and System
          </button>
        </div>
      </div>

      {activeTab === "general" && (
        <div className="user-details-content">
          <section className="details-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <h4 className="detail-label">FULL NAME</h4>
                <p className="detail-value">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">PHONE NUMBER</h4>
                <p className="detail-value">{user.bvn}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">EMAIL ADDRESS</h4>
                <p className="detail-value">{user.education.officeEmail}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">BVN</h4>
                <p className="detail-value">{user.bvn}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">GENDER</h4>
                <p className="detail-value">{user.gender}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">MARITAL STATUS</h4>
                <p className="detail-value">{user.maritalStatus}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">CHILDREN</h4>
                <p className="detail-value">{user.children}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">TYPE OF RESIDENCE</h4>
                <p className="detail-value">{user.typeOfResidence}</p>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h3 className="section-title">Education and Employment</h3>
            <div className="details-grid">
              <div className="detail-item">
                <h4 className="detail-label">LEVEL OF EDUCATION</h4>
                <p className="detail-value">{user.education.level}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">EMPLOYMENT STATUS</h4>
                <p className="detail-value">{user.education.employmentStatus}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">SECTOR OF EMPLOYMENT</h4>
                <p className="detail-value">{user.education.sector}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">DURATION OF EMPLOYMENT</h4>
                <p className="detail-value">{user.education.duration}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">OFFICE EMAIL</h4>
                <p className="detail-value">{user.education.officeEmail}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">MONTHLY INCOME</h4>
                <p className="detail-value">{user.education.monthlyIncome.join(" - ")}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">LOAN REPAYMENT</h4>
                <p className="detail-value">{user.education.loanRepayment}</p>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h3 className="section-title">Socials</h3>
            <div className="details-grid">
              <div className="detail-item">
                <h4 className="detail-label">TWITTER</h4>
                <p className="detail-value">{user.socials.twitter}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">FACEBOOK</h4>
                <p className="detail-value">{user.socials.facebook}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">INSTAGRAM</h4>
                <p className="detail-value">{user.socials.instagram}</p>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h3 className="section-title">Guarantor</h3>
            <div className="details-grid">
              <div className="detail-item">
                <h4 className="detail-label">FULL NAME</h4>
                <p className="detail-value">
                  {user.guarantor.firstName} {user.guarantor.lastName}
                </p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">PHONE NUMBER</h4>
                <p className="detail-value">{user.guarantor.phoneNumber}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">EMAIL ADDRESS</h4>
                <p className="detail-value">{user.guarantor.email}</p>
              </div>
              <div className="detail-item">
                <h4 className="detail-label">RELATIONSHIP</h4>
                <p className="detail-value">{user.guarantor.relationship}</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default UserDetailsPage

