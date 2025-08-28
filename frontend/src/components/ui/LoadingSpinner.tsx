import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    size = 'md', 
    className = '' 
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20'
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <img 
                src="/images/smaller-logo-hd.png" 
                alt="Loading" 
                className={`${sizeClasses[size]} animate-spin`}
                style={{
                    animationDuration: '2s',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite'
                }}
            />
        </div>
    );
};

export default LoadingSpinner; 