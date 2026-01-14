import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ELearning Platform</h3>
            <p className="text-gray-400">Empowering learners worldwide with quality education.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/courses" className="hover:text-white">Courses</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => {}} className="hover:text-white">Help Center</button></li>
              <li><button onClick={() => {}} className="hover:text-white">Privacy Policy</button></li>
              <li><button onClick={() => {}} className="hover:text-white">Terms of Service</button></li>
              <li><button onClick={() => {}} className="hover:text-white">FAQ</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <button onClick={() => {}} className="text-gray-400 hover:text-white"><FaFacebook size={20} /></button>
              <button onClick={() => {}} className="text-gray-400 hover:text-white"><FaTwitter size={20} /></button>
              <button onClick={() => {}} className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></button>
              <button onClick={() => {}} className="text-gray-400 hover:text-white"><FaInstagram size={20} /></button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2024 ELearning Platform. Template by Nidhal Elkebir. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => {}} className="text-gray-400 hover:text-white text-sm">Privacy</button>
            <button onClick={() => {}} className="text-gray-400 hover:text-white text-sm">Terms</button>
            <button onClick={() => {}} className="text-gray-400 hover:text-white text-sm">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
