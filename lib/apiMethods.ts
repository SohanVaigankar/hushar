import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

import { MAX_LIMIT } from "./constants";

const DAYS_IN_MS = 86_400_000;

// function to increase api limit
export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (userApiLimit) {
    await prismadb?.userApiLimit?.update({
      where: { userId: userId },
      data: { count: userApiLimit?.count + 1 },
    });
  } else {
    await prismadb?.userApiLimit?.create({
      data: { userId: userId, count: 1 },
    });
  }
};

// function to check free trial count
export const checkUserApiLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb?.userApiLimit?.findUnique({
    where: { userId: userId },
  });

  if (!userApiLimit || userApiLimit?.count < MAX_LIMIT) {
    return true;
  } else {
    return false;
  }
};

// function to fetch free trial details
export const getApiLimitCount = async () => {
  const { userId } = auth();
  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb?.userApiLimit?.findUnique({
    where: { userId: userId },
  });

  if (!userApiLimit) {
    return 0;
  } else {
    return userApiLimit?.count;
  }
};

//
export const checkSubscription = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb?.userSubscription?.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCustomerId: true,
      stripeCurrentPeriodEnd: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription?.stripePriceId &&
    userSubscription?.stripeCurrentPeriodEnd?.getTime()! + DAYS_IN_MS >
      Date.now();

  return !!isValid;
};
