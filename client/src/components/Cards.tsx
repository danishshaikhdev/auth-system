import {
    Users,
    Heart,
    Bell,
    ArrowUpRight,
} from "lucide-react";

export const Cards = () => {

    const cards = [
        {
            title: "Profile Views",
            value: "2,450",
            subtitle: "People visited your profile",
            icon: Users,
            linear: "from-violet-500 to-purple-500",
            targetId: "profile-section",
        },
        {
            title: "Favorites",
            value: "180",
            subtitle: "Your saved collections",
            icon: Heart,
            linear: "from-pink-500 to-rose-500",
            targetId: "favorites-section",
        },
        {
            title: "Notifications",
            value: "12",
            subtitle: "Unread important updates",
            icon: Bell,
            linear: "from-cyan-500 to-blue-500",
            targetId: "notifications-section",
        },
    ];

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
            {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                    <button
                        key={index}
                        onClick={() => handleScroll(card.targetId)}
                        className="
                            group
                            relative
                            overflow-hidden
                            rounded-4xl
                            p-px
                            bg-linear-to-br
                            transition-all
                            duration-500
                            hover:scale-[1.03]
                            hover:-translate-y-2
                            cursor-pointer
                            "
                    >
                        {/* Gradient Border */}
                        <div
                            className={`
                                absolute inset-0
                                bg-linear-to-br ${card.linear}
                                opacity-70 blur-xl
                                group-hover:opacity-100
                                transition duration-500
                            `}
                        />

                        {/* Main Card */}
                        <div
                            className="
                                relative
                                h-full
                                rounded-4xl
                                bg-white/90
                                backdrop-blur-xl
                                border border-white/20
                                p-7
                                overflow-hidden
                            "
                        >
                            {/* Animated Shine */}
                            <div
                                className="
                                    absolute
                                    top-0
                                    -left-full
                                    w-full
                                    h-full
                                    bg-linear-to-r
                                    from-transparent
                                    via-white/40
                                    to-transparent
                                    skew-x-12
                                    group-hover:left-[200%]
                                    transition-all
                                    duration-1000
                                    "
                            />

                            {/* Floating Glow Blob */}
                            <div
                                className={`
                  absolute
                  -top-10
                  -right-10
                  w-32
                  h-32
                  rounded-full
                  bg-linear-to-br ${card.linear}
                  opacity-20
                  blur-3xl
                  group-hover:scale-150
                  transition-all
                  duration-700
                `}
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Top */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
                                            {card.title}
                                        </p>

                                        <h2 className="mt-3 text-4xl font-black text-gray-800">
                                            {card.value}
                                        </h2>
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className={`
                      bg-linear-to-br ${card.linear}
                      p-4
                      rounded-2xl
                      shadow-lg
                      transition-all
                      duration-500
                      group-hover:rotate-12
                      group-hover:scale-110
                    `}
                                    >
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                {/* Subtitle */}
                                <p className="mt-5 text-gray-500 leading-relaxed text-sm">
                                    {card.subtitle}
                                </p>

                                {/* Bottom */}
                                <div className="mt-8 flex items-center justify-between">
                                    <div
                                        className={`
                      h-1.5
                      w-16
                      rounded-full
                      bg-linear-to-r ${card.linear}
                      group-hover:w-28
                      transition-all
                      duration-500
                    `}
                                    />

                                    <div
                                        className="
                      flex items-center gap-2
                      text-sm
                      font-semibold
                      text-gray-600
                      opacity-0
                      translate-x-4
                      group-hover:opacity-100
                      group-hover:translate-x-0
                      transition-all
                      duration-500
                    "
                                    >
                                        Explore

                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};