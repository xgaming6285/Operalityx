import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    text?: string;
    showText?: boolean;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    size = 'md', 
    text = 'Loading...', 
    showText = true,
    className = '' 
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20'
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
    };

    return (
        <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
            {/* Spinning Logo */}
            <div className="relative">
                <img 
                    src="/images/logo-icon.png" 
                    alt="Loading" 
                    className={`${sizeClasses[size]} animate-spin`}
                    style={{
                        animationDuration: '2s',
                        animationTimingFunction: 'linear',
                        animationIterationCount: 'infinite'
                    }}
                />
                {/* Optional glow effect */}
                <div 
                    className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse`}
                    style={{
                        animationDuration: '1.5s',
                        animationTimingFunction: 'ease-in-out',
                        animationIterationCount: 'infinite'
                    }}
                />
            </div>

            {/* Loading Text */}
            {showText && (
                <p className={`${textSizeClasses[size]} font-medium text-gray-700 animate-pulse`}>
                    {text}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner; 