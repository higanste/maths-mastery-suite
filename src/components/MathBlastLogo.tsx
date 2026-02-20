import { SVGProps } from "react";

export function MathBlastLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {/* Background/Base */}
            <rect width="100" height="100" rx="20" fill="url(#bg-grad)" />

            {/* Abstract geometric infinity/calculator shape */}
            <path
                d="M25 40C25 28.9543 33.9543 20 45 20C52.732 20 59.435 24.5804 62.5 31.3397C65.565 24.5804 72.268 20 80 20C91.0457 20 100 28.9543 100 40C100 52.5 85 70 62.5 85C40 70 25 52.5 25 40Z"
                fill="url(#shape-grad)"
                style={{ mixBlendMode: 'overlay' }}
            />

            {/* Infinity / Math stylized symbol */}
            <path
                d="M62.5 50C55 50 50 40 40 40C30 40 25 50 25 60C25 70 30 80 40 80C50 80 55 70 62.5 70C70 70 75 80 85 80C95 80 100 70 100 60C100 50 95 40 85 40C75 40 70 50 62.5 50Z"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Plus and Minus details */}
            <path d="M40 55V65M35 60H45" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            <path d="M80 60H90" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" />

            <defs>
                <linearGradient id="bg-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0f172a" />
                    <stop offset="1" stopColor="#1e293b" />
                </linearGradient>
                <linearGradient id="shape-grad" x1="25" y1="20" x2="100" y2="85" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#c084fc" />
                </linearGradient>
            </defs>
        </svg>
    );
}
