const SESSION_KEY = 'whereby_room_session'
const CLEANUP_KEY = 'whereby_cleanup_pending'
const SESSION_TIMEOUT = 4 * 60 * 60 * 1000 // 4 hours in milliseconds

export function useSession() {
  /**
   * Save the current room session to localStorage
   */
  const saveSession = (roomId, username, userId) => {
    const session = {
      roomId,
      username,
      userId,
      timestamp: Date.now()
    }

    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } catch (error) {
      console.error('Failed to save session:', error)
    }
  }

  /**
   * Get pending cleanup data
   */
  const getPendingCleanup = () => {
    try {
      const cleanupData = localStorage.getItem(CLEANUP_KEY)
      if (!cleanupData) {
        return null
      }
      return JSON.parse(cleanupData)
    } catch (error) {
      console.error('Failed to get pending cleanup:', error)
      return null
    }
  }

  /**
   * Clear pending cleanup flag
   */
  const clearPendingCleanup = () => {
    try {
      localStorage.removeItem(CLEANUP_KEY)
    } catch (error) {
      console.error('Failed to clear pending cleanup:', error)
    }
  }

  /**
   * Get the current session from localStorage
   */
  const getSession = () => {
    try {
      const sessionData = localStorage.getItem(SESSION_KEY)
      if (!sessionData) {
        return null
      }

      const session = JSON.parse(sessionData)

      // Check if session has expired
      if (!isSessionValid(session)) {
        clearSession()
        return null
      }

      return session
    } catch (error) {
      console.error('Failed to get session:', error)
      return null
    }
  }

  /**
   * Check if a session is still valid (not expired)
   */
  const isSessionValid = (session) => {
    if (!session || !session.timestamp) {
      return false
    }

    const now = Date.now()
    const sessionAge = now - session.timestamp

    return sessionAge < SESSION_TIMEOUT
  }

  /**
   * Clear the current session from localStorage
   */
  const clearSession = () => {
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch (error) {
      console.error('Failed to clear session:', error)
    }
  }

  /**
   * Update the session timestamp to keep it alive
   */
  const refreshSession = () => {
    const session = getSession()
    if (session) {
      session.timestamp = Date.now()
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      } catch (error) {
        console.error('Failed to refresh session:', error)
      }
    }
  }

  return {
    saveSession,
    getSession,
    clearSession,
    refreshSession,
    isSessionValid,
    getPendingCleanup,
    clearPendingCleanup
  }
}
