'use client';

import { useEffect, useRef, useState } from 'react';
declare global {
  interface Window {
    watsonAssistantChatOptions?: any;
    WatsonAssistantChatInstance?: {
      destroy: () => void;
    };
  }
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
	const [bot, setBot] = useState<0 | 1>(1); // 0 = Copilot, 1 = Watson
	const scriptInjected = useRef(false);

	const loadWatson = () => {
		if (scriptInjected.current) return;
		scriptInjected.current = true;

		window.watsonAssistantChatOptions = {
			integrationID: process.env.NEXT_PUBLIC_WATSON_INTEGRATION_ID,
			region: process.env.NEXT_PUBLIC_WATSON_REGION,
			serviceInstanceID: process.env.NEXT_PUBLIC_WATSON_SERVICE_ID,
			orchestrateUIAgentExtensions: false,
			onLoad: async (instance: any) => {
				await instance.render();
				window.WatsonAssistantChatInstance = instance;
			},
		};

		const script = document.createElement('script');
		script.src = `https://web-chat.global.assistant.watson.appdomain.cloud/versions/${window.watsonAssistantChatOptions.clientVersion || 'latest'}/WatsonAssistantChatEntry.js`;
		script.async = true;
		document.head.appendChild(script);
	};

	// Manage bot changes
	useEffect(() => {
		if (bot === 1 && isOpen) {
			loadWatson();
		}

		if (bot === 0 && window.WatsonAssistantChatInstance) {
			window.WatsonAssistantChatInstance.destroy();
			delete window.WatsonAssistantChatInstance;
			scriptInjected.current = false;
		}
	}, [bot, isOpen]);

	// Close Watson when toggling off
	useEffect(() => {
		if (!isOpen && bot === 1 && window.WatsonAssistantChatInstance) {
			window.WatsonAssistantChatInstance.destroy();
			delete window.WatsonAssistantChatInstance;
			scriptInjected.current = false;
		}

		if (isOpen && bot === 1) {
			loadWatson();
		}
	}, [isOpen]);

  return (
    <main className="relative min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <header className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold tracking-wide">VisaLegal Costa Rica</h1>
        <nav className="space-x-6 text-sm">
          <span className="cursor-pointer hover:underline">Our Services</span>
          <span className="cursor-pointer hover:underline">About Us</span>
          <span className="cursor-pointer hover:underline">Insights</span>
          <span className="cursor-pointer hover:underline">Contact</span>
        </nav>
      </header>

      {/* Hero */}
      <section
        className="h-[80vh] bg-cover bg-center flex flex-col justify-center px-8 text-white"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="bg-black/60 p-8 rounded max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">Costa Rica’s Legal Gateway</h2>
          <p className="text-lg">
            Our office is based in San José, the nation’s capital. While our clients span the country, from the peaks of Arenal to the coasts of Guanacaste.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="p-8 max-w-4xl mx-auto space-y-6">
        <p>
          San José serves as the economic, governmental, and cultural heart of Costa Rica. VisaLegal helps individuals and organizations navigate the country's immigration landscape.
        </p>
        <p>
          We assist with temporary work permits, residency programs, renewals, and naturalization — simplifying the immigration journey.
        </p>
      </section>

      {/* Floating chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
      >
        {isOpen ? 'Close Chat' : 'Chat with Us'}
      </button>

      {/* Copilot iframe shown only if bot = 0 */}
      {isOpen && bot === 0 && (
        <div className="fixed bottom-20 right-6 w-[360px] h-[500px] bg-white border shadow-xl z-40 rounded overflow-hidden">
          <iframe
            src={process.env.NEXT_PUBLIC_COPILOT_IFRAME_URL}
            title="Immigration Assistant Bot"
            className="w-full h-full"
          />
        </div>
      )}
    </main>
  );
}
