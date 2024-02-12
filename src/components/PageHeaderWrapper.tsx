type PageHeaderWrapperType = {
  children: React.ReactNode;
  minHeight?: string;
};

export function PageHeaderWrapper(props: PageHeaderWrapperType) {
  return (
    <div
      className="pt-16 flex flex-col gap-y-8 w-full bg-gradient-to-r from-[#581ecc] to-[#7631ab]"
      style={{ minHeight: props.minHeight ?? "384px" }}
    >
      {props.children}
    </div>
  );
}
