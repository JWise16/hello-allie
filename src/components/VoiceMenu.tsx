"use client";

import { useState, useRef, useEffect } from "react";
import { AGENT_CONFIG } from "../lib/constants";

export type VoiceOption = "sage" | "alloy" | "coral" | "fable" | "nova" | "shimmer";

interface VoiceMenuProps {
  currentVoice: VoiceOption;
  onVoiceChange: (voice: VoiceOption) => void;
  currentInstructions: string;
  onInstructionsChange: (instructions: string) => void;
}

export default function VoiceMenu({ 
  currentVoice, 
  onVoiceChange, 
  currentInstructions, 
  onInstructionsChange 
}: VoiceMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const voiceOptions: VoiceOption[] = ["sage", "alloy", "coral", "fable", "nova", "shimmer"];

  const handleVoiceSelect = (voice: VoiceOption) => {
    onVoiceChange(voice);
    // Don't close the menu when selecting an option
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const restoreDefaults = () => {
    onVoiceChange("sage");
    onInstructionsChange(AGENT_CONFIG.instructions);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu Button - Fixed position */}
      <button
        onClick={toggleMenu}
        className={`fixed top-8 right-8 z-50 w-12 h-12 rounded-full backdrop-blur-sm text-white border transition-all duration-300 flex items-center justify-center ${
          isOpen 
            ? 'bg-white/30 border-white opacity-0 pointer-events-none' 
            : 'bg-white/20 border-white/30 hover:bg-white/30'
        }`}
      >
        <svg 
          className="w-6 h-6 transition-transform duration-300" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
        </svg>
      </button>

      {/* Sliding Navigation Bar */}
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-96 bg-white/95 backdrop-blur-sm shadow-2xl border-l border-white/30 transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Voice Settings</h2>
          <button
            onClick={toggleMenu}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-full">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Select Voice</h3>
            <p className="text-sm text-gray-600 mb-6">
              Choose the voice that best suits your preference for Allie&apos;s responses.
            </p>
          </div>

          {/* Voice Options */}
          <div className="space-y-2 mb-8">
            {voiceOptions.map((voice) => (
              <button
                key={voice}
                onClick={() => handleVoiceSelect(voice)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                  currentVoice === voice 
                    ? 'bg-red-50 border-2 border-red-200 text-red-700' 
                    : 'bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="capitalize font-medium">{voice}</span>
                  {currentVoice === voice && (
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Instructions Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Instructions</h3>
            <p className="text-sm text-gray-600 mb-4">
              Customize how Allie should behave and respond to you.
            </p>
            <textarea
              value={currentInstructions}
              onChange={(e) => onInstructionsChange(e.target.value)}
              className="w-full h-64 p-4 text-sm text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:border-red-300 focus:bg-white transition-colors duration-200 font-mono whitespace-pre-wrap"
              placeholder="Enter instructions for the voice agent..."
              style={{ lineHeight: '1.5' }}
            />
          </div>

          {/* Restore Defaults Button */}
          <div className="flex justify-center">
            <button
              onClick={restoreDefaults}
              className="px-8 py-4 rounded-3xl bg-white text-gray-800 font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-black"
            >
              Restore Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 