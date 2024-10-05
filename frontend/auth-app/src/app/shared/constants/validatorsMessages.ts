import { ValidationsMessages } from "../interfaces";

export const VALIDATORS_MESSAGES: ValidationsMessages = {
  dateOrderInvalid: "Data de final deve ser maior ou igual a data inicial.",
  futureDateInvalid: "A data não pode ser posterior que a do dia atual.",
  beforeDateInvalid: "A data não pode ser anterior que a do dia atual.",
  required: "Campo Obrigatório!",
  email: "E-mail inválido",
  password: "E-mail ou senha inválidos",
  notMatchPassword: "As senhas não são iguais",
  notMatchEmail: "Os e-mails não coincidem",
  minlength: "Caracteres insuficientes",
  maxlength: "Caracteres excedidos!",
  passwordStrength: "A senha não atende aos requisitos mínimos.",
  pattern: "Caracteres inválidos",
}
