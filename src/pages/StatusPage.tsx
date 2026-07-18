import { Link } from "react-router-dom";
import { PageHeaderWrapper } from "../components/PageHeaderWrapper";
import { routesNames } from "../routes/routesNames";

type StatusPageProps = {
  code: string;
  title: string;
  description: string;
  actionLabel: string;
  reload?: boolean;
};

export function StatusPage({
  code,
  title,
  description,
  actionLabel,
  reload = false,
}: StatusPageProps) {
  const actionClassName =
    "mt-6 rounded-lg bg-white px-5 py-2.5 font-semibold text-purple-700 shadow-sm hover:bg-purple-50";

  return (
    <PageHeaderWrapper>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center text-white">
        <p className="text-6xl font-bold tracking-tight sm:text-7xl">{code}</p>
        <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">{title}</h1>
        <p className="mt-3 max-w-lg text-base text-purple-100 sm:text-lg">
          {description}
        </p>
        {reload ? (
          <button
            type="button"
            className={actionClassName}
            onClick={() => window.location.reload()}
          >
            {actionLabel}
          </button>
        ) : (
          <Link className={actionClassName} to={routesNames.Inicio}>
            {actionLabel}
          </Link>
        )}
      </div>
    </PageHeaderWrapper>
  );
}
