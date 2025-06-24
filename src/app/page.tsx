'use client';

import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-white text-gray-800">
      {/* Fake Navbar */}
      <header className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold tracking-wide">VisaLegal Costa Rica</h1>
        <nav className="space-x-6 text-sm">
          <span className="cursor-pointer hover:underline">Our Services</span>
          <span className="cursor-pointer hover:underline">About Us</span>
          <span className="cursor-pointer hover:underline">Insights</span>
          <span className="cursor-pointer hover:underline">Contact</span>
        </nav>
      </header>

      {/* Hero section */}
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

      {/* Content section */}
      <section className="p-8 max-w-4xl mx-auto space-y-6">
        <p>
          As the capital and largest city in Costa Rica, San José serves as the economic, governmental, and cultural heart of the country. With a strategic location in Central America, a tech-ready infrastructure, and a highly educated, bilingual workforce, the city has become a landing point for global companies and entrepreneurs.
        </p>

        <p>
          VisaLegal Costa Rica supports individuals, families, and organizations of all sizes in navigating the country’s evolving immigration landscape. Whether you're a startup founder, corporate HR manager, retiree, or regional investor, our team provides guidance on everything from temporary work permits and permanent residency to rentista and retiree programs.
        </p>

        <p>
          Our services include full process compliance, document preparation, visa renewals, naturalization support, and coordination across Central America — helping clients centralize their immigration needs in one place.
        </p>
      </section>

      {/* Floating chatbot button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
      >
        {isOpen ? 'Close Chat' : 'Chat with Us'}
      </button>

      {/* Chatbot iframe */}
      {isOpen && (
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
