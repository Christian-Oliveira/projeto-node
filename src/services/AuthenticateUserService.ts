import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';


interface RequestDTO {
    email: string;
    password: string;
}

interface Response {
    user: User;
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

        return { user }

    }
}

export default AuthenticateUserService;