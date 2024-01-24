const UserModel = require("../model/UserModel")
const brcypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const jwtSecret = "oljkçlndcfkonwlkfcnoihoiefihpei2he3flmnefçlnçlkwefnçlknpi"

//Generate user token
const generateToken = (id) => {
  return jwt.sign({id}, jwtSecret, {
    expiresIn: "7d"
  })
}

const registerUser = async (req, res) => {

  const { name, lastName, email, password } = req.body
  const id = Math.floor(Math.random() * 10) + new Date().getMilliseconds()

  try {

    const user = await UserModel.findOne({ where: { email } })

    //Check if user exist
    if (user) {
      res.status(422).json({ errors: ["Por favor, utilize outro e-mail."] })
      return
    }

    //Generate passwrod hash
    const salt = await brcypt.genSaltSync()
    const passwordHash = await brcypt.hashSync(password, salt)

    const newUser = await UserModel.create({
      id, name, lastName, email, password: passwordHash
    })


    if(!newUser) {
      res.status(422).json({
        errors: ["Houve um erro, por favor tente novamente mais tarde."]
      })

      return
    }

    res.status(201).json({
      id: newUser.id,
      token: generateToken(newUser.id)
    })

  }catch(error){
    console.log(error)
  }


}


const loginUser = async(req, res) => {
  
  const {email, password} = req.body

  const user = await UserModel.findOne({where: {email}})

  //Check if user exists
  if(!user){
    res.status(404).json({
      errors: ["Usário não encontrado"]
    })

    return
  }

  //Check if password matches
  if(!await brcypt.compareSync(password, user.password)){
    res.status(422).json({
      errors: ["Senha inválida"]
    })

    return
  }

  //Return user with token
  res.status(200).json({
    id: user.id, 
    profileImage: user.profileImage,
    token: generateToken(user.id)
  })

}

module.exports = {
  registerUser,
  loginUser
}