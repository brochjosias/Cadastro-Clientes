import prismaClient from "../prisma";

interface CreateCustomerProps {
  name: string;
  email: string;
}

class CreateCustomerService {
  async execute({ name, email }: CreateCustomerProps) {
    if (!name || !email) {
      throw new Error("Preencha todos os campos");
    }

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        status: true,
      },
    });

    return customer;
  }
}
//responsavel pro cadastrar mo banco e fazer dms trabalhos

export { CreateCustomerService };
