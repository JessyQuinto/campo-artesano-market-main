
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import CartSummary from '../cart/CartSummary';

type ShippingMethod = 'standard' | 'express';
type PaymentMethod = 'credit-card' | 'debit-card' | 'pse';

const CheckoutForm: React.FC = () => {
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    address: user?.address || '',
    city: '',
    state: '',
    zipCode: '',
    phone: user?.phone || '',
  });

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add space every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const formatExpiry = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardExpiry(formatExpiry(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    const requiredFields = [
      'firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode', 'phone'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Formulario incompleto",
        description: "Por favor complete todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }
    
    if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        toast({
          title: "Información de pago incompleta",
          description: "Por favor complete todos los campos de la tarjeta",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "No hay productos en el carrito",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart and show success
      clearCart();
      
      toast({
        title: "¡Pedido realizado con éxito!",
        description: "Gracias por tu compra en Campo Artesano",
      });
      
      // Redirect to confirmation page
      navigate('/pedido-confirmado');
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      toast({
        title: "Error al procesar el pedido",
        description: "Por favor intenta nuevamente más tarde",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-serif font-bold mb-6">Finalizar Compra</h1>
          
          <form onSubmit={handleSubmit}>
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Información Personal</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
                  required
                />
              </div>
            </div>
            
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Dirección de Envío</h2>
              
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    Departamento
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
                    required
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Amazonas">Amazonas</option>
                    <option value="Antioquia">Antioquia</option>
                    <option value="Arauca">Arauca</option>
                    <option value="Atlántico">Atlántico</option>
                    <option value="Bolívar">Bolívar</option>
                    <option value="Boyacá">Boyacá</option>
                    <option value="Caldas">Caldas</option>
                    <option value="Caquetá">Caquetá</option>
                    <option value="Casanare">Casanare</option>
                    <option value="Cauca">Cauca</option>
                    <option value="Cesar">Cesar</option>
                    <option value="Chocó">Chocó</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Cundinamarca">Cundinamarca</option>
                    <option value="Guainía">Guainía</option>
                    <option value="Guaviare">Guaviare</option>
                    <option value="Huila">Huila</option>
                    <option value="La Guajira">La Guajira</option>
                    <option value="Magdalena">Magdalena</option>
                    <option value="Meta">Meta</option>
                    <option value="Nariño">Nariño</option>
                    <option value="Norte de Santander">Norte de Santander</option>
                    <option value="Putumayo">Putumayo</option>
                    <option value="Quindío">Quindío</option>
                    <option value="Risaralda">Risaralda</option>
                    <option value="San Andrés y Providencia">San Andrés y Providencia</option>
                    <option value="Santander">Santander</option>
                    <option value="Sucre">Sucre</option>
                    <option value="Tolima">Tolima</option>
                    <option value="Valle del Cauca">Valle del Cauca</option>
                    <option value="Vaupés">Vaupés</option>
                    <option value="Vichada">Vichada</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Código Postal
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
                  required
                />
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Método de envío</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="shipping-standard"
                      name="shipping-method"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="h-4 w-4 text-campo-brown focus:ring-campo-brown"
                    />
                    <label htmlFor="shipping-standard" className="ml-3 block text-sm font-medium text-gray-700">
                      Estándar (3-5 días hábiles)
                    </label>
                    <span className="ml-auto text-sm font-medium text-gray-900">Gratis</span>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="shipping-express"
                      name="shipping-method"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="h-4 w-4 text-campo-brown focus:ring-campo-brown"
                    />
                    <label htmlFor="shipping-express" className="ml-3 block text-sm font-medium text-gray-700">
                      Express (1-2 días hábiles)
                    </label>
                    <span className="ml-auto text-sm font-medium text-gray-900">$15.000</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Información de Pago</h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Método de pago</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="payment-credit-card"
                      name="payment-method"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={() => setPaymentMethod('credit-card')}
                      className="h-4 w-4 text-campo-brown focus:ring-campo-brown"
                    />
                    <label htmlFor="payment-credit-card" className="ml-3 flex items-center">
                      <CreditCard size={20} className="text-gray-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Tarjeta de Crédito</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="payment-debit-card"
                      name="payment-method"
                      value="debit-card"
                      checked={paymentMethod === 'debit-card'}
                      onChange={() => setPaymentMethod('debit-card')}
                      className="h-4 w-4 text-campo-brown focus:ring-campo-brown"
                    />
                    <label htmlFor="payment-debit-card" className="ml-3 flex items-center">
                      <CreditCard size={20} className="text-gray-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Tarjeta Débito</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="payment-pse"
                      name="payment-method"
                      value="pse"
                      checked={paymentMethod === 'pse'}
                      onChange={() => setPaymentMethod('pse')}
                      className="h-4 w-4 text-campo-brown focus:ring-campo-brown"
                    />
                    <label htmlFor="payment-pse" className="ml-3 block text-sm font-medium text-gray-700">
                      PSE (Pago en línea)
                    </label>
                  </div>
                </div>
              </div>
              
              {(paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      id="card-number"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre en la tarjeta
                    </label>
                    <input
                      type="text"
                      id="card-name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="JUAN PÉREZ"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de expiración
                      </label>
                      <input
                        type="text"
                        id="card-expiry"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
                      />
                    </div>
                    <div>
                      <label htmlFor="card-cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="card-cvv"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-campo-brown"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className={`w-full py-3 px-6 rounded-md flex items-center justify-center ${
                isSubmitting || items.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-campo-brown text-white hover:bg-opacity-90'
              }`}
            >
              {isSubmitting ? (
                <span>Procesando...</span>
              ) : (
                <>
                  <Check size={20} className="mr-2" />
                  <span>Confirmar Pedido</span>
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <CartSummary hideCheckoutButton />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
