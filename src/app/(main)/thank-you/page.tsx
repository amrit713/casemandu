import { Suspense } from "react";

import { ThankYou } from "./thank-you";

const ThankYouPage = () => {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  );
};

export default ThankYouPage;
