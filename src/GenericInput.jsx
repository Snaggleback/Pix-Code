import React, { useRef, useEffect } from "react";
import clsx from "clsx";

// Hook para ajustar a altura do textarea
const useAutoResize = (ref) => {
    const adjustHeight = () => {
        if (ref.current) {
            ref.current.style.height = "auto"; // Reseta a altura para recalcular
            ref.current.style.height = `${ref.current.scrollHeight + 2}px`; // Define a altura conforme o conteúdo
        }
    };
    return adjustHeight;
};

// Componente genérico de input usando React.forwardRef
const GenericInput = React.forwardRef(
    ({ label, isCurrency = false, isMessage = false, ...propsInput }, ref) => {
        const textareaRef = ref || useRef(null); // Usa o ref passado ou cria um novo
        const adjustHeight = useAutoResize(textareaRef); // Hook para ajustar altura

        // Efeito para ajustar a altura quando o conteúdo inicial é definido
        useEffect(() => {
            if (isMessage) {
                adjustHeight();
            }
        }, [isMessage, adjustHeight]);

        return (
            <div className="mt-4">
                <label className="block mb-2 text-sm font-medium">
                    {label}
                </label>
                <div className="relative">
                    {isCurrency && (
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                            R$
                        </div>
                    )}
                    {isMessage ? (
                        <textarea
                            ref={textareaRef}
                            className="bg-transparent border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 block w-full p-2.5 resize-none overflow-hidden min-h-16"
                            onInput={adjustHeight} // Ajusta a altura ao digitar
                            {...propsInput}
                        />
                    ) : (
                        <input
                            ref={ref}
                            type="text"
                            autoComplete="off"
                            className={clsx(
                                "bg-transparent border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 block w-full p-2.5",
                                isCurrency && "pl-10", // Adiciona espaço à esquerda se for moeda
                            )}
                            {...propsInput}
                        />
                    )}
                </div>
            </div>
        );
    },
);

export default GenericInput;
