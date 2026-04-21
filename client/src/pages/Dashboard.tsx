import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { User, LogOut, LayoutDashboard, Mail, ShieldCheck, Globe } from "lucide-react";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <LayoutDashboard className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">AuthSystem</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-3 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700">
                            <div className="bg-linear-to-tr from-blue-500 to-purple-500 p-1 rounded-full">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-200">{user?.name}</span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg transition-all border border-red-500/20 active:scale-95 text-sm font-semibold cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
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
                    <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-colors group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                                <Mail className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Email Address</p>
                                <p className="text-lg font-medium text-gray-100">{user?.email}</p>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-blue-500 rounded-full" />
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6">
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
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
                    </div>

                    <div className="flex gap-8 text-sm font-medium text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Help</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
