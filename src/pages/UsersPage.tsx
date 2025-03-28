"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { Filter, MoreVertical, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import "../styles/users-page.scss"
import { useUsers } from "../context/useUser"
import type { IUser } from "../models"

const UsersPage = () => {
  const { data: mockUsers, isLoading, error } = useUsers()
  const organizations = Array.from(new Set(mockUsers?.map((user) => user.orgName)))
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null)
  const [filteredUsers, setFilteredUsers] = useState(mockUsers || [])
  const [displayedUsers, setDisplayedUsers] = useState<typeof mockUsers>()
  const [totalPages, setTotalPages] = useState(1)

  // Filter state
  const [filters, setFilters] = useState({
    organization: "",
    userName: "",
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

  useEffect(() => {
    // Calculate total pages
    const calculatedTotalPages = Math.ceil(filteredUsers.length / rowsPerPage)
    setTotalPages(calculatedTotalPages)

    // Ensure current page is valid
    if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
      setCurrentPage(calculatedTotalPages)
    }

    // Get users for current page
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    setDisplayedUsers(filteredUsers.slice(startIndex, endIndex))
  }, [filteredUsers, currentPage, rowsPerPage])

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

  // Initialize filteredUsers and displayedUsers when mockUsers changes
  useEffect(() => {
    if (mockUsers) {
      setFilteredUsers(mockUsers)
      const startIndex = (currentPage - 1) * rowsPerPage
      const endIndex = startIndex + rowsPerPage
      setDisplayedUsers(mockUsers.slice(startIndex, endIndex))
    }
  }, [mockUsers, currentPage, rowsPerPage])

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
    let result = mockUsers as IUser[]

    if (filters.organization) {
      result = result.filter((user) => user.orgName.toLowerCase() === filters.organization.toLowerCase())
    }

    if (filters.userName) {
      result = result.filter((user) => user.userName.toLowerCase().includes(filters.userName.toLowerCase()))
    }

    if (filters.email) {
      result = result.filter((user) => user.email.toLowerCase().includes(filters.email.toLowerCase()))
    }

    if (filters.date) {
      result = result.filter((user) => user.createdAt.includes(filters.date))
    }

    if (filters.phoneNumber) {
      result = result.filter((user) => user.phoneNumber.includes(filters.phoneNumber))
    }

    if (filters.status) {
      result = result.filter((user) => user.status.toLowerCase() === filters.status.toLowerCase())
    }

    setFilteredUsers(result)
    setCurrentPage(1)
    setActiveFilterColumn(null)
  }

  const resetFilters = () => {
    setFilters({
      organization: "",
      userName: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    })
    setFilteredUsers(mockUsers ?? [])
    setCurrentPage(1)
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

  const generatePageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than the max to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include first page
      pageNumbers.push(1)

      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = 4
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("ellipsis1")
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis2")
      }

      // Always include last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = generatePageNumbers()
  if (isLoading) return <p>Loading users...</p>
  if (error) return <p>Error: {error.message}</p>

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
                            value={filters.userName}
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
                            value={filters.userName}
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
                            value={filters.userName}
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
                            value={filters.userName}
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
                            value={filters.userName}
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
                            value={filters.userName}
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
            {displayedUsers?.map((user) => (
              <tr key={user.id}>
                <td>{user.orgName}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.createdAt}</td>
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
            {displayedUsers?.length === 0 && (
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
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value))
              setCurrentPage(1) // Reset to first page when changing rows per page
            }}
          >
            {/* <option value="5">5</option> */}
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>out of {filteredUsers?.length}</span>
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
            {pageNumbers.map((pageNumber, index) =>
              pageNumber === "ellipsis1" || pageNumber === "ellipsis2" ? (
                <span key={`ellipsis-${index}`} className="ellipsis">
                  ...
                </span>
              ) : (
                <button
                  key={pageNumber}
                  className={`page-number ${currentPage === pageNumber ? "active" : ""}`}
                  onClick={() => setCurrentPage(Number(pageNumber))}
                >
                  {pageNumber}
                </button>
              ),
            )}
          </div>

          <button
            className="pagination-button next"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} color="green" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UsersPage

