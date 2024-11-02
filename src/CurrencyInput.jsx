import React, { useState, useEffect } from "react";
import GenericInput from "./GenericInput";

// Componente para entrada de moeda
const CurrencyInput = React.forwardRef(({ ...props }, ref) => {
    const [value, setValue] = useState("0,00"); // Estado do valor da moeda

    // Função para permitir apenas números e teclas especiais
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
        ]);

        const allowedCtrlKeys = new Set(["c", "v", "a", "x", "r"]);

        if (event.ctrlKey || event.metaKey) {
            if (allowedCtrlKeys.has(event.key.toLowerCase())) {
                return; // Permite as combinações com Ctrl
            }
        }

        // Impede a ação padrão se a tecla não for permitida
        if (!/[0-9]/.test(event.key) && !allowedKeys.has(event.key)) {
            event.preventDefault(); // Impede a digitação de caracteres não permitidos
        }
    };

    // Atualiza o valor formatado ao alterar o input
    const handleChangeValue = (event) => {
        const formattedValue = formatCurrency(event.target.value);
        setValue(formattedValue);
    };

    // Efeito para definir o valor inicial, caso seja necessário
    useEffect(() => {
        setValue("0,00");
    }, []);

    return (
        <GenericInput
            inputMode="numeric"
            onKeyDown={allowOnlyNumbers}
            value={value}
            onChange={handleChangeValue}
            isCurrency
            {...props}
            ref={ref}
        />
    );
});

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
