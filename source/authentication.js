import bcrypt from "bcrypt";

const hashedPassword = {
    createPassword: async function(pass) {
        const salt = 10;
        return bcrypt.hash(pass, salt);
    },
    checkPassword: async function(hashedPassword, candidatPassword) {
        try {
            if(await bcrypt.compare(candidatPassword, hashedPassword)) {
                return "Password is correct";
            } else {
                throw new Error("Password not correct");
            }            
        } catch (error) {
            return error.message;
        }
    }
}

export default hashedPassword;