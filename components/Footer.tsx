'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TermsAndConditions from './TermsAndConditions';
import RefundPolicy from './RefundPolicy';
import { useState } from 'react';

export default function Footer() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const pathname = usePathname()
  return (
    <footer className="bg-gray-900 text-white border-t-2 border-dashed">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className='flex flex-col items-center gap-2'>
            <Link href="/">
              <Image
                src="/logo/sm.png"
                width={50}
                height={50}
                alt='logo'
              />
            </Link>
            <p className="text-gray-400">Your space, your terms.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link href="#" className="hover:text-indigo-400">About Us</Link></li>
              <li className="mb-2"><Link href="/contact-us" className="hover:text-indigo-400">Contact</Link></li>
              <li className="mb-2"><Link href="/faq" className="hover:text-indigo-400">FAQ</Link></li>
              <li className="mb-2"><Link href="/property-search" className="hover:text-indigo-400">Search</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul>
              <li className="mb-2"><button onClick={() => setModalOpen(true)} className="hover:text-indigo-400">Privacy Policy</button></li>
              <li className="mb-2"><button onClick={() => setOpenModal(true)} className="hover:text-indigo-400">Terms of Service</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/share/16vC6j8uR9/" target='_blank' className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </Link>
              <Link href="https://x.com/Spacematch_?t=QLD18b6t7e-ENBG6HEcXyQ&s=08" target='_blank' className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </Link>
              <Link href="https://www.instagram.com/space_match?igsh=YmFxN3RrOXh3ajlk" target='_blank' className="text-gray-400 hover:text-white">
                <Image
                  src={"/icons/instagram.svg"}
                  width={20}
                  height={20}
                  alt=''
                  className='bg-gray-400 rounded-full hover:bg-slate-50'
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Spacematch. All rights reserved.</p>
        </div>
      </div>
      <RefundPolicy modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      <TermsAndConditions openModal={openModal} setOpenModal={setOpenModal}/>
    </footer>
  );
}