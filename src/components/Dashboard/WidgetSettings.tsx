import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useWidgetStore } from '../../store/widgetStore';
import { useAuthStore } from '../../store/authStore';

const WidgetSettings: React.FC = () => {
  const { user } = useAuthStore();
  const { settings, fetchSettings, updateSettings } = useWidgetStore();
  
  const [businessName, setBusinessName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#4f46e5');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [salesRepresentative, setSalesRepresentative] = useState('');
  const [fallbackMessage, setFallbackMessage] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  useEffect(() => {
    if (user) {
      fetchSettings(user.id);
    }
  }, [user, fetchSettings]);
  
  useEffect(() => {
    if (settings) {
      setBusinessName(settings.business_name);
      setPrimaryColor(settings.primary_color);
      setWelcomeMessage(settings.welcome_message);
      setSalesRepresentative(settings.sales_representative);
      setFallbackMessage(settings.fallback_message);
    }
  }, [settings]);
  
  const handleSave = async () => {
    if (!user) return;
    
    await updateSettings({
      business_name: businessName,
      primary_color: primaryColor,
      welcome_message: welcomeMessage,
      sales_representative: salesRepresentative,
      fallback_message: fallbackMessage,
    });
  };
  
  if (!settings) {
    return <div className="p-6">Loading settings...</div>;
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Widget Settings</h1>
      
      <div className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
            Primary Color
          </label>
          <div className="mt-1 flex items-center">
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-10 h-10 rounded-md border border-gray-300 shadow-sm"
              style={{ backgroundColor: primaryColor }}
            />
            <span className="ml-3">{primaryColor}</span>
          </div>
          
          {showColorPicker && (
            <div className="mt-2">
              <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="salesRepresentative" className="block text-sm font-medium text-gray-700">
            Sales Representative Name
          </label>
          <input
            id="salesRepresentative"
            type="text"
            value={salesRepresentative}
            onChange={(e) => setSalesRepresentative(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="welcomeMessage" className="block text-sm font-medium text-gray-700">
            Welcome Message
          </label>
          <textarea
            id="welcomeMessage"
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="fallbackMessage" className="block text-sm font-medium text-gray-700">
            Fallback Message (when no match is found)
          </label>
          <textarea
            id="fallbackMessage"
            value={fallbackMessage}
            onChange={(e) => setFallbackMessage(e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetSettings;