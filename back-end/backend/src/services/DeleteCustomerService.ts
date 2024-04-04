import prismaClient from "../prisma";

interface DeleteCustomerProps {
  id: String;
}

class DeleteCustomerService {
  //preciso do id pra excluir
  async execute({ id }: DeleteCustomerProps) {
    if (typeof id !== "string" || !id.trim()) {
      // Verifica se id é uma string não vazia
      throw new Error("Solicitação inválida.");
    }

    const findCustomer = await prismaClient.customer.findFirst({
      // findFirst = procurar pelo primeiro de todos
      where: {
        id: id,
      },
    });

    if (!findCustomer) {
      throw new Error("Cliente não existe!");
    }

    await prismaClient.customer.delete({
      where: {
        id: findCustomer.id,
      },
    });

    return { message: "Deletado com sucesso" };
  }
}

export { DeleteCustomerService };
