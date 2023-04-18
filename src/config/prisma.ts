import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const {
  user: User,
  house: House,
  houseImage: HouseImage,
  session: Session,
} = prisma;
