export function useSessionStore() {

  const setUser = (user: any) => {
    sessionStorage.setItem('user', JSON.stringify(user))
  }
  const getUser = (): any | null => {
    const user = sessionStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
  const isLoggedIn = (): boolean => {
    return sessionStorage.getItem('user') !== null
  }


  const getLogs = (): any | null => {
      const user = sessionStorage.getItem('attlogs')
      return user ? JSON.parse(user) : null
  }
  const updateLogs = (attlogs: any) => {
      sessionStorage.setItem('attlogs', JSON.stringify(attlogs))
  }
  const saveLog = (log: any) => {
    const attlogs = getLogs()
    if (attlogs) {
        const index = attlogs.findIndex(att => att.date === log.date && att.time === log.time && att.type === log.type)
        if (index !== -1) {
            attlogs[index] = log
            updateLogs(attlogs)
        }
    }
  }

  const removeAttlogSession = () => {
      sessionStorage.removeItem('attlogs')
  }

  const removeUserSession = () => {
      sessionStorage.removeItem('user')
  }

  const logout = () => {
    sessionStorage.clear()
  }

  return {
    setUser,
    getUser,
    logout,
    isLoggedIn,
    getLogs,
    saveLog,
    updateLogs,
    removeAttlogSession,
    removeUserSession
  }
}
