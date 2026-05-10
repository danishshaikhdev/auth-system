import {
    UserCog,
    LockKeyhole,
    Shield,
    Smartphone,
    HelpCircle,
    Settings,
    ArrowUpRight,
} from "lucide-react";

export const QuickAccess = () => {

    const actions = [
        {
            title: "Edit Profile",
            desc: "Update your personal information",
            icon: UserCog,
            linear: "from-blue-500 to-cyan-500",
        },
        {
            title: "Privacy",
            desc: "Manage your account privacy",
            icon: Shield,
            linear: "from-violet-500 to-purple-500",
        },
        {
            title: "Password",
            desc: "Keep your account secure",
            icon: LockKeyhole,
            linear: "from-rose-500 to-pink-500",
        },
        {
            title: "Devices",
            desc: "View connected devices",
            icon: Smartphone,
            linear: "from-orange-500 to-amber-500",
        },
        {
            title: "Settings",
            desc: "Customize your dashboard",
            icon: Settings,
            linear: "from-emerald-500 to-green-500",
        },
        {
            title: "Support",
            desc: "Need help? Contact us",
            icon: HelpCircle,
            linear: "from-indigo-500 to-blue-500",
        },
    ];

    return (
        <section className="mt-16">
            {/* Heading */}
            <div className="mb-8">
                <h2 className="text-4xl font-black text-gray-800">
                    Quick Access ⚡
                </h2>

                <p className="text-gray-500 mt-2 text-lg">
                    Everything you need in one place.
                </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {actions.map((action, index) => {
                    const Icon = action.icon;

                    return (
                        <button
                            key={index}
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-4xl
                                bg-white
                                border border-gray-200
                                p-6
                                text-left
                                shadow-md
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:shadow-2xl
                                cursor-pointer
                            "
                        >
                            {/* Glow */}
                            <div
                                className={`
                                    absolute
                                    inset-0
                                    opacity-0
                                    group-hover:opacity-10
                                    bg-linear-to-br ${action.linear}
                                    transition-all
                                    duration-500
                                `}
                            />

                            {/* Floating Blob */}
                            <div
                                className={`
                                    absolute
                                    -top-10
                                    -right-10
                                    w-32
                                    h-32
                                    rounded-full
                                    bg-linear-to-br ${action.linear}
                                    opacity-10
                                    blur-3xl
                                    group-hover:scale-150
                                    transition-all
                                    duration-700
                                `}
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Top */}
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`
                                            bg-linear-to-br ${action.linear}
                                            p-4
                                            rounded-2xl
                                            shadow-lg
                                            transition-all
                                            duration-500
                                            group-hover:rotate-6
                                            group-hover:scale-110
                                        `}
                                    >
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>

                                    <ArrowUpRight
                                        className="
                                            w-5 h-5
                                            text-gray-400
                                            opacity-0
                                            translate-x-3
                                            group-hover:opacity-100
                                            group-hover:translate-x-0
                                            transition-all
                                            duration-500
                                            "
                                    />
                                </div>

                                {/* Text */}
                                <div className="mt-6">
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {action.title}
                                    </h3>

                                    <p className="mt-2 text-gray-500 leading-relaxed">
                                        {action.desc}
                                    </p>
                                </div>

                                {/* Bottom Line */}
                                <div
                                    className={`
                                        mt-6
                                        h-1.5
                                        w-14
                                        rounded-full
                                        bg-linear-to-r ${action.linear}
                                        group-hover:w-full
                                        transition-all
                                        duration-500
                                    `}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};