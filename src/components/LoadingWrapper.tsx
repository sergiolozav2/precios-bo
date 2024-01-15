import "../styles/spinner.css";

type LoadingWrapperType = {
  className?: string;
  loading: boolean;
  size?: number;
  strokeWidth?: number;
  color?: string;
  children: React.ReactNode;
};

export function LoadingWrapper(props: LoadingWrapperType) {
  const { size = "24px", strokeWidth = 3, color } = props;
  return (
    <div className="relative">
      {props.children}
      {props.loading && (
        <div
          className={`inset-0 absolute grid place-items-center bg-stone-800/25 ${props.className}`}
        >
          <div
            className="spinner"
            style={{
              width: size,
              height: size,
              borderWidth: strokeWidth,
              borderColor: color,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
