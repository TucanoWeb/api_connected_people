const { body } = require("express-validator");

const userRegisterValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),

    body("lastName")
      .isString()
      .withMessage("O sobrenome é obrigatório.")
      .isLength({min: 3})
      .withMessage("O sobrenome precisa ter no mínimo 3 caracteres."),

    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório")
      .isEmail()
      .withMessage("Insira uma e-mail válido email@email.com"),

    body("password")
      .isString()
      .withMessage("A senha é obrigatória")
      .isLength({min: 3})
      .withMessage("A senha precisa ter 3 caracteres."),

    body("confirmPassword")
      .isString()
      .withMessage("É necessário confirmar a sua senha.")
      .custom((value, {req}) => {

        if(value !== req.body.password){
            throw new Error("A senhas não são iguais")
        }

        return true

      })
  ];
};

const userLoginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido"),
    
      body("password")
    .isString()
    .withMessage("A senha é obrigatória.")
  ];
};

module.exports = {
  userRegisterValidation,
  userLoginValidation
}