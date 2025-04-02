import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, HelpCircle } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface VoiceAssistantProps {
  onAddToCart: (productName: string) => void;
}

export function VoiceAssistant({ onAddToCart }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  
  const commands = [
    {
      command: ['add *', 'order *', 'buy *'],
      callback: (product: string) => {
        setFeedback(`Adding ${product} to cart...`);
        onAddToCart(product);
        speak(`Added ${product} to your cart`);
      }
    },
    {
      command: 'show help',
      callback: () => setShowHelp(true)
    },
    {
      command: 'hide help',
      callback: () => setShowHelp(false)
    },
    {
      command: 'clear feedback',
      callback: () => setFeedback('')
    }
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!isListening) {
      SpeechRecognition.startListening({ continuous: true });
      speak("Voice assistant activated. How can I help you?");
    } else {
      SpeechRecognition.stopListening();
      speak("Voice assistant deactivated.");
      resetTranscript();
    }
    setIsListening(!isListening);
  };

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-100 text-red-700 p-4 rounded-lg shadow-lg">
        Browser doesn't support speech recognition.
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={toggleListening}
            className={`p-3 rounded-full transition-colors ${
              isListening ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
            }`}
          >
            {isListening ? (
              <Mic className="w-6 h-6" />
            ) : (
              <MicOff className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
        
        {showHelp && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
            <h4 className="font-medium mb-2">Voice Commands:</h4>
            <ul className="space-y-1 text-gray-600">
              <li>"add [product]" - Add item to cart</li>
              <li>"order [product]" - Add item to cart</li>
              <li>"buy [product]" - Add item to cart</li>
              <li>"show help" - Show this help</li>
              <li>"hide help" - Hide this help</li>
            </ul>
          </div>
        )}
        
        {isListening && (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-500 animate-pulse" />
              <span className="text-sm text-gray-600">Listening...</span>
            </div>
            {transcript && (
              <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded">
                {transcript}
              </p>
            )}
          </div>
        )}
        
        {feedback && (
          <div className="mt-2 p-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}