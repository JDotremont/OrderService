import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
}

