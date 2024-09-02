// PrivacyPolicy.js

import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="  p-8 bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600 ">
            <h1 className="text-4xl font-bold mb-6 text-[#122222]">Privacy Policy</h1>

            <p className="text-gray-900 mb-8">
                Welcome to our comprehensive e-commerce platform tailored for bikers. We
                prioritize the security and privacy of your information. This Privacy
                Policy outlines how we collect, use, and safeguard your data when you
                interact with our platform.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-[#122222]">1. Information We Collect</h2>
            <p className="text-gray-900 mb-6">
                We collect personal information when you create an account, make
                purchases, rent bikes, use workshop services, and engage with our
                platform. This includes but is not limited to your name, contact
                details, payment information, and preferences.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-[#122222]">2. How We Use Your Information</h2>
            <p className="text-gray-900 mb-6">
                Your information is used for providing and enhancing our services,
                processing transactions, and communicating with you. We may also use
                your data for personalized recommendations and to improve our platform's
                user experience.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-[#122222]">3. Information Sharing</h2>
            <p className="text-gray-700 mb-6">
                We may share your information with trusted third-party service
                providers who assist us in delivering and improving our services. Your
                data will not be sold or shared with unauthorized entities.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-[#122222]">4. Security Measures</h2>
            <p className="text-gray-900 mb-6">
                We prioritize the security of your data and employ industry-standard
                measures to protect it. This includes encryption, secure payment
                gateways,.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-[#122222]">5. User Account Management</h2>
            <p className="text-gray-900 mb-6">
                You have the right to manage your account settings, including updating
                your information and preferences. We provide options for account
                deletion upon request.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-[#122222]">6. Cookies and Tracking</h2>
            <p className="text-gray-900 mb-6">
                Our platform uses cookies and similar tracking technologies to enhance
                user experience. You can control cookie preferences in your browser
                settings.
            </p>

            {/* Add more sections based on your specific Privacy Policy content */}

            <h2 className="text-2xl font-bold mb-4 text-[#122222]">Contact Us</h2>
            <p className="text-gray-900 mb-6">
                If you have any questions or concerns about this Privacy Policy, please
                contact us at{' '}
                <a href="mailto:zakibutt199@gmail.com" className="text-blue-900 font-semibold">
                    zakibutt199@gmail.com
                </a> or visit{' '}
                <Link to={'/contact'} className="text-blue-900 font-semibold">
                    Contact us Page
                </Link>
                .
            </p>
        </div>
    );
};

export default PrivacyPolicy;
