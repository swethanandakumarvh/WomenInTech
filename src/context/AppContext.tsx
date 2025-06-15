import { createContext, useContext, useReducer, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  field: string
  level: string
  readinessScore: number
  completedProjects: number
  githubConnected: boolean
}

interface Project {
  id: string
  title: string
  description: string
  field: string
  level: string
  status: 'not-started' | 'in-progress' | 'completed'
  progress: number
  estimatedHours: number
  technologies: string[]
  goals: string[]
  milestones: string[]
  githubRepo?: string
}

interface AppState {
  user: User | null
  projects: Project[]
  currentProject: Project | null
  isOnboarded: boolean
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'SET_CURRENT_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT_PROGRESS'; payload: { id: string; progress: number } }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'CONNECT_GITHUB' }

const initialState: AppState = {
  user: null,
  projects: [],
  currentProject: null,
  isOnboarded: false,
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload }
    case 'SET_CURRENT_PROJECT':
      return { ...state, currentProject: action.payload }
    case 'UPDATE_PROJECT_PROGRESS':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id
            ? { ...project, progress: action.payload.progress }
            : project
        )
      }
    case 'COMPLETE_ONBOARDING':
      return { ...state, isOnboarded: true }
    case 'CONNECT_GITHUB':
      return {
        ...state,
        user: state.user ? { ...state.user, githubConnected: true } : null
      }
    default:
      return state
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}