import { Router, request } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';


const usersRouter = Router();
const upload = multer(uploadConfig);

// usersRouter.get('/', async (request, response) => {
//     const usersRepository = getRepository(User);
//     const users = await usersRepository.find();
//     for (var i in users) {
//         delete users[i].password;
//     }
//     return response.json(users);
// });

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

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    return response.json({ ok: true });
});

export default usersRouter;