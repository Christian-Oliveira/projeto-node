import { getRepository } from 'typeorm';
import { Router } from 'express';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';


const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();
    for (var i in users) {
        delete users[i].password;
    }
    return response.json(users);
});

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name, email, password,
        });

        delete user.password;

        return response.json(user);
    } catch (e) {
        return response.status(400).json({ error: e.message });
    }
});

export default usersRouter;