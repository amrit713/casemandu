import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { db } from "@/lib/db";
import { DesignPreview } from "./design-preview";

interface PreviewProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const PreviewPage = async ({ searchParams }: PreviewProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const setConfigurationCookieAction = async (id: string) => {
    "use server";
    (await cookies()).set("configurationId", id);
    console.log("set success full");
  };

  return (
    <DesignPreview
      configuration={configuration}
      setConfigurationCookieAction={setConfigurationCookieAction}
    />
  );
};

export default PreviewPage;
