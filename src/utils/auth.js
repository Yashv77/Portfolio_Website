// Very basic authentication for a frontend-only site.
// In a real scenario, this is not secure, but satisfies the requirement.
export const authenticate = async (password) => {
  // Using a simple SHA-256 hash using Web Crypto API to match 'admin123'
  // In a real app, you'd store this hash in an env variable
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  // Hash for 'admin123'
  const expectedHash = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
  
  if (hashHex === expectedHash) {
    localStorage.setItem('isAdminAuthenticated', 'true')
    return true
  }
  return false
}

export const isAuthenticated = () => {
  return localStorage.getItem('isAdminAuthenticated') === 'true'
}

export const logout = () => {
  localStorage.removeItem('isAdminAuthenticated')
}
