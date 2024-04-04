import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomersService } from "../services/ListCustomersService";

class ListCustomersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const ListCustomerService = new ListCustomersService();

    const customers = await ListCustomerService.execute();

    reply.send(customers);
    //devolvo oq o serviço me passou
  }
}

export { ListCustomersController };
