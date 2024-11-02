import { FaClipboard } from "react-icons/fa6";
import { useState, useEffect } from "react";

export default function ReadOnlyInput({ defaultValue }) {
    const [isCopied, setIsCopied] = useState(false);
    const [defaultValueToCopy, setDefaultValueToCopy] = useState(defaultValue);

    const copyToClipboard = async () => {
        try {
            // Tenta usar a API moderna para copiar texto
            await navigator.clipboard.writeText(defaultValueToCopy);
            setIsCopied(true);
        } catch (err) {
            console.error("Erro ao copiar: ", err);
            alert(`Erro ao copiar: ${err}`);
        }
    };

    useEffect(() => {
        let timer;
        if (isCopied) {
            timer = setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [isCopied]);

    return (
        <>
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={defaultValueToCopy}
                    readOnly
                    onClick={copyToClipboard}
                    className="bg-transparent border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 block w-full p-4 pr-10 font-mono" // Use w-full para ocupar toda a largura
                />
                <span
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer"
                    onClick={copyToClipboard} // Permite copiar ao clicar no ícone também
                >
                    <FaClipboard />
                </span>
            </div>
            {isCopied && (
                <span className="text-green-700 text-sm">
                    Código copiado com sucesso!
                </span>
            )}{" "}
            {/* Mensagem de feedback */}
        </>
    );
}
