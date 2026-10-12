export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-center my-4 bg-red-100 text-red-600 font-bold p-3 uppercase text-sm">
      {children}
    </p>
  );
};
