import { randomUUID } from 'node:crypto';

import { prisma } from '../../lib/prisma';
import { IEmployee, IEmployeeUpdate } from '../../types/Employee';

class EmployeeRepository {
  async listAll() {
    const allEmployees = await prisma.tbl_employees.findMany();
    return allEmployees;
  }

  async findById(id: string) {
    const employee = await prisma.tbl_employees.findUnique({
      where: { id }
    });

    return employee;
  }

  async findByEmail(email: string) {
    const employee = await prisma.tbl_employees.findUnique({
      where: { email }
    });

    return employee;
  }

  async register(data: IEmployee) {
    const newCategory = await prisma.tbl_employees.create({
      data: {
        id: randomUUID(),
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        date_hired: data.date_hired,
        date_fired: data.date_fired || null,
        tbl_restaurants_id: data.restaurant_id
      }
    });

    return newCategory;
  }

  async update(id: string, data: IEmployeeUpdate) {
    const employeeUpdated = await prisma.tbl_employees.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        date_hired: data.date_hired,
        date_fired: data.date_fired || null,
        tbl_restaurants_id: data.restaurant_id
      }
    });

    return employeeUpdated;
  }

  async remove(id: string) {
    await prisma.tbl_employees.delete({
      where: { id }
    });
  }
}

export default new EmployeeRepository();
