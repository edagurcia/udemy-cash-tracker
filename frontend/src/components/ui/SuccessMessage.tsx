export const SuccessMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-center my-4 bg-emerald-100 text-emerald-600 font-bold p-3 uppercase text-sm">
      {children}
    </p>
  );
};
