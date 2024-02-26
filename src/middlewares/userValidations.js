const { body } = require("express-validator");

//Generic validation function
const validateField = (field, min) => {
  return body(field)
    .isString()
    .withMessage(errorMessages[field].required)
    .isLength({ min })
    .withMessage(errorMessages[field].minLength(min))
}

//Error messages object
const errorMessages = {
  name: {
    required: "O nome é obrigatório.",
    minLength: (min) => `O nome precisa ter no mínimo ${min} caracteres.`,
  },
  lastName: {
    required: "O sobrenome é obrigatório.",
    minLength: (min) => `O sobrenome precisa ter no mínimo ${min} caracteres.`,
  },
  email: {
    required: "O e-mail é obrigatório.",
    invalid: "Insira uma e-mail válido email@email.com",
  },
  password: {
    required: "A senha é obrigatória.",
    minLength: (min) => `A senha precisa ter ${min} caracteres.`,
  },
  confirmPassword: {
    required: "É necessário confirmar a sua senha.",
    notMatch: "A senhas não são iguais",
  },
}

const userRegisterValidation = () => {
  const validations = [
    validateField("name", 3),
    validateField("lastName", 3),
    validateField("email", 1).isEmail().withMessage(errorMessages.email.invalid),
    validateField("password", 3),
    validateField("confirmPassword", 1).custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(errorMessages.confirmPassword.notMatch)
      }

      return true;
    }),
  ]

  return [...validations]
}

const userLoginValidation = () => {
  const validations = [
    validateField("email", 1).isEmail().withMessage(errorMessages.email.invalid),
    validateField("password", 1),
  ]

  return [...validations]
}

module.exports = {
  userRegisterValidation,
  userLoginValidation,
}
