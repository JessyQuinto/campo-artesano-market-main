
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor complete todos los campos');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      const success = await register(name, email, password);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError('Error al registrar usuario');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-campo-dark">Crear Cuenta</h2>
        <p className="text-gray-500 mt-2">¡Únete a Campo Artesano!</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
            placeholder="Juan Pérez"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-gray-400" />
              ) : (
                <Eye size={18} className="text-gray-400" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md bg-campo-brown text-white hover:bg-opacity-90 ${
            isLoading ? 'opacity-70 cursor-wait' : ''
          }`}
        >
          {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-campo-brown hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
      
      <div className="mt-4 text-xs text-center text-gray-500">
        Al crear una cuenta, aceptas nuestros{' '}
        <Link to="/terminos" className="text-campo-brown hover:underline">
          Términos y Condiciones
        </Link>{' '}
        y{' '}
        <Link to="/privacidad" className="text-campo-brown hover:underline">
          Política de Privacidad
        </Link>.
      </div>
    </div>
  );
};

export default RegisterForm;
