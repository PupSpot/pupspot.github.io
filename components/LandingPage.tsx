'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    PawPrint,
    MapPin,
    Users,
    Calendar,
    ChevronRight,
    Menu,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const Navigation = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm"
        >
            {/* Navigation content remains the same */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <PawPrint className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-blue-900">PupSpot</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/discover" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Discover
                        </Link>
                        <Link href="/events" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Events
                        </Link>
                        <Link href="/authentication">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Sign In
                            </Button>
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link href="/discover" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">
                                Discover
                            </Link>
                            <Link href="/events" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">
                                Events
                            </Link>
                            <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                                Sign In
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

const HeroSection = () => (
    <div className="bg-gradient-to-b from-blue-50 to-white h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="text-center"
            >
                <motion.div
                    variants={fadeIn}
                    className="flex justify-center items-center mb-6"
                >
                    <PawPrint className="h-12 w-12 text-blue-600" />
                </motion.div>
                <motion.h1
                    variants={fadeIn}
                    className="text-5xl md:text-6xl font-bold text-blue-900 mb-6"
                >
                    Where Dogs Make Friends
                </motion.h1>
                <motion.p
                    variants={fadeIn}
                    className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                >
                    Join the community of dog lovers. Connect, share, and explore with your furry friends.
                </motion.p>
                <motion.div
                    variants={fadeIn}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <Link href="/authentication">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                            Join Now <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    </div>
);

const FeaturesSection = () => (
    <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <motion.h2
                    variants={fadeIn}
                    className="text-3xl font-bold text-center text-gray-900 mb-4"
                >
                    Everything Your Dog Needs
                </motion.h2>
                <motion.p
                    variants={fadeIn}
                    className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
                >
                    Discover all the amazing features that make PupSpot the perfect platform for you and your furry friend.
                </motion.p>
                <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {[
                        {
                            icon: <Users className="h-8 w-8 text-blue-500" />,
                            title: "Dog Community",
                            description: "Connect with local dog owners and arrange playdates",
                            link: "/events"
                        },
                        {
                            icon: <MapPin className="h-8 w-8 text-blue-500" />,
                            title: "Find Spots",
                            description: "Discover dog-friendly parks, cafes, and more nearby",
                            link: "/discover"
                        },
                        {
                            icon: <Calendar className="h-8 w-8 text-blue-500" />,
                            title: "Events",
                            description: "Join local dog meetups and community events",
                            link: "/events"
                        },
                        {
                            icon: <PawPrint className="h-8 w-8 text-blue-500" />,
                            title: "Pet Profiles",
                            description: "Create profiles for your dogs and share their adventures",
                            link: "/settings/pets"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Link href={feature.link}>
                                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                                    <CardContent className="p-6 text-center">
                                        <div className="mb-4 flex justify-center">{feature.icon}</div>
                                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    </div>
);

const CTASection = () => (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
            <motion.h2
                variants={fadeIn}
                className="text-3xl font-bold text-white mb-6"
            >
                Ready to Join the Pack?
            </motion.h2>
            <motion.p
                variants={fadeIn}
                className="text-blue-100 mb-8 text-lg"
            >
                Start connecting with dog lovers in your area and create pawsome memories!
            </motion.p>
            <motion.div variants={fadeIn}>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                    <Link href="/authentication">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                            Sign Up Now <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    </div>
);

const Footer = () => (
    <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                        <PawPrint className="h-8 w-8 text-blue-400" />
                        <span className="text-xl font-bold text-white">PupSpot</span>
                    </Link>
                    <p className="text-sm">Connecting dogs and their humans since 2024</p>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Features</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/discover" className="hover:text-blue-400">Find Dog Parks</Link></li>
                        <li><Link href="/discover" className="hover:text-blue-400">Pet-friendly Places</Link></li>
                        <li><Link href="/events" className="hover:text-blue-400">Dog Events</Link></li>
                        <li><Link href="/events" className="hover:text-blue-400">Community</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-blue-400">About Us</Link></li>
                        <li><Link href="mailto:support@pupspot.com" className="hover:text-blue-400">Contact</Link></li>
                        <li><Link href="/privacypolicy" className="hover:text-blue-400">Privacy Policy</Link></li>
                        <li><Link href="/privacypolicy" className="hover:text-blue-400">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
                <p>&copy; 2024 PupSpot. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            <Navigation />
            <HeroSection />
            <FeaturesSection />
            <CTASection />
            <Footer />
        </div>
    );
};

export default LandingPage;