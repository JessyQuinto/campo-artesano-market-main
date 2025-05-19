
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: number;
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

const AUTH_STORAGE_KEY = 'campo-artesano-auth';

// Save auth state to storage
const saveAuthToStorage = (auth: AuthState) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

// Load auth state from storage
const loadAuthFromStorage = (): AuthState => {
  try {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedAuth) return { user: null, isAuthenticated: false };
    
    return JSON.parse(storedAuth) as AuthState;
  } catch (error) {
    console.error("Error loading auth from storage:", error);
    return { user: null, isAuthenticated: false };
  }
};

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState = loadAuthFromStorage();
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { toast } = useToast();

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    saveAuthToStorage(state);
  }, [state]);

  // Mock login function (simulated async)
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, accept any credentials with valid format
      if (email && password.length >= 6) {
        const mockUser: User = {
          id: 1,
          name: email.split('@')[0], // Extract name from email
          email: email,
        };
        
        dispatch({ type: 'LOGIN', payload: mockUser });
        
        toast({
          title: "Sesión iniciada",
          description: `Bienvenido de nuevo, ${mockUser.name}`,
        });
        
        return true;
      }
      
      toast({
        title: "Error de inicio de sesión",
        description: "Credenciales incorrectas. Inténtalo de nuevo.",
        variant: "destructive",
      });
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      
      toast({
        title: "Error de inicio de sesión",
        description: "Ha ocurrido un error. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  // Mock logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado tu sesión correctamente.",
    });
  };

  // Mock register function (simulated async)
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, accept any well-formed registration
      if (name && email && password.length >= 6) {
        const mockUser: User = {
          id: Date.now(), // Generate a unique ID
          name: name,
          email: email,
        };
        
        dispatch({ type: 'LOGIN', payload: mockUser });
        
        toast({
          title: "¡Registro exitoso!",
          description: `Bienvenido a Campo Artesano, ${mockUser.name}`,
        });
        
        return true;
      }
      
      toast({
        title: "Error de registro",
        description: "Por favor completa todos los campos correctamente.",
        variant: "destructive",
      });
      
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      
      toast({
        title: "Error de registro",
        description: "Ha ocurrido un error. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
    
    toast({
      title: "Perfil actualizado",
      description: "Tu información ha sido actualizada correctamente.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
