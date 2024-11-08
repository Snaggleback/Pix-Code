import React, { useRef, useEffect, useState } from "react";

// Hook para ajustar a altura do textarea
const useAutoResize = (ref) => {
    const adjustHeight = () => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };
    return adjustHeight;
};

// Componente genérico de input usando React.forwardRef
const GenericInput = React.forwardRef(
    ({ label, isLarge = false, initialValue, onChange, ...props }, ref) => {
        initialValue = initialValue || "";
        const inputRef = ref || useRef(null);
        const adjustHeight = useAutoResize(inputRef);
        const [value, setValue] = useState(initialValue);

        useEffect(() => {
            if (isLarge) adjustHeight();
        }, [isLarge, adjustHeight]);

        const commonClasses =
            "bg-transparent border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 block w-full p-2.5";

            const handleChange = (event) => {
                setValue(event.target.value); // Atualiza o valor local
                if (onChange) onChange(event); // Chama o onChange do componente pai, se fornecido
            };

        return (
            <div className="mt-4">
                {label && (
                    <label className="block mb-2 text-sm font-medium">
                        {label}
                    </label>
                )}
                {isLarge ? (
                    <textarea
                        value={value || initialValue}
                        ref={inputRef}
                        className={`${commonClasses} resize-none overflow-hidden min-h-16`}
                        onInput={adjustHeight}
                        onChange={handleChange}
                        {...props}
                    />
                ) : (
                    <input
                        value={value}
                        ref={inputRef}
                        type="text"
                        autoComplete="off"
                        className={commonClasses}
                        onChange={handleChange}
                        {...props}
                    />
                )}
            </div>
        );
    },
);

export default GenericInput;
