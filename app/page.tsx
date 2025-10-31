'use client'

import Footer from '@/components/Footer';
import { Loader, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { RiSpeakAiFill } from "react-icons/ri";

// --- Global API Constants and Helpers ---
// --- Global API Constants and Helpers ---
const apiKey = process.env.NEXT_PUBLIC_GEMINI_TTS_API_KEY;
const GENERATE_CONTENT_URL = process.env.NEXT_PUBLIC_GENERATE_CONTENT_URL+`?key=${apiKey}`
const TTS_URL = process.env.NEXT_PUBLIC_TTS_URL+`?key=${apiKey}`


// Helper for Exponential Backoff
const fetchWithExponentialBackoff = async (url: string, options: any, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return await response.json();
      }
      if (response.status === 429 && i < retries - 1) {
        const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw new Error(`API request failed with status ${response.status}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Helper for Base64 to ArrayBuffer (for TTS)
const base64ToArrayBuffer = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// Helper for PCM to WAV conversion (for TTS)
const pcmToWav = (pcmData: any, sampleRate:any) => {
  const buffer = new ArrayBuffer(44 + pcmData.byteLength);
  const view = new DataView(buffer);
  let offset = 0;

  const writeString = (str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
    offset += str.length;
  };

  const writeUint32 = (val: any) => {
    view.setUint32(offset, val, true);
    offset += 4;
  };

  const writeUint16 = (val: any) => {
    view.setUint16(offset, val, true);
    offset += 2;
  };

  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);

  // RIFF header
  writeString('RIFF');
  writeUint32(36 + pcmData.byteLength);
  writeString('WAVE');

  // fmt chunk
  writeString('fmt ');
  writeUint32(16);
  writeUint16(1);
  writeUint16(numChannels);
  writeUint32(sampleRate);
  writeUint32(byteRate);
  writeUint16(blockAlign);
  writeUint16(bitsPerSample);

  // data chunk
  writeString('data');
  writeUint32(pcmData.byteLength);

  // Write PCM data
  for (let i = 0; i < pcmData.length; i++) {
    view.setInt16(offset, pcmData[i], true);
    offset += 2;
  }

  return new Blob([view], { type: 'audio/wav' });
};

// Simple Markdown Renderer for LLM Output
const MarkdownRenderer = ({ content }: { content: any }) => {
    if (!content) return null;

    const formattedContent = content.split('\n').map((line: any, index: any) => {
        if (line.startsWith('###')) {
            return <h4 key={index} className="text-lg font-bold mt-3 mb-1 text-gray-800">{line.replace('###', '').trim()}</h4>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={index} className="font-semibold mt-2">{line.replace(/\*\*/g, '').trim()}</p>;
        }
        if (line.startsWith('* ') || line.startsWith('- ')) {
            return <li key={index} className="ml-5 list-disc text-sm text-gray-700">{line.substring(2).trim()}</li>;
        }
        if (line.trim() === '') return <br key={index} />;

        return <p key={index} className="text-sm text-gray-700">{line}</p>;
    });

    return <div className="p-4 bg-gray-50 rounded-lg mt-4 border border-gray-200">{formattedContent}</div>;
};

export default async function HomePage() {

  const [isReading, setIsReading] = useState(null); // Tracks which service ID is being read

  const readDescription = async (text: string, id: any) => {
    if (isReading === id) return; // Prevent double click

    setIsReading(id);
    try {
        const payload = {
            contents: [{
                parts: [{ text: `Say this service description clearly: ${text}` }]
            }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: "Puck" } // Upbeat voice
                    }
                }
            },
            model: "gemini-2.5-flash-preview-tts"
        };

        const result = await fetchWithExponentialBackoff(TTS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const part = result?.candidates?.[0]?.content?.parts?.[0];
        const audioData = part?.inlineData?.data;
        const mimeType = part?.inlineData?.mimeType;

        if (audioData && mimeType && mimeType.startsWith("audio/L16")) {
            const match = mimeType.match(/rate=(\d+)/);
            const sampleRate = match ? parseInt(match[1], 10) : 24000;
            const pcmData = base64ToArrayBuffer(audioData);
            const pcm16 = new Int16Array(pcmData);
            const wavBlob = pcmToWav(pcm16, sampleRate);
            const audioUrl = URL.createObjectURL(wavBlob);

            const audio = new Audio(audioUrl);
            audio.onended = () => {
                setIsReading(null);
                URL.revokeObjectURL(audioUrl);
            };
            audio.play().catch(e => {
                console.error("Audio playback error:", e);
                setIsReading(null);
            });
        } else {
            console.error("Invalid TTS response structure or mime type:", mimeType);
            setIsReading(null);
        }
    } catch (error) {
        console.error("Error generating or playing TTS audio:", error);
        setIsReading(null);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <header className="hero-bg pt-56 pb-32">
        <div className="container flex flex-col items-center gap-3 px-6 text-center ">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">Co-own Your Future. Build Together.</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Spacematch helps you pool resources with others to co-own land and create custom living spaces. Find partners, buy land, and build your dream home or rental property.
          </p>
          <button
            onClick={() => readDescription("Co-own Your Future. Build Together. Spacematch helps you pool resources with others to co-own land and create custom living spaces. Find partners, buy land, and build your dream home or rental property.", "heading")}
            disabled={isReading !== null}
            className={`inline-flex items-center text-sm font-medium rounded-full px-2 py-1 transition bg-gray-400 w-[150px] ${
                isReading === "heading"
                    ? 'bg-blue-200 text-main-100 cursor-wait'
                    : 'bg-blue-50 text-main-100 hover:bg-gray-300'
            }`}
          >
              {isReading === "heading" ? (
                  <div className='rounded-full bg-white inline-flex items-center justify-center text-sm px-2 py-1 w-full text-main-100'>
                      <Loader className="w-4 h-4 mr-1 animate-spin" /> Reading...
                  </div>
              ) : (
                  <div className='rounded-full bg-white inline-flex items-center justify-center text-sm px-2 py-1 w-full'>
                    <RiSpeakAiFill className="w-4 h-4 mr-1" /> Audio Version
                  </div>
              )}
          </button>
          <Link href="/property/search" className="bg-smred-100 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-smred-100/80 transition duration-300">
            Start Your Search
          </Link>
        </div>
      </header>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Spacematch Works</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {/* Step 1 */}
            <Link href={"/property/start-coownership"} className="flex flex-col items-center hover:text-main-100">
              <div className="bg-indigo-100 rounded-full p-6 mb-6 border border-dashed hover:border-l-smred-100 hover:border-r-main-100">
                <svg className="w-12 h-12 text-main-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Start Ownership Plan</h3>
              <p className="text-gray-600 hover:text-main-100">Connect with like-minded individuals or groups who share your vision for co-ownership. Our platform makes it easy to find compatible partners.</p>
              <div className='w-full p-2 my-4 transform transition-all duration-500 ease-in-out hover:scale-110 rounded-xl border border-main-100 hover:text-main-100 font-semibold'>Proceed to planning</div>
            </Link>
            {/* Step 2 */}
            <Link href={"/property/acquisition"} className="flex flex-col items-center hover:text-main-100">
              <div className="bg-indigo-100 rounded-full p-6 mb-6">
                <svg className="w-12 h-12 text-main-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Acquire Land</h3>
              <p className="text-gray-600">Once your group is formed, search for and acquire the perfect piece of land. We provide tools and resources to facilitate a smooth transaction.</p>
              <div className='w-full p-2 my-4 transform transition-all duration-500 ease-in-out hover:scale-110 border border-main-100 hover:text-main-100 font-semibold rounded-xl'>Proceed to Mathched Properties</div>
            </Link>
            {/* Step 3 */}
            <Link href={"/products"} className="flex flex-col items-center hover:text-main-100">
              <div className="bg-indigo-100 rounded-full p-6 mb-6">
                <svg className="w-12 h-12 text-main-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Build Your Solution</h3>
              <p className="text-gray-600">Choose from a curated range of housing products from our verified vendors. We manage the entire fulfillment process for you.</p>
              <div className='w-full p-2 my-4 transform transition-all duration-500 ease-in-out hover:scale-110 rounded-xl border border-main-100 hover:text-main-100 font-semibold'>Proceed to Build</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section with Image */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Seamless, Transparent, Secure</h2>
              <p className="text-gray-600 mb-6">
                We manage the fulfillment process from end-to-end. This means you get exactly what you paid for, and our trusted vendors are only paid upon confirmation of delivery. Your investment is protected every step of the way.
              </p>
              <Link href="#vendors" className="text-main-100 font-semibold hover:underline">
                Meet Our Verified Vendors &rarr;
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="/seemless.jpeg" alt="Modern house with a manicured lawn" className="rounded-lg shadow-xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Human-centric section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <img src="/community.jpeg" alt="Happy family in front of their house" className="rounded-lg shadow-xl w-full" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Building a Community, Not Just Houses</h2>
              <p className="text-gray-600 mb-6">
                Spacematch is more than a platform; it's a community of pioneers redefining homeownership. Connect with people who share your values and build a future that is both financially smart and personally fulfilling.
              </p>
              <Link href="/our-community" className="bg-main-100 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300">
                Join the Community
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vendor Section */}
      <section id="vendors" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Trusted Vendors</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">We partner with verified vendors to offer a curated range of high-quality, sustainable, and innovative housing products.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md">
              <img src="https://placehold.co/150x60/000000/FFFFFF?text=EcoBuild" alt="Vendor Logo 1" className="h-10" />
            </div>
            <div className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md">
              <img src="https://placehold.co/150x60/000000/FFFFFF?text=FutureHomes" alt="Vendor Logo 2" className="h-10" />
            </div>
            <div className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md">
              <img src="https://placehold.co/150x60/000000/FFFFFF?text=ModuLiving" alt="Vendor Logo 3" className="h-10" />
            </div>
            <div className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md">
              <img src="https://placehold.co/150x60/000000/FFFFFF?text=GreenArch" alt="Vendor Logo 4" className="h-10" />
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}