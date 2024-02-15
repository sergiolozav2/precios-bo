type CommandSpanType = {
  children?: React.ReactNode;
};

export function CommandSpan(props: CommandSpanType) {
  return (
    <>
      <span className="px-1 py-0.5 font-normal text-sm sm:text-base text-stone-800 bg-stone-200">
        {props.children}
      </span>
    </>
  );
}
