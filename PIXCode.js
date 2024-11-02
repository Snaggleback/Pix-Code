import pkg from "steplix-emv-qrcps";
const { Merchant } = pkg;

export default class PIXCode {
    constructor(key, keyType, amount, name, city, message, identifier) {
        this.key = key;
        this.keyType = keyType;
        this.amount = amount;
        this.name = name;
        this.city = city;
        this.message = message;
        this.identifier = identifier;
    }

    // Métodos auxiliares para formatação
    static formatText(text = "") {
        return `${text}`
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    static formatMessage(message = "") {
        return `${message}`
            .toLowerCase()
            .replace(/(^\s*\w|[\.\;]\s*\w)/g, (c) => c.toUpperCase())
            .replace(/\s+/g, " ")
            .trim();
    }

    // Getters e Setters com validações e formatação
    set key(value) {
        this._key = PIXCode.formatText(value).toLowerCase();
    }
    get key() {
        return this._key;
    }

    set keyType(value) {
        const validTypes = ["random", "cpf", "cnpj", "number", "email"];
        this._keyType = validTypes.includes(value.toLowerCase())
            ? value.toLowerCase()
            : "other";
    }
    get keyType() {
        return this._keyType;
    }

    set amount(value) {
        const cleanedValue = PIXCode.formatText(value)
            .replace(/[^0-9.,]/g, "")
            .replace(/\s+/g, "");
        const numericValue = parseFloat(cleanedValue.replace(",", "."));
        this._amount =
            isNaN(numericValue) || numericValue < 0
                ? "0.00"
                : numericValue.toFixed(2);
    }
    get amount() {
        return this._amount;
    }

    set name(value) {
        const formattedName = PIXCode.formatText(value).toUpperCase();
        this._name = formattedName.slice(0, 25)
        if (formattedName.length === 0) this._name = "X".repeat(4);
    }
    get name() {
        return this._name;
    }

    set city(value) {
        const formattedCity = PIXCode.formatText(value).toUpperCase();
        this._city = formattedCity.slice(0, 15);
        if (formattedCity.length === 0) this._city = "X".repeat(4);
    }
    get city() {
        return this._city;
    }

    set message(value) {
        this._message = PIXCode.formatMessage(value);
    }
    get message() {
        return this._message;
    }

    set identifier(value) {
        const formattedIdentifier = PIXCode.formatText(value)
            .replace(/[^a-zA-Z0-9]/g, "")
            .toUpperCase();
        this._identifier = formattedIdentifier
            ? formattedIdentifier.slice(0, 20)
            : "***";
    }
    get identifier() {
        return this._identifier;
    }

    // Método principal para geração do código PIX
    generate() {
        const emvqr = Merchant.buildEMVQR();
        emvqr.setPayloadFormatIndicator("01");
        emvqr.setCountryCode("BR");
        emvqr.setMerchantCategoryCode("0000");
        emvqr.setTransactionCurrency("986");

        const merchantAccountInfo = Merchant.buildMerchantAccountInformation();
        merchantAccountInfo.setGloballyUniqueIdentifier("BR.GOV.BCB.PIX");
        merchantAccountInfo.addPaymentNetworkSpecific("01", this.key);

        if (this.message) {
            merchantAccountInfo.addPaymentNetworkSpecific("02", this.message);
        }

        emvqr.addMerchantAccountInformation("26", merchantAccountInfo);
        emvqr.setMerchantName(this.name);
        emvqr.setMerchantCity(this.city);

        if (+this.amount > 0) {
            emvqr.setTransactionAmount(this.amount);
        }

        const additionalData = Merchant.buildAdditionalDataFieldTemplate();
        additionalData.setReferenceLabel(this.identifier);
        emvqr.setAdditionalDataFieldTemplate(additionalData);

        return emvqr.generatePayload();
    }
}
