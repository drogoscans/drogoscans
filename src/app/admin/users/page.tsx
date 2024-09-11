"use client"

import { getAllUsers } from "@/lib/users/user.action"
import { User } from "@/types"
import { useEffect, useState } from "react"
import UserTable from "./_components/userTable"


const Userspage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const allUsers = await getAllUsers()
      setUsers(allUsers.users)
    } catch (err) {
      setError("Failed to fetch users. Please try again.")
    }
  }

  return (
    <div>
      <h1>User Management</h1>
      <UserTable users={users}/>
    </div>
  )
}

export default Userspage
