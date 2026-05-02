import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppProviders } from "@/lib/providers/AppProviders";
import { WaitlistPage } from "@/pages";
import { PrivacyPolicyPage } from "@/pages/privacy-policy";
import { TermsOfServicePage } from "@/pages/terms-of-service";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WaitlistPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          </Routes>
        </BrowserRouter>
      </AppProviders>
    </ErrorBoundary>
  );
}
