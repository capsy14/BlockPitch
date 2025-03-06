// Simple in-memory database for demonstration
// In a production app, you would use a real database like MongoDB, PostgreSQL, etc.

const users = []

export const db = {
  users: {
    create: (userData) => {
      const newUser = { id: Date.now().toString(), ...userData }
      users.push(newUser)
      return newUser
    },
    findUnique: ({ where }) => {
      if (where.email) {
        return users.find((user) => user.email === where.email) || null
      }
      if (where.id) {
        return users.find((user) => user.id === where.id) || null
      }
      return null
    },
    findMany: (query = {}) => {
      let result = [...users]

      if (query.where?.role) {
        result = result.filter((user) => user.role === query.where.role)
      }

      return result
    },
  },
}

