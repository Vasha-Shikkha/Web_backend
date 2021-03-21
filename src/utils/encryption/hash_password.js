const bcrypt = require('bcryptjs')

const hash_password = async (passowrd) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10))
    return await bcrypt.hash(passowrd, salt)
}

const compare = async (raw_password, hashed_password) => {
    return bcrypt.compare(raw_password, hashed_password)
}

module.exports = {
    hash_password,
    compare
}
