import GenericButton from "./GenericButton";
import GenericInput from "./GenericInput";
import CurrencyInput from "./CurrencyInput";
import { unformatCurrency, formatCurrency } from "./CurrencyInput";
import { useState, useRef } from "react";
import clsx from "clsx";

export default function PaymentCard({ onSubmit }) {
    return (
        <>
            <UserProfileImage
                src="https://github.com/snaggleback.png"
                alt="Foto de perfil do usuário"
            />
            <UserInfo name="Ítalo" subtitle="Envie um pix" />
            <Form onSubmit={onSubmit} />
        </>
    );
}

// Componente para a imagem de perfil do usuário
function UserProfileImage({ src, alt }) {
    return (
        <img
            src={src}
            alt={alt}
            className="w-32 h-32 rounded-full -mt-16 mb-4 border-4 border-white"
        />
    );
}

// Componente de informações do usuário
function UserInfo({ name, subtitle }) {
    return (
        <>
            <h1 className="font-bold text-xl text-zinc-900">{name}</h1>
            <h2 className="text-zinc-500">{subtitle}</h2>
        </>
    );
}

// Componente do formulário
function Form({ onSubmit }) {
    const [errors, setErrors] = useState({});
    const nameRef = useRef();
    const valueRef = useRef();
    const messageRef = useRef();
    const minValue = 2;

    const handleSubmit = () => {
        const formData = {
            name: nameRef.current.value,
            value: parseFloat(unformatCurrency(valueRef.current.value)),
            message: messageRef.current.value,
        };

        const validationErrors = validateFormData(formData, minValue);
        setErrors(validationErrors);

        // Chame onSubmit com os dados do formulário se não houver erros
        if (!Object.keys(validationErrors).length) {
            onSubmit(formData); // Passa os dados do formulário
        }
    };

    return (
        <div className="w-[80%] space-y-4">
            <GenericInput
                ref={nameRef}
                label="Qual seu nome?"
                name="name"
                id="name"
            />
            {errors.name && <ErrorMessage message={errors.name} />}

            <CurrencyInput
                ref={valueRef}
                label="Valor"
                name="value"
                id="value"
            />
            <MinValueErrorMessage minValue={minValue} error={errors.value} />

            <GenericInput
                ref={messageRef}
                label="Mensagem"
                maxLength={200}
                name="message"
                id="message"
                isMessage
            />
            {errors.message && <ErrorMessage message={errors.message} />}

            <CharacterCounter
                currentLength={messageRef.current?.value.length || 0}
                maxLength={200}
            />
            <GenericButton className="uppercase w-full" onClick={handleSubmit}>
                Continuar
            </GenericButton>
        </div>
    );
}

// Componente para exibir mensagens de erro
function ErrorMessage({ message }) {
    return <p className="text-red-500 text-sm">{message}</p>;
}

// Componente para exibir a mensagem de valor mínimo
function MinValueErrorMessage({ minValue, error }) {
    return (
        <p
            className={clsx(
                "text-sm",
                error ? "text-red-500" : "text-zinc-500",
            )}
        >
            O valor mínimo é R$ {formatCurrency(minValue * 100)}
        </p>
    );
}

// Componente do contador de caracteres
function CharacterCounter({ currentLength, maxLength }) {
    return (
        <p className="text-sm text-zinc-500">
            {currentLength}/{maxLength} caracteres
        </p>
    );
}

// Função de validação dos dados do formulário
function validateFormData({ name, value, message }, minValue) {
    const errors = {};

    if (!name.trim()) {
        errors.name = "Nome é obrigatório";
    } else if (name.length < 4) {
        errors.name = "Nome deve ter pelo menos 4 caracteres";
    } else if (name.length > 25) {
        errors.name = "Nome deve ter no máximo 25 caracteres";
    }

    if (!value || isNaN(value) || value <= 0) {
        errors.value = "Valor é obrigatório e deve ser um número positivo";
    } else if (value < minValue) {
        errors.value = "O valor está abaixo do permitido";
    }

    if (message.length > 200) {
        errors.message = "Mensagem deve ter no máximo 200 caracteres";
    }

    return errors;
}
