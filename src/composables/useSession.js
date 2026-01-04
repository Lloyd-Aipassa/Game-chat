const SESSION_KEY = 'whereby_room_session'
const CLEANUP_KEY = 'whereby_cleanup_pending'

export function useSession() {
  /**
   * Save the current room session to localStorage
   */
  const saveSession = (roomId, username, userId) => {
    const session = {
      roomId,
      username,
      userId
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

      // Basic validation - just check if required fields exist
      if (!session || !session.roomId || !session.username || !session.userId) {
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
   * Check if a session is still valid (no timeout - always valid if it exists)
   */
  const isSessionValid = (session) => {
    return !!(session && session.roomId && session.username && session.userId)
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

  return {
    saveSession,
    getSession,
    clearSession,
    isSessionValid,
    getPendingCleanup,
    clearPendingCleanup
  }
}
