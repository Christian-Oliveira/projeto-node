import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import auth from '../config/auth';


interface RequestDTO {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: RequestDTO): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });
        
        if (!user) {
            throw Error('Incorrect e-mail/password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw Error('Incorrect e-mail/password combination.');
        }

        const token = sign({}, auth.jwt.secret, {
            subject: user.id,
            expiresIn: auth.jwt.expiresIn,
        });

        return { user, token }

    }
}

export default AuthenticateUserService;