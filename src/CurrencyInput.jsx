import React, { useState, useEffect } from "react";

// Componente CurrencyInput usando React.forwardRef para passar referências para o input
const CurrencyInput = React.forwardRef(
    ({ initialValue, label, ...props }, ref) => {
        // Formata o valor inicial para o formato de moeda e define o estado value
        initialValue = formatCurrency(initialValue * 100 || 0);
        const [value, setValue] = useState(initialValue);

        // Função para permitir apenas números e algumas teclas especiais
        const allowOnlyNumbers = (event) => {
            // Conjunto de teclas permitidas, como Backspace, Delete, teclas de navegação e atalhos
            const allowedKeys = new Set([
                "Backspace", "Delete", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Escape", "c", "v", "a", "x", "r", // Inclui atalhos com Ctrl
            ]);

            // Impede o evento de tecla, caso não seja um número nem uma tecla permitida
            if (
                !/[0-9]/.test(event.key) && 
                !allowedKeys.has(event.key) && 
                !(event.ctrlKey || (event.metaKey && allowedKeys.has(event.key.toLowerCase())))
            ) {
                event.preventDefault(); // Previne a digitação de caracteres não permitidos
            }
        };

        // Função para tratar as mudanças de valor no campo de input
        const handleChangeValue = (event) => {
            // Atualiza o estado com o valor formatado
            setValue(formatCurrency(event.target.value));
        };

        // Hook useEffect para garantir que o valor seja atualizado após o primeiro render
        useEffect(() => setValue(value), []);

        return (
            <div className="mt-4">
                {/* Rótulo do campo de input */}
                <label className="block mb-2 text-sm font-medium">
                    {label}
                </label>
                <div className="relative">
                    {/* Símbolo de Real (R$) fixado à esquerda do campo de input */}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                        R$
                    </div>
                    {/* Campo de input com estilo personalizado e configuração de teclado numérico */}
                    <input
                        className="bg-transparent border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 block w-full p-2.5 pl-10"
                        type="text"
                        inputMode="numeric" // Define o modo de entrada como numérico
                        onKeyDown={allowOnlyNumbers} // Atribui a função que valida as teclas pressionadas
                        value={value} // Controla o valor exibido no campo
                        onChange={handleChangeValue} // Atualiza o valor quando há alteração
                        ref={ref} // Passa a referência do campo de input
                        {...props} // Permite que outras props sejam passadas para o input
                    />
                </div>
            </div>
        );
    },
);

// Função que formata um valor numérico para o formato de moeda (R$)
export function formatCurrency(value) {
    if (value === "") return "0,00"; // Se o valor for vazio, retorna "0,00"

    const numericValue = `${value}`.replace(/\D/g, ""); // Remove qualquer caractere não numérico
    const floatValue = parseFloat(numericValue) / 100; // Converte o valor para float e divide por 100 para ajustar a formatação de centavos
    return floatValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2, // Garante que sempre serão exibidos 2 decimais
    });
}

// Função que remove a formatação da moeda e converte o valor para número
export function unformatCurrency(value) {
    const numericValue = `${value}`.replace(/\./g, "").replace(",", "."); // Remove os pontos e substitui vírgula por ponto
    return parseFloat(numericValue) || 0; // Retorna o valor numérico ou 0 se não for um número válido
}

export default CurrencyInput; // Exporta o componente CurrencyInput
