"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { Filter, MoreVertical, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import "../styles/users-page.scss"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    orgName: "Lendsqr",
    username: "Adedeji",
    email: "adedeji@lendsqr.com",
    phoneNumber: "08078903721",
    dateJoined: "May 15, 2020 10:00 AM",
    status: "Inactive",
  },
  {
    id: 2,
    orgName: "Irorun",
    username: "Debby Ogana",
    email: "debby@irorun.com",
    phoneNumber: "08160780928",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "Pending",
  },
  {
    id: 3,
    orgName: "Lendsqr",
    username: "Grace Effiom",
    email: "grace@lendsqr.com",
    phoneNumber: "07060780922",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "Blacklisted",
  },
  {
    id: 4,
    orgName: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phoneNumber: "08130780925",
    dateJoined: "Apr 10, 2020 10:00 AM",
    status: "Pending",
  },
  {
    id: 5,
    orgName: "Lendsqr",
    username: "Grace Effiom",
    email: "grace@lendsqr.com",
    phoneNumber: "07060780922",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "Active",
  },
  {
    id: 6,
    orgName: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phoneNumber: "08130780925",
    dateJoined: "Apr 10, 2020 10:00 AM",
    status: "Active",
  },
  {
    id: 7,
    orgName: "Lendsqr",
    username: "Grace Effiom",
    email: "grace@lendsqr.com",
    phoneNumber: "07060780922",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "Inactive",
  },
  {
    id: 8,
    orgName: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phoneNumber: "08130780925",
    dateJoined: "Apr 10, 2020 10:00 AM",
    status: "Inactive",
  },
]

// Get unique organizations from mock data
const organizations = Array.from(new Set(mockUsers.map((user) => user.orgName)))

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(100)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null)
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)

  // Filter state
  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  })

  // Refs for filter dropdowns
  const filterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Function to set ref without returning a value
  const setFilterRef = (column: string) => (el: HTMLDivElement | null) => {
    filterRefs.current[column] = el
  }

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeFilterColumn &&
        filterRefs.current[activeFilterColumn] &&
        !filterRefs.current[activeFilterColumn]?.contains(event.target as Node)
      ) {
        setActiveFilterColumn(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeFilterColumn])

  const toggleDropdown = (userId: number) => {
    setActiveDropdown(activeDropdown === userId ? null : userId)
  }

  const toggleFilterDropdown = (column: string) => {
    setActiveFilterColumn(activeFilterColumn === column ? null : column)
  }

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const applyFilters = () => {
    let result = mockUsers

    if (filters.organization) {
      result = result.filter((user) => user.orgName.toLowerCase() === filters.organization.toLowerCase())
    }

    if (filters.username) {
      result = result.filter((user) => user.username.toLowerCase().includes(filters.username.toLowerCase()))
    }

    if (filters.email) {
      result = result.filter((user) => user.email.toLowerCase().includes(filters.email.toLowerCase()))
    }

    if (filters.date) {
      result = result.filter((user) => user.dateJoined.includes(filters.date))
    }

    if (filters.phoneNumber) {
      result = result.filter((user) => user.phoneNumber.includes(filters.phoneNumber))
    }

    if (filters.status) {
      result = result.filter((user) => user.status.toLowerCase() === filters.status.toLowerCase())
    }

    setFilteredUsers(result)
    setActiveFilterColumn(null)
  }

  const resetFilters = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    })
    setFilteredUsers(mockUsers)
    setActiveFilterColumn(null)
  }

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "status-active"
      case "inactive":
        return "status-inactive"
      case "pending":
        return "status-pending"
      case "blacklisted":
        return "status-blacklisted"
      default:
        return ""
    }
  }

  return (
    <div className="users-page">
      <h1 className="page-title">Users</h1>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon users-icon">👥</div>
          <div className="stat-label">USERS</div>
          <div className="stat-value">2,453</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active-users-icon">👤</div>
          <div className="stat-label">ACTIVE USERS</div>
          <div className="stat-value">2,453</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon loans-icon">💰</div>
          <div className="stat-label">USERS WITH LOANS</div>
          <div className="stat-value">12,453</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon savings-icon">💹</div>
          <div className="stat-label">USERS WITH SAVINGS</div>
          <div className="stat-value">102,453</div>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  ORGANIZATION
                  <button className="filter-icon" onClick={() => toggleFilterDropdown("organization")}>
                    <Filter size={16} />
                  </button>
                  {activeFilterColumn === "organization" && (
                    <div className="filter-dropdown" ref={setFilterRef("organization")}>
                      <div className="filter-dropdown-content">
                        <div className="filter-field">
                          <label>Organization</label>
                          <select
                            value={filters.organization}
                            onChange={(e) => handleFilterChange("organization", e.target.value)}
                          >
                            <option value="">Select</option>
                            {organizations.map((org) => (
                              <option key={org} value={org}>
                                {org}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="filter-field">
                          <label>Username</label>
                          <input
                            type="text"
                            placeholder="User"
                            value={filters.username}
                            onChange={(e) => handleFilterChange("username", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Email</label>
                          <input
                            type="email"
                            placeholder="Email"
                            value={filters.email}
                            onChange={(e) => handleFilterChange("email", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Date</label>
                          <div className="date-input-wrapper">
                            <input
                              type="text"
                              placeholder="Date"
                              value={filters.date}
                              onChange={(e) => handleFilterChange("date", e.target.value)}
                            />
                            <Calendar size={16} className="date-icon" />
                          </div>
                        </div>
                        <div className="filter-field">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            placeholder="Phone Number"
                            value={filters.phoneNumber}
                            onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Status</label>
                          <select value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)}>
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                            <option value="Blacklisted">Blacklisted</option>
                          </select>
                        </div>
                        <div className="filter-actions">
                          <button className="reset-button" onClick={resetFilters}>
                            Reset
                          </button>
                          <button className="filter-button" onClick={applyFilters}>
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </th>
              <th>
                <div className="th-content">
                  USERNAME
                  <button className="filter-icon" onClick={() => toggleFilterDropdown("username")}>
                    <Filter size={16} />
                  </button>
                  {activeFilterColumn === "username" && (
                    <div className="filter-dropdown" ref={setFilterRef("username")}>
                      <div className="filter-dropdown-content">
                        {/* Same filter fields as above */}
                        <div className="filter-field">
                          <label>Organization</label>
                          <select
                            value={filters.organization}
                            onChange={(e) => handleFilterChange("organization", e.target.value)}
                          >
                            <option value="">Select</option>
                            {organizations.map((org) => (
                              <option key={org} value={org}>
                                {org}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="filter-field">
                          <label>Username</label>
                          <input
                            type="text"
                            placeholder="User"
                            value={filters.username}
                            onChange={(e) => handleFilterChange("username", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Email</label>
                          <input
                            type="email"
                            placeholder="Email"
                            value={filters.email}
                            onChange={(e) => handleFilterChange("email", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Date</label>
                          <div className="date-input-wrapper">
                            <input
                              type="text"
                              placeholder="Date"
                              value={filters.date}
                              onChange={(e) => handleFilterChange("date", e.target.value)}
                            />
                            <Calendar size={16} className="date-icon" />
                          </div>
                        </div>
                        <div className="filter-field">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            placeholder="Phone Number"
                            value={filters.phoneNumber}
                            onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Status</label>
                          <select value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)}>
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                            <option value="Blacklisted">Blacklisted</option>
                          </select>
                        </div>
                        <div className="filter-actions">
                          <button className="reset-button" onClick={resetFilters}>
                            Reset
                          </button>
                          <button className="filter-button" onClick={applyFilters}>
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </th>
              <th>
                <div className="th-content">
                  EMAIL
                  <button className="filter-icon" onClick={() => toggleFilterDropdown("email")}>
                    <Filter size={16} />
                  </button>
                  {activeFilterColumn === "email" && (
                    <div className="filter-dropdown" ref={setFilterRef("email")}>
                      <div className="filter-dropdown-content">
                        {/* Same filter fields as above */}
                        <div className="filter-field">
                          <label>Organization</label>
                          <select
                            value={filters.organization}
                            onChange={(e) => handleFilterChange("organization", e.target.value)}
                          >
                            <option value="">Select</option>
                            {organizations.map((org) => (
                              <option key={org} value={org}>
                                {org}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="filter-field">
                          <label>Username</label>
                          <input
                            type="text"
                            placeholder="User"
                            value={filters.username}
                            onChange={(e) => handleFilterChange("username", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Email</label>
                          <input
                            type="email"
                            placeholder="Email"
                            value={filters.email}
                            onChange={(e) => handleFilterChange("email", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Date</label>
                          <div className="date-input-wrapper">
                            <input
                              type="text"
                              placeholder="Date"
                              value={filters.date}
                              onChange={(e) => handleFilterChange("date", e.target.value)}
                            />
                            <Calendar size={16} className="date-icon" />
                          </div>
                        </div>
                        <div className="filter-field">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            placeholder="Phone Number"
                            value={filters.phoneNumber}
                            onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Status</label>
                          <select value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)}>
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                            <option value="Blacklisted">Blacklisted</option>
                          </select>
                        </div>
                        <div className="filter-actions">
                          <button className="reset-button" onClick={resetFilters}>
                            Reset
                          </button>
                          <button className="filter-button" onClick={applyFilters}>
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </th>
              <th>
                <div className="th-content">
                  PHONE NUMBER
                  <button className="filter-icon" onClick={() => toggleFilterDropdown("phoneNumber")}>
                    <Filter size={16} />
                  </button>
                  {activeFilterColumn === "phoneNumber" && (
                    <div className="filter-dropdown" ref={setFilterRef("phoneNumber")}>
                      <div className="filter-dropdown-content">
                        {/* Same filter fields as above */}
                        <div className="filter-field">
                          <label>Organization</label>
                          <select
                            value={filters.organization}
                            onChange={(e) => handleFilterChange("organization", e.target.value)}
                          >
                            <option value="">Select</option>
                            {organizations.map((org) => (
                              <option key={org} value={org}>
                                {org}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="filter-field">
                          <label>Username</label>
                          <input
                            type="text"
                            placeholder="User"
                            value={filters.username}
                            onChange={(e) => handleFilterChange("username", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Email</label>
                          <input
                            type="email"
                            placeholder="Email"
                            value={filters.email}
                            onChange={(e) => handleFilterChange("email", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Date</label>
                          <div className="date-input-wrapper">
                            <input
                              type="text"
                              placeholder="Date"
                              value={filters.date}
                              onChange={(e) => handleFilterChange("date", e.target.value)}
                            />
                            <Calendar size={16} className="date-icon" />
                          </div>
                        </div>
                        <div className="filter-field">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            placeholder="Phone Number"
                            value={filters.phoneNumber}
                            onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Status</label>
                          <select value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)}>
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                            <option value="Blacklisted">Blacklisted</option>
                          </select>
                        </div>
                        <div className="filter-actions">
                          <button className="reset-button" onClick={resetFilters}>
                            Reset
                          </button>
                          <button className="filter-button" onClick={applyFilters}>
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </th>
              <th>
                <div className="th-content">
                  DATE JOINED
                  <button className="filter-icon" onClick={() => toggleFilterDropdown("date")}>
                    <Filter size={16} />
                  </button>
                  {activeFilterColumn === "date" && (
                    <div className="filter-dropdown" ref={setFilterRef("date")}>
                      <div className="filter-dropdown-content">
                        {/* Same filter fields as above */}
                        <div className="filter-field">
                          <label>Organization</label>
                          <select
                            value={filters.organization}
                            onChange={(e) => handleFilterChange("organization", e.target.value)}
                          >
                            <option value="">Select</option>
                            {organizations.map((org) => (
                              <option key={org} value={org}>
                                {org}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="filter-field">
                          <label>Username</label>
                          <input
                            type="text"
                            placeholder="User"
                            value={filters.username}
                            onChange={(e) => handleFilterChange("username", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Email</label>
                          <input
                            type="email"
                            placeholder="Email"
                            value={filters.email}
                            onChange={(e) => handleFilterChange("email", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Date</label>
                          <div className="date-input-wrapper">
                            <input
                              type="text"
                              placeholder="Date"
                              value={filters.date}
                              onChange={(e) => handleFilterChange("date", e.target.value)}
                            />
                            <Calendar size={16} className="date-icon" />
                          </div>
                        </div>
                        <div className="filter-field">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            placeholder="Phone Number"
                            value={filters.phoneNumber}
                            onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Status</label>
                          <select value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)}>
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                            <option value="Blacklisted">Blacklisted</option>
                          </select>
                        </div>
                        <div className="filter-actions">
                          <button className="reset-button" onClick={resetFilters}>
                            Reset
                          </button>
                          <button className="filter-button" onClick={applyFilters}>
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </th>
              <th>
                <div className="th-content">
                  STATUS
                  <button className="filter-icon" onClick={() => toggleFilterDropdown("status")}>
                    <Filter size={16} />
                  </button>
                  {activeFilterColumn === "status" && (
                    <div className="filter-dropdown" ref={setFilterRef("status")}>
                      <div className="filter-dropdown-content">
                        {/* Same filter fields as above */}
                        <div className="filter-field">
                          <label>Organization</label>
                          <select
                            value={filters.organization}
                            onChange={(e) => handleFilterChange("organization", e.target.value)}
                          >
                            <option value="">Select</option>
                            {organizations.map((org) => (
                              <option key={org} value={org}>
                                {org}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="filter-field">
                          <label>Username</label>
                          <input
                            type="text"
                            placeholder="User"
                            value={filters.username}
                            onChange={(e) => handleFilterChange("username", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Email</label>
                          <input
                            type="email"
                            placeholder="Email"
                            value={filters.email}
                            onChange={(e) => handleFilterChange("email", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Date</label>
                          <div className="date-input-wrapper">
                            <input
                              type="text"
                              placeholder="Date"
                              value={filters.date}
                              onChange={(e) => handleFilterChange("date", e.target.value)}
                            />
                            <Calendar size={16} className="date-icon" />
                          </div>
                        </div>
                        <div className="filter-field">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            placeholder="Phone Number"
                            value={filters.phoneNumber}
                            onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
                          />
                        </div>
                        <div className="filter-field">
                          <label>Status</label>
                          <select value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)}>
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                            <option value="Blacklisted">Blacklisted</option>
                          </select>
                        </div>
                        <div className="filter-actions">
                          <button className="reset-button" onClick={resetFilters}>
                            Reset
                          </button>
                          <button className="filter-button" onClick={applyFilters}>
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.orgName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.dateJoined}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(user.status)}`}>{user.status}</span>
                </td>
                <td className="actions-cell">
                  <div className="actions-dropdown">
                    <button className="dropdown-toggle" onClick={() => toggleDropdown(user.id)}>
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === user.id && (
                      <div className="dropdown-menu">
                        <Link to={`/dashboard/users/${user.id}`} className="dropdown-item">
                          👁️ View Details
                        </Link>
                        <button className="dropdown-item">❌ Blacklist User</button>
                        <button className="dropdown-item">✅ Activate User</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={7} className="no-results">
                  No users match your filter criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="rows-per-page">
          <span>Showing</span>
          <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>out of {filteredUsers.length}</span>
        </div>

        <div className="pagination">
          <button
            className="pagination-button prev"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="pagination-pages">
            <button className={`page-number ${currentPage === 1 ? "active" : ""}`} onClick={() => setCurrentPage(1)}>
              1
            </button>
            <button className={`page-number ${currentPage === 2 ? "active" : ""}`} onClick={() => setCurrentPage(2)}>
              2
            </button>
            <button className={`page-number ${currentPage === 3 ? "active" : ""}`} onClick={() => setCurrentPage(3)}>
              3
            </button>
            <span className="ellipsis">...</span>
            <button className={`page-number ${currentPage === 15 ? "active" : ""}`} onClick={() => setCurrentPage(15)}>
              15
            </button>
            <button className={`page-number ${currentPage === 16 ? "active" : ""}`} onClick={() => setCurrentPage(16)}>
              16
            </button>
          </div>

          <button
            className="pagination-button next"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === 16}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UsersPage

