import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-10">
            <div className="container mx-auto flex flex-row lg:flex-row justify-between items-center mb-8">
                <div className="text-center lg:text-left mb-8 lg:mb-0">
                    <h2 className="text-xl mb-4">Want us to email you with the latest blockbuster news?</h2>
                    <div className="flex justify-center lg:justify-start">
                        <input
                            type="email"
                            placeholder="example@company.com"
                            className="px-4 py-2 border border-gray-300 rounded-l-md w-full max-w-xs"
                        />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md">Subscribe</button>
                    </div>
                </div>
                <div className="text-center lg:text-left flex flex-col">
                    <p className="max-w-xl mx-auto mb-4 lg:mb-0">
                        Our experienced instructors will guide you through structured lessons, helping you develop a solid foundation while nurturing your creativity and musical expression.
                    </p>
                    <div className="flex justify-center lg:justify-start space-x-4">
                        <a href="#" className="text-blue-500"><FaFacebook size={24} /></a>
                        <a href="#" className="text-blue-500"><FaInstagram size={24} /></a>
                        <a href="#" className="text-blue-500"><FaTwitter size={24} /></a>
                        <a href="#" className="text-blue-500"><FaGithub size={24} /></a>
                        <a href="#" className="text-blue-500"><FaDribbble size={24} /></a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto flex flex-col lg:flex-row justify-between mb-8">
                <div className="mb-8 lg:mb-0">
                    <h4 className="font-bold mb-2">Services</h4>
                    <ul>
                        <li><a href="#" className="text-blue-500 hover:underline">Rock and Yoga</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Healthy Diet</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Fit to Health</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Exercise</a></li>
                    </ul>
                </div>
                <div className="mb-8 lg:mb-0">
                    <h4 className="font-bold mb-2">About</h4>
                    <ul>
                        <li><a href="#" className="text-blue-500 hover:underline">About</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Careers</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">History</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Our Team</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-2">Support</h4>
                    <ul>
                        <li><a href="#" className="text-blue-500 hover:underline">FAQs</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Contact</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Live Chat</a></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto text-center">
                <p className="text-sm text-gray-600">© Company 2022. All rights reserved. Created with Yoga Master</p>
            </div>
        </footer>
    );
};

export default Footer;
