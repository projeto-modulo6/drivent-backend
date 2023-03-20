import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function findByGitHubId(gitHubId: number, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      gitHubId,
    },
  };

  if (select) {
    params.select = select;
  }
  return prisma.user.findUnique(params);
}

async function updateGitHubId(userId: number, gitHubId: number) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      gitHubId: gitHubId,
    },
  });
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  create,
  findByGitHubId,
  updateGitHubId,
};

export default userRepository;
