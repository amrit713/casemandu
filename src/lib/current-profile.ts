"use server";

import { auth } from "@/auth";

import { db } from "@/lib/db";

export const currentProfile = async () => {
  const user = await auth();

  if (!user || !user.user.id) {
    return null;
  }

  return db.user.findUnique({
    where: {
      id: user.user.id,
    },
  });
};
