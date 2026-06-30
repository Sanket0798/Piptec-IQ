// Shared app-level mock data: the signed-in user and primary navigation.

export const user = {
  name: 'Aarav Mehta',
  email: 'developer@airrchip.in',
  role: 'Plant Director',
  initials: 'AM',
}

export const nav = {
  menu: [
    { id: 'command-center', label: 'Command Center', icon: 'dashboard', to: '/', badge: 'AI Brief' },
    { id: 'production-iq', label: 'Production IQ', icon: 'factory', to: '/production', badge: 'Delay AI' },
  ],
  general: [
    { id: 'settings', label: 'Settings', icon: 'settings', to: '#' },
    { id: 'help', label: 'Help', icon: 'help', to: '#' },
    { id: 'logout', label: 'Logout', icon: 'logout', to: '#' },
  ],
}
