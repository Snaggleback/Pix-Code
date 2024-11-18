import GenericButton from "./GenericButton"; // Componente de botão genérico
import GenericInput from "./GenericInput"; // Componente genérico de input
import CurrencyInput from "./CurrencyInput"; // Componente para input de valores monetários
import { unformatCurrency, formatCurrency } from "./CurrencyInput"; // Funções de formatação de valores monetários
import { useState, useRef } from "react"; // Hooks do React para gerenciar estado e referências
import clsx from "clsx"; // Biblioteca para classNames condicionais

// Componente principal do cartão de pagamento
export default function PaymentCard({ onSubmit }) {
    return (
        <>
            {/* Exibe a imagem de perfil do usuário */}
            <UserProfileImage
                src="https://github.com/snaggleback.png"
                alt="Foto de perfil do usuário"
            />
            {/* Exibe as informações do usuário */}
            <UserInfo name="Ítalo" subtitle="Envie um pix" />
            {/* Exibe o formulário com os dados do pagamento */}
            <Form onSubmit={onSubmit} />
        </>
    );
}

// Componente para exibir a imagem de perfil do usuário
function UserProfileImage({ src, alt }) {
    return (
        <img
            src={src} // URL da imagem
            alt={alt} // Texto alternativo para a imagem
            className="w-32 h-32 rounded-full -mt-16 mb-4 border-4 border-white" // Classes do Tailwind para estilização
        />
    );
}

// Componente para exibir as informações do usuário
function UserInfo({ name, subtitle }) {
    return (
        <>
            {/* Nome do usuário */}
            <h1 className="font-bold text-xl text-zinc-900">{name}</h1>
            {/* Subtítulo informativo */}
            <h2 className="text-zinc-500">{subtitle}</h2>
        </>
    );
}

// Componente do formulário para coletar as informações de pagamento
function Form({ onSubmit }) {
    // Recupera os dados do sessionStorage ou inicializa com valores vazios
    const data = JSON.parse(sessionStorage.getItem("data")) || {};
    
    // Hooks para gerenciar o estado dos erros e o comprimento da mensagem
    const [errors, setErrors] = useState({});
    const [messageLength, setMessageLength] = useState(
        data.message?.length || 0 // Inicializa com o comprimento da mensagem armazenada
    );

    // Referências para os campos do formulário
    const [nameRef, valueRef, messageRef] = [useRef(), useRef(), useRef()];
    
    // Valor mínimo para o campo 'valor'
    const minValue = 1;

    // Função chamada ao submeter o formulário
    const handleSubmit = () => {
        // Coleta os dados do formulário
        const formData = {
            name: nameRef.current.value,
            value: valueRef.current.value,
            numericValue: parseFloat(unformatCurrency(valueRef.current.value)),
            message: messageRef.current.value,
        };

        // Valida os dados do formulário
        const validationErrors = validateFormData(formData, minValue);
        setErrors(validationErrors); // Atualiza o estado dos erros

        // Se não houver erros, chama o onSubmit e armazena os dados no sessionStorage
        if (!Object.keys(validationErrors).length) {
            onSubmit();
            sessionStorage.clear();
            sessionStorage.setItem("data", JSON.stringify(formData));
        }
    };

    // Função para atualizar o comprimento da mensagem
    const handleMessageChange = (event) => {
        setMessageLength(event.target.value.length); // Atualiza o comprimento da mensagem
    };

    return (
        <div className="w-[80%] space-y-4">
            {/* Campo para o nome do usuário */}
            <GenericInput
                ref={nameRef}
                label="Qual seu nome?"
                name="name"
                id="name"
                initialValue={data.name}
            />
            {/* Exibe a mensagem de erro para o campo nome, se existir */}
            {errors.name && <ErrorMessage message={errors.name} />}

            {/* Campo para o valor do Pix */}
            <CurrencyInput
                ref={valueRef}
                label="Valor"
                name="value"
                id="value"
                initialValue={data.value}
            />
            {/* Exibe a mensagem de erro de valor mínimo, se houver */}
            <MinValueErrorMessage minValue={minValue} error={errors.value} />

            {/* Campo para a mensagem do Pix */}
            <GenericInput
                ref={messageRef}
                label="Mensagem"
                maxLength={35} // Limite de caracteres
                name="message"
                id="message"
                isLarge // Indica que o campo é grande (textarea)
                onChange={handleMessageChange} // Atualiza o comprimento da mensagem
                initialValue={data.message}
            />
            {/* Exibe a mensagem de erro para o campo mensagem, se existir */}
            {errors.message && <ErrorMessage message={errors.message} />}

            {/* Exibe o contador de caracteres */}
            <CharacterCounter
                currentLength={messageLength} // Usa o estado para o comprimento da mensagem
                maxLength={35}
            />
            {/* Botão de envio */}
            <GenericButton className="w-full" onClick={handleSubmit}>
                Continuar
            </GenericButton>
        </div>
    );
}

// Componente para exibir uma mensagem de erro
function ErrorMessage({ message }) {
    return <p className="text-red-500 text-sm">{message}</p>;
}

// Componente para exibir a mensagem de erro de valor mínimo
function MinValueErrorMessage({ minValue, error }) {
    return (
        <p
            className={clsx(
                "text-sm", // Estilo básico
                error ? "text-red-500" : "text-zinc-500" // Se houver erro, exibe a mensagem em vermelho
            )}
        >
            O valor mínimo é R$ {formatCurrency(minValue * 100)} {/* Exibe o valor mínimo formatado */}
        </p>
    );
}

// Componente do contador de caracteres
function CharacterCounter({ currentLength, maxLength }) {
    return (
        <p className="text-sm text-zinc-500">
            {currentLength}/{maxLength} caracteres {/* Exibe o contador de caracteres */}
        </p>
    );
}

// Função para validar os dados do formulário
function validateFormData({ name, numericValue, message }, minValue) {
    const errors = {};

    // Valida o campo 'name' (nome do usuário)
    if (name.length > 25) {
        errors.name = "Nome deve ter no máximo 25 caracteres";
    }

    // Valida o campo 'value' (valor do Pix)
    if (!numericValue || isNaN(numericValue) || numericValue <= 0) {
        errors.value = "Valor é obrigatório e deve ser um número positivo";
    } else if (numericValue < minValue) {
        errors.value = "O valor está abaixo do permitido";
    }

    // Valida o campo 'message' (mensagem do Pix)
    if (message.length > 35) {
        errors.message = "Mensagem deve ter no máximo 35 caracteres";
    }

    return errors; // Retorna os erros encontrados
}
