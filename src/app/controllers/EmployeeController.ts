import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

import EmployeeRepository from '../repositories/EmployeeRepository';

const saltPassword = 10;

class EmployeeController {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const employees = await EmployeeRepository.listAll();

    if (employees.length <= 0) {
      return reply.status(404).send({ message: 'Nenhum funcionário cadastrado' });
    }

    return employees;
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params;

    const employee = await EmployeeRepository.findById(id);

    if (!employee) {
      return reply.status(404).send({ message: 'Funcionário não encontrado' });
    }

    return employee;
  }

  async store(request: FastifyRequest, reply: FastifyReply) {
    const {
      name, email, password, role,
      date_fired, restaurant_id
    } = request.body;

    const userExist = await EmployeeRepository.findByEmail(email);

    if (userExist) {
      return reply.status(409).send({ message: 'Usuário já cadastrado' });
    }

    const hashPassword = await bcrypt.hash(password, saltPassword);

    await EmployeeRepository.register({
      name, email, password: hashPassword, role,
      date_hired: new Date(), date_fired, restaurant_id
    });

    reply.status(201).send({ message: 'Funcionário criado com sucesso' });
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body;

    const employee = await EmployeeRepository.findByEmail(email);

    if (!employee) {
      return reply.status(401).send({ message: 'Falha de autenticação' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, employee.password);

    if (!isPasswordCorrect) {
      return reply.status(401).send({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ name, email, role: employee.role }, process.env.SECRET_KEY, {
      expiresIn: '5min'
    });

    reply.send({ token, message: 'Funcionário logado com sucesso' });
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params;

    const { name, email, role, date_hired, date_fired, restaurant_id } = request.body;

    const employee = await EmployeeRepository.findById(id);

    if (!employee) {
      return reply.status(404).send({ message: 'Funcionário não encontrado' });
    }

    await EmployeeRepository.update(id, {
      name, email, role,
      date_hired, date_fired, restaurant_id
    });

    reply.status(202).send({ message: 'Funcionário atualizado com sucesso' });
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params;

    const employee = await EmployeeRepository.findById(id);

    if (!employee) {
      return reply.status(404).send({ message: 'Funcionário não encontrado' });
    }

    await EmployeeRepository.remove(id);

    reply.status(202).send({ message: 'Funcionário deletado com sucesso' });
  }
}

export default new EmployeeController();
