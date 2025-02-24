"use server";

import { auth } from "@/auth";

import { db } from "@/lib/db";

export const currentProfile = async () => {
  const user = await auth();
  console.log("Current Profile", user);

  if (!user || !user.user.id) {
    return null;
  }

  const profile = await db.user.findUnique({
    where: {
      id: user.user.id,
    },
  });

  return profile;
};
