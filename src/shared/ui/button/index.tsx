import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../lib';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90',

  secondary:
    'bg-neutral-200 text-black hover:bg-neutral-300 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700',

  ghost: 'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900',
};

export const Button = ({
  children,
  variant = 'primary',
  className,
  disabled,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
