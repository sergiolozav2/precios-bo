import { LoadingWrapper } from "./LoadingWrapper";
import { PageHeaderWrapper } from "./PageHeaderWrapper";

export function SuspenseFallbackPage() {
  return (
    <LoadingWrapper className="bg-transparent" size={36} loading={true}>
      <PageHeaderWrapper>
        <div></div>
      </PageHeaderWrapper>
    </LoadingWrapper>
  );
}
