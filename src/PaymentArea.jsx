import GenericButton from "./GenericButton"; // Importa o componente de botão genérico
import ReadOnlyInput from "./ReadOnlyInput"; // Importa o componente de input somente leitura
import PIXCode from "../PIXCode"; // Importa a classe PIXCode para gerar o código Pix
import { QRious } from "react-qrious"; // Importa o componente QRious para gerar o código QR
import { FaPix } from "react-icons/fa6"; // Importa o ícone do Pix

// Componente para exibir a área de pagamento
export default function PaymentArea({ onBack }) {
    // Obtém os dados armazenados na sessionStorage
    const data = JSON.parse(sessionStorage.getItem("data"));

    // Extrai os valores de nome, valor e mensagem dos dados armazenados
    const firstName = data?.name.replace(/\s+/g, " ").trim() || ""; // Limpa o nome removendo espaços extras
    const value = data?.value || 0; // Valor do pagamento (valor padrão é 0)
    const numericValue = data?.numericValue || 0;
    const message = data?.message || ""; // Mensagem associada ao pagamento (valor padrão é uma string vazia)

    // Cria uma instância do objeto PIXCode com os dados necessários
    const pixCode = new PIXCode(
        "d5d4dbee-b1eb-4c8b-82b7-7fd1acb519b2", // Chave do recebedor do Pix
        "random", // Tipo de código (pode ser um valor qualquer, mas "random" é um marcador)
        numericValue, // Valor do pagamento
        "Italo S Luz", // Nome do recebedor
        "", // (opcional) informações adicionais sobre o recebedor
        message, // Mensagem associada ao pagamento
    );

    // Gera o código Pix para o pagamento
    const copyPastePix = pixCode.generate();

    return (
        <div className="text-center space-y-4 w-full flex flex-col break-words">
            {/* Título agradecendo o usuário, usando o nome se disponível */}
            <h1 className="text-2xl font-bold mt-2">
                Valeu {firstName ? firstName : "pelo Pix"}!
            </h1>
            {/* Subtítulo com o valor do Pix formatado */}
            <h2 className="text-sm text-zinc-400">
                Pix gerado no valor de R$ {value}
            </h2>
            <div className="relative">
                {/* Geração do código QR usando o valor do Pix */}
                <QRious value={copyPastePix} size={250} className="m-auto" />
                <div className="absolute inset-0 w-full h-full flex">
                    {/* Ícone do Pix posicionado sobre o código QR */}
                    <FaPix className="m-auto w-12 h-12 bg-white p-2.5 text-orange-500"></FaPix>
                </div>
            </div>
            {/* Descrição sobre a flexibilidade do pagamento com Pix */}
            <p className="text-zinc-700 text-sm">
                Este código Pix permite pagamento no valor e no momento que
                preferir. Clique abaixo para copiar o código "copia e cola".
            </p>
            {/* Título para a área de Copia e Cola do Pix */}
            <h2 className="text-lg font-bold">Pix Copia e Cola</h2>
            {/* Campo de entrada somente leitura para exibir o código Pix */}
            <ReadOnlyInput
                defaultValue={copyPastePix}
                onCopiedText={
                    "Código copiado com sucesso! Abra o aplicativo do banco e cole o código para concluir o pagamento."
                }
            />
            {/* Botão de voltar para retornar à página anterior */}
            <GenericButton className="w-full" onClick={onBack}>
                Voltar
            </GenericButton>
        </div>
    );
}
