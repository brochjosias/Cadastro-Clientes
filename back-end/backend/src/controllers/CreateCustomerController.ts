import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = request.body as { name: string; email: string };

    const customerService = new CreateCustomerService();

    const customer = await customerService.execute({ name, email });
    //Controller recebe os dados e chama o serviço, repassando tudo q precisa e o serviço trata e cadastra no banco. Dps devolve pro controller qual item foi cadastrado no banco

    reply.send(customer); //devolver pra api oq o serviço esta me devolvendo
  }
}

export { CreateCustomerController };
