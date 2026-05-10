import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { User, LogOut, LayoutDashboard, Mail, ShieldCheck, Globe, TriangleAlert, X } from "lucide-react";
import { getErrorMessage } from "../utils/error";
import { Cards } from "../components/Cards";
import { QuickAccess } from "../components/QuickAccess";
import { useState } from "react";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error(getErrorMessage(error) || "Logout failed");
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 flex flex-col">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-200 shadow-md px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <LayoutDashboard className="w-5 h-5 text-white shadow-md" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">AuthSystem</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-3 bg-white/80 border border-gray-200 px-4 py-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
                            <div className="bg-linear-to-tr from-blue-500 to-purple-600 p-2 rounded-full group-hover:scale-110 transition">
                                <User className="w-4 h-4 text-white" />
                            </div>

                            <div className="leading-tight">
                                <p className="text-sm font-semibold text-gray-800">
                                    {user?.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                    Verified User
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95 transition-all duration-300 font-semibold cursor-pointer
                            "
                        >
                            <LogOut className="w-4 h-4" />

                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
                {/* Hero Section */}
                <div className="relative mb-16 text-center">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] blur-3xl" />
                    <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 mb-6 animate-bounce">
                        <ShieldCheck className="w-12 h-12 text-blue-400" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
                        Welcome Back, <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{user?.name?.split(' ')[0]}!</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Your account is secure and ready. Access your personalized dashboard and manage your profile settings with ease.
                    </p>
                </div>

                {/* User Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-colors group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-500 rounded-xl group-hover:bg-blue-600 transition-colors">
                                <Mail className="w-6 h-6 text-white shadow-md" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Email Address</p>
                                <p className="text-lg font-medium text-gray-800">{user?.email}</p>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-blue-500 rounded-full" />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <Cards />
                </div>

                <div className="mt-8">
                    <QuickAccess />
                </div>


            </main>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2">
                            <LayoutDashboard className="w-5 h-5 text-blue-500" />
                            <span className="text-lg font-bold">AuthSystem</span>
                        </div>
                        <p className="text-gray-500 text-sm">© 2026 AuthSystem Inc. All rights reserved.</p>
                    </div>

                    <div className="flex gap-6">
                        {/* <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a> */}
                        {/* <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a> */}
                        <a href="/" className="text-gray-400 hover:text-gray-500 transition-colors"><Globe className="w-5 h-5 text-gray-500" /></a>
                    </div>

                    <div className="flex gap-8 text-sm font-medium text-gray-400">
                        <a href="#" className="hover:text-gray-500 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-gray-500 transition-colors">Terms</a>
                        <a href="#" className="hover:text-gray-500 transition-colors">Help</a>
                    </div>
                </div>
            </footer>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-in fade-in duration-300">

                    {/* Modal */}
                    <div className="relative w-full max-w-md overflow-hidden rounded-4xl bg-white border border-gray-200 shadow-2xl p-8 animate-in zoom-in-95 duration-300">

                        {/* Close */}
                        <button
                            onClick={() => setShowLogoutModal(false)}
                            className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        {/* Icon */}
                        <div className="mx-auto w-fit bg-red-100 p-5 rounded-3xl mb-6">
                            <TriangleAlert className="w-10 h-10 text-red-500" />
                        </div>

                        {/* Text */}
                        <div className="text-center">

                            <h2 className="text-3xl font-black text-gray-800">
                                Logout?
                            </h2>

                            <p className="mt-4 text-gray-500 leading-relaxed">
                                Are you sure you want to logout from your account?
                                You'll need to login again to continue.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className=" mt-8 grid grid-cols-2 gap-4">

                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="py-4 rounded-2xl border border-gray-200 font-semibold hover:bg-gray-50 transition-all cursor-pointer">
                                Cancel
                            </button>

                            <button
                                onClick={handleLogout}
                                className="py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg hover:shadow-red-500/30 transition-all cursor-pointer">
                                Logout
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
