
import React from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        'font-medium rounded-full transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-huemate-gold/50',
        {
          'bg-gradient-to-r from-huemate-gold to-huemate-gold/80 text-huemate-dark hover:from-huemate-gold hover:to-huemate-gold border border-huemate-gold/30': variant === 'primary',
          'bg-white/80 backdrop-blur-sm text-huemate-dark border border-huemate-gold/30 hover:bg-white': variant === 'secondary',
          'bg-transparent border border-huemate-gold/50 text-huemate-dark hover:bg-huemate-gold/10': variant === 'outline',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-5 py-2.5 text-lg': size === 'lg',
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
