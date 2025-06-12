/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GlobalStoreState {
  snackbar: {
    open: boolean
    message: string
    severity: string
  }
  openSnackbar: (message?: string, severity?: string) => void
  closeSnackbar: () => void

  // Login state
  isLoggedIn: boolean
  setLoggedIn: (value: boolean) => void
}

export const useGlobalStore = create<GlobalStoreState>()(
  persist(
    (set) => ({
      snackbar: {
        open: false,
        message: '',
        severity: '',
      },
      openSnackbar: (message = '', severity = '') => {
        set({ snackbar: { open: true, message, severity } })
      },
      closeSnackbar: () => {
        set({ snackbar: { open: false, message: '', severity: '' } })
      },

      isLoggedIn: false,
      setLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
    }),
    {
      name: 'global-storage-dll',
      partialize: (state) => ({
        snackbar: state.snackbar,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
)