import { FaClipboard } from "react-icons/fa6"; // Importa o ícone de clipboard (copiar) da biblioteca react-icons
import { useState } from "react"; // Importa o hook useState do React para gerenciar o estado

// Componente ReadOnlyInput: exibe um campo de input somente leitura com a funcionalidade de copiar o texto para a área de transferência
export default function ReadOnlyInput({ defaultValue, onCopiedText }) {
    // Estado para controlar se o input está ou não focado
    const [isFocused, setIsFocused] = useState(false);

    // Função para copiar o conteúdo do campo input para a área de transferência
    const copyToClipboard = async () => {
        try {
            // Tenta usar a API moderna do navegador para copiar o texto para a área de transferência
            await navigator.clipboard.writeText(defaultValue);
        } catch (err) {
            // Em caso de erro, exibe no console e mostra um alerta ao usuário
            console.error("Erro ao copiar: ", err);
            alert(`Erro ao copiar: ${err}`);
        }
    };

    return (
        <>
            {/* Contêiner principal que exibe o input e o ícone de clipboard */}
            <div
                className="relative flex items-center focus-within:text-green-600 text-zinc-700"
                onClick={copyToClipboard} // Copia o texto quando o contêiner é clicado
            >
                {/* Input de texto somente leitura */}
                <input
                    type="text"
                    value={defaultValue} // O valor do input é recebido via prop 'defaultValue'
                    readOnly // Torna o input somente leitura
                    onFocus={() => setIsFocused(true)} // Atualiza o estado para 'focado' quando o input ganha o foco
                    onBlur={() => setIsFocused(false)} // Atualiza o estado para 'não focado' quando o input perde o foco
                    className="bg-transparent border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 block w-full p-4 pr-10 font-mono transition-colors duration-100 focus:border-green-300 focus:text-green-600"
                    // Estilos aplicados ao input, incluindo efeitos de foco e transições de cores
                />
                {/* Ícone de clipboard que aparece ao lado direito do input */}
                <span
                    className="absolute inset-y-0 right-4 flex items-center cursor-text transition-colors duration-100"
                    onClick={(e) => {
                        e.stopPropagation(); // Impede a propagação do evento de clique
                        e.target.closest("div").querySelector("input").focus(); // Foca no input quando o ícone for clicado
                        copyToClipboard(); // Copia o texto para a área de transferência
                    }}
                >
                    <FaClipboard /> {/* Exibe o ícone de clipboard */}
                </span>
            </div>
            {/* Exibe a mensagem de confirmação de cópia somente quando o input estiver focado */}
            {isFocused && (
                <span className="text-green-600 text-sm">
                    {onCopiedText} {" "}
                    {/* Mensagem que confirma a cópia */}
                </span>
            )}
        </>
    );
}
