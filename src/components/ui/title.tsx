type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Title({ children, className, ...rest }: TitleProps) {
  return (
    <div className="flex flex-col items-center">
      <h3
        {...rest}
        className={`text-4xl relative text-center font-medium text-green-dark font-poppins ${className}`}
      >
        {children}
      </h3>
    </div>
  );
}

// className={ ${className}`}
