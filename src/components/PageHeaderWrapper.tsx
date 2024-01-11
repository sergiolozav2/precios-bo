type PageHeaderWrapperType = {
  children: React.ReactNode;
};

export function PageHeaderWrapper(props: PageHeaderWrapperType) {
  return (
    <div className="min-h-80 flex flex-col gap-y-8 w-full bg-gradient-to-r from-[#581ecc] to-[#7631ab]">
      {props.children}
    </div>
  );
}
