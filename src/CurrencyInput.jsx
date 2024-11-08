import React, { useState, useEffect } from "react";

const CurrencyInput = React.forwardRef(
    ({ initialValue, label, ...props }, ref) => {
        initialValue = formatCurrency(initialValue * 100 || 0);
        const [value, setValue] = useState(initialValue);

        const allowOnlyNumbers = (event) => {
            const allowedKeys = new Set([
                "Backspace",
                "Delete",
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
                "Enter",
                "Escape",
                "c",
                "v",
                "a",
                "x",
                "r", // Inclui atalhos com Ctrl
            ]);

            if (
                !/[0-9]/.test(event.key) &&
                !allowedKeys.has(event.key) &&
                !(
                    event.ctrlKey ||
                    (event.metaKey && allowedKeys.has(event.key.toLowerCase()))
                )
            ) {
                event.preventDefault();
            }
        };

        const handleChangeValue = (event) => {
            setValue(formatCurrency(event.target.value));
        };

        useEffect(() => setValue(value), []);

        return (
            <div className="mt-4">
                <label className="block mb-2 text-sm font-medium">
                    {label}
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                        R$
                    </div>
                    <input
                        className="bg-transparent border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 block w-full p-2.5 pl-10"
                        type="text"
                        inputMode="numeric"
                        onKeyDown={allowOnlyNumbers}
                        value={value}
                        onChange={handleChangeValue}
                        ref={ref}
                        {...props}
                    />
                </div>
            </div>
        );
    },
);

// Formata o valor como moeda
export function formatCurrency(value) {
    if (value === "") return "0,00"; // Retorna "0,00" se o valor estiver vazio

    const numericValue = `${value}`.replace(/\D/g, ""); // Remove não numéricos
    const floatValue = parseFloat(numericValue) / 100; // Converte para float
    return floatValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

// Remove a formatação da moeda e retorna um número
export function unformatCurrency(value) {
    const numericValue = `${value}`.replace(/\./g, "").replace(",", "."); // Remove pontos e substitui vírgula por ponto
    return parseFloat(numericValue) || 0; // Retorna zero se não for um número
}

export default CurrencyInput;
