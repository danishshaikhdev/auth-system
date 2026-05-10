// import React from 'react'

export const Loading = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-white overflow-hidden">

            {/* Background Glow */}
            <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

            {/* Loader Container */}
            <div className="relative flex flex-col items-center">

                {/* Outer Ring */}
                <div className="w-24 h-24 rounded-full border-[6px] border-blue-100 border-t-blue-500 animate-spin shadow-[0_0_40px_rgba(59,130,246,0.25)]" />

                {/* Middle Ring */}
                <div className="absolute w-16 h-16 rounded-full border-[6px] border-purple-100 border-b-purple-500 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />

                {/* Inner Glow */}
                <div className="absolute w-7 h-7 rounded-full bg-linear-to-r from-blue-500 to-purple-500 shadow-2xl animate-pulse" />

                {/* Loading Text */}
                <div className="mt-10 text-center">

                    <h2 className="text-2xl font-black bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Loading...
                    </h2>

                    <p className="mt-2 text-sm text-gray-400 tracking-wide">
                        Please wait while we prepare your experience ✨
                    </p>
                </div>
            </div>
        </div>
    )
}
