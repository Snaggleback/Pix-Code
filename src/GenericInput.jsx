import React, { useRef, useEffect, useState } from "react";

// Hook personalizado para ajustar automaticamente a altura do textarea
const useAutoResize = (ref) => {
    // Função que ajusta a altura do elemento de input (textarea) com base no seu conteúdo
    const adjustHeight = () => {
        if (ref.current) {
            // Reseta a altura para 'auto' para recalcular o tamanho
            ref.current.style.height = "auto";
            // Ajusta a altura para o valor do scrollHeight, que é a altura total necessária para exibir o conteúdo
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };
    return adjustHeight; // Retorna a função que ajusta a altura
};

// Componente genérico de input usando React.forwardRef
const GenericInput = React.forwardRef(
    ({ label, isLarge = false, initialValue, onChange, ...props }, ref) => {
        // Define um valor inicial para o input, se não for fornecido, o valor é uma string vazia
        initialValue = initialValue || "";
        // Usando o ref passado ou criando um novo ref local para o input
        const inputRef = ref || useRef(null);
        // Hook que ajusta a altura do textarea quando necessário
        const adjustHeight = useAutoResize(inputRef);
        // Estado local para armazenar o valor do input
        const [value, setValue] = useState(initialValue);

        // Efeito que ajusta a altura do textarea se o campo for grande
        useEffect(() => {
            if (isLarge) adjustHeight(); // Só ajusta a altura se o input for do tipo grande
        }, [isLarge, adjustHeight]); // O efeito é executado quando o tamanho do input muda

        // Classes comuns usadas para estilização do input e textarea
        const commonClasses =
            "bg-transparent border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 block w-full p-2.5";

        // Função chamada sempre que o valor do input é alterado
        const handleChange = (event) => {
            // Atualiza o valor local do input
            setValue(event.target.value);
            // Chama a função onChange passada pelo componente pai, se ela existir
            if (onChange) onChange(event);
        };

        return (
            <div className="mt-4">
                {label && (
                    // Renderiza o rótulo se o "label" for fornecido
                    <label className="block mb-2 text-sm font-medium">
                        {label}
                    </label>
                )}
                {isLarge ? (
                    // Se o campo for grande, renderiza um textarea
                    <textarea
                        value={value || ""} // Define o valor do textarea, se estiver vazio, usa uma string vazia
                        ref={inputRef} // Referência do textarea
                        className={`${commonClasses} resize-none overflow-hidden min-h-16`} // Classes CSS com Tailwind e estilos adicionais
                        onInput={adjustHeight} // Ajusta a altura do textarea conforme o conteúdo muda
                        onChange={handleChange} // Chama a função de alteração do valor
                        {...props} // Passa quaisquer outras propriedades adicionais (como placeholder, etc.)
                    />
                ) : (
                    // Se o campo não for grande, renderiza um input normal
                    <input
                        value={value} // Define o valor do input
                        ref={inputRef} // Referência do input
                        type="text" // Define o tipo de input como texto
                        autoComplete="off" // Desabilita o autocomplete do navegador
                        className={commonClasses} // Classes CSS com Tailwind
                        onChange={handleChange} // Chama a função de alteração do valor
                        {...props} // Passa quaisquer outras propriedades adicionais
                    />
                )}
            </div>
        );
    },
);

export default GenericInput;
