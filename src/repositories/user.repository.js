import UserDTO from "../dto/user.dto.js";
import userDAO from "../dao/userDAO.js";

class UserRepository {
    async getAll() {
        const users = await userDAO.getAll();
        return users.map(user => new UserDTO(user));
    }

    async getById(id) {
        const user = await userDAO.getById(id);
        return new UserDTO(user);
    }

    async create(user) {
        const newUser = await userDAO.create(user);
        return new UserDTO(newUser);
    }

    async update(id, user) {
        const updatedUser = await userDAO.update(id, user);
        return new UserDTO(updatedUser);
    }

    async delete(id) {
        return await userDAO.delete(id);
    }
}

export default new UserRepository();