import { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import ConnectionErrorModal from '../ConnectionError/ConnectionError';


export default function OldChatPage() {
  const [error, setError] = useState(false)
  const onConnectionError = (e: boolean) => {
    if (e) {
      setError(e)
      
    }
  }

  if (error) { 
    return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FAF7EC]">
          {/* Background Chat Interface - Blurred */}
          <div className="absolute inset-0">
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20 z-10" />
            
            {/* Blurred Chat Background */}
            <div className="absolute inset-0 blur-[8px]">
              <ChatInterface isError={onConnectionError} />
            </div>
          </div>
          
          {/* Connection Error Modal */}
          <ConnectionErrorModal />
        </div>
  )
  }
  return <ChatInterface isError={onConnectionError} />
}