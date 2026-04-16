import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppProviders } from "@/lib/providers/AppProviders";
import { WaitlistPage } from "@/pages";

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <WaitlistPage />
      </AppProviders>
    </ErrorBoundary>
  );
}
