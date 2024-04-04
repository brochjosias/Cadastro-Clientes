import prismaClient from "../prisma";

class ListCustomersService {
  async execute() {
    const customers = await prismaClient.customer.findMany();
    // findMany = encontrar todos q tiver la

    return customers;
  }
}

export { ListCustomersService };
