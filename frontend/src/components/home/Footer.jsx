import React from 'react';

export default function Footer() {
    return (
        <footer id="contact" className="relative z-10 py-16 px-10 border-t border-white/10 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                            <img
                                src="https://theinnovationhub.vercel.app/assets/Innovation%20Hub%20Logo-oAnrIoLA.png"
                                alt="Innovation Hub Logo"
                                className="inline-block h-8 w-8 mr-2"
                            />
                            Innovation Hub
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Empowering the next generation of builders, creators, and world-changers. Join us in shaping the future.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Company</h4>
                        <div className="space-y-2">
                            {["About Us", "Careers", "Blog", "Press Kit"].map((link) => (
                                <a key={link} href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Legal</h4>
                        <div className="space-y-2">
                            {["Privacy Policy", "Terms of Service", "Cookie Policy", "FAQ"].map((link) => (
                                <a key={link} href="#" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400">
                        © 2025 Innovation Hub - Tech Society. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-gray-400 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Status</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
