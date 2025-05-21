
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabaseClient';

const SupabaseConnectionStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'failed'>('checking');
  const [message, setMessage] = useState<string>('Checking connection...');
  const [isChecking, setIsChecking] = useState(true);

  const checkConnection = async () => {
    setIsChecking(true);
    setStatus('checking');
    setMessage('Checking connection...');
    
    // First, check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setStatus('failed');
      setMessage('Supabase environment variables are not configured.');
      setIsChecking(false);
      return;
    }
    
    try {
      const { error } = await supabase.from('products').select('count');  // Changed from 'Products' to 'products' (lowercase)
      
      if (error) {
        console.error('Connection test failed:', error);
        setStatus('failed');
        setMessage(`Connection failed: ${error.message}`);
      } else {
        setStatus('connected');
        setMessage('Successfully connected to Supabase! Products table is accessible.');
      }
    } catch (err: any) {
      console.error('Connection test error:', err);
      setStatus('failed');
      setMessage(`Connection error: ${err.message}`);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {status === 'checking' && <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />}
          {status === 'connected' && <CheckCircle className="h-5 w-5 text-green-500" />}
          {status === 'failed' && <XCircle className="h-5 w-5 text-red-500" />}
          <h3 className="font-medium">Supabase Connection Status</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={checkConnection}
          disabled={isChecking}
        >
          {isChecking ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Test Connection
        </Button>
      </div>
      <p className={`mt-2 text-sm ${
        status === 'connected' ? 'text-green-600' : 
        status === 'failed' ? 'text-red-600' : 'text-blue-600'
      }`}>
        {message}
      </p>
      {status === 'failed' && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm">
          <p className="font-medium text-red-800">Troubleshooting tips:</p>
          <ul className="list-disc pl-5 mt-1 text-red-700">
            <li>Check that your Supabase URL and anon key are correctly set in the environment variables.</li>
            <li>Verify that the Products table exists in your Supabase database.</li>
            <li>Ensure your browser allows connections to Supabase (no CORS issues).</li>
            <li>Check if you have proper permissions to access the table.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SupabaseConnectionStatus;
