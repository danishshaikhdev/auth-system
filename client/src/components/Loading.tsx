// import React from 'react'

export const Loading = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-white">

            {/* Spinner */}
            <div className="relative flex items-center justify-center">

                <div className="w-14 h-14 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />

                <div className="absolute w-6 h-6 rounded-full bg-blue-500/20 animate-pulse" />
            </div>

            {/* Text */}
            <div className="mt-6 text-center">

                <h2 className="text-xl font-bold text-gray-800">
                    Loading...
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                    Preparing your dashboard ✨
                </p>
            </div>
        </div>
    )
}
