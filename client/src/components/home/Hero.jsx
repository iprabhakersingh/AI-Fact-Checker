import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {

    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <>
            <div className="min-h-screen pb-20">

                {/* Navbar */}
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">

                    <a href="/">
                        <img src="/logo.png" alt="logo" className="h-24 w-auto" />
                    </a>

                    <div className="hidden md:flex items-center gap-8 text-slate-800">
                        <a href="#" className="hover:text-green-600 transition">Home</a>
                        <a href="#features" className="hover:text-green-600 transition">Features</a>
                        <a href="#testimonials" className="hover:text-green-600 transition">Testimonials</a>
                        <a href="#cta" className="hover:text-green-600 transition">Contact</a>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative flex flex-col items-center justify-center text-center px-6 md:px-16 lg:px-24 xl:px-40">

                    <div className="absolute top-20 left-1/4 -z-10 w-72 h-72 bg-green-300 blur-[120px] opacity-30"></div>

                    {/* Users */}
                    <div className="flex items-center mt-5">

                        <div className="flex -space-x-3 pr-3">

                            <img
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                                alt=""
                                className="w-8 h-8 rounded-full border-2 border-white"
                            />

                            <img
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                                alt=""
                                className="w-8 h-8 rounded-full border-2 border-white"
                            />

                            <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                                alt=""
                                className="w-8 h-8 rounded-full border-2 border-white"
                            />

                        </div>

                        <div>
                            <p className="text-sm text-gray-700">
                                Used by 10,000+ users
                            </p>
                        </div>

                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl mt-6 leading-tight">

                        Verify PDF Claims with{" "}

                        <span className="bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                        AI-Powered
                        </span>{" "}

                        Fact Checking.

                    </h1>

                    {/* Description */}
                    <p className="max-w-xl text-gray-600 text-lg mt-6">
                        Upload PDFs and verify claims instantly with advanced AI-powered fact checking.
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-4 mt-8">

                        <Link
                            to="/dashboard"
                            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full transition"
                        >
                            Get Started
                        </Link>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Hero