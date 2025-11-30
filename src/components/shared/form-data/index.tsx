type FormFieldProps = {
  fieldLabel: string;
  children: React.ReactNode;
  className?: string;
};

export default function FormData({
  fieldLabel,
  children,
  className,
}: FormFieldProps) {
  return (
    <span className={`font-medium ${className}`}>
      {fieldLabel}:{" "}
      <span className="text-zinc-700 font-normal">{children}</span>
    </span>
  );
}
