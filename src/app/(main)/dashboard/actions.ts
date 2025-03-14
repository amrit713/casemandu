"use server";
import axios from "axios";

import { OrderStatus } from "@prisma/client";
import { db } from "@/lib/db";

export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string;
  newStatus: OrderStatus;
}) => {
  await db.order.update({
    where: {
      id,
    },
    data: {
      status: newStatus,
    },
    include: { configuration: true },
  });
};
