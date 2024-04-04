/* eslint-disable @typescript-eslint/no-unused-vars */
import { FiTrash } from "react-icons/fi";
import { api } from "./services/api";
import { useEffect, useState, useRef, FormEvent } from "react";

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  // Ligou o customers a interface CustomerProps[] para gerar os dados dela
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadCustomers();
    // Ao abrir a aplicação o useEffect é executado e chama a função loadCustomers()
  }, []);

  //A função loadCustomers() busca na api as requisicoes e traz os clientes e depois pássa pro useState
  async function loadCustomers() {
    const response = await api.get("/customers");
    setCustomers(response.data);
  }

  async function handleSubmit(e: FormEvent) {
    // precisa ser uma função async pq vou fazer uma requisiçao no backend, entao sera uma requisicao assincrona
    e.preventDefault(); //Assim nao att a pagina de form

    if (!nameRef.current?.value || !emailRef.current?.value) return;
    //current? = valor q tem dentro do input

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    });

    setCustomers((allCustomers) => [...allCustomers, response.data]);
    //Trocando o valor  q tenho no setCustomers(useState), pegando tudo q ja tenho e jogando dentro de um array [...allCustomers] e colocando a mais oq ja cadastrou response.data

    nameRef.current.value = "";
    emailRef.current.value = "";
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/customer", {
        params: {
          id: id,
        },
      });

      const allCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(allCustomers);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <main className="my-10 w-full max-w-2xl px-4">
        <h1 className="text-4xl font-bold text-white text-center">Clientes</h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome completo..."
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />
          <label className="font-medium text-white">E-mail:</label>
          <input
            type="e-mail"
            placeholder="Digite seu e-mail..."
            className="w-full mb-5 p-2 rounded"
            ref={emailRef}
          />
          <input
            type="submit"
            value="Cadastrar"
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
          />
        </form>
        <section className="flex flex-col gap-4">
          {customers.map((customer) => (
            <article
              key={customer.id}
              className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200" /*rounded = arredondar*/
            >
              <p>
                <span className="font-medium">Nome:</span> {customer.name}
              </p>
              <p>
                <span className="font-medium">Nome:</span> {customer.email}
              </p>
              <p>
                <span className="font-medium">Status:</span>
                {
                  customer.status
                    ? "ATIVO"
                    : "INATIVO" /* boleanos precisa filtra-los com oq deseja*/
                }
              </p>
              <button
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                onClick={() => handleDelete(customer.id)}
              >
                <FiTrash size={18} color="#FFF" />
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
