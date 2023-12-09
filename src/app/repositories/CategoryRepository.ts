import { randomUUID } from 'node:crypto';

import { prisma } from '../../lib/prisma';

class CategoryRepository {
  async listAll() {
    const allCategories = await prisma.tbl_categories.findMany();
    return allCategories;
  }

  async findById(id: string) {
    const category = await prisma.tbl_categories.findUnique({
      where: { id }
    });

    return category;
  }

  async register(name: string) {
    const newCategory = await prisma.tbl_categories.create({
      data: {
        id: randomUUID(),
        name,
      }
    });

    return newCategory;
  }

  async update(id: string, name: string) {
    await prisma.tbl_categories.update({
      where: { id },
      data: {
        name,
      }
    });
  }

  async remove(id: string) {
    await prisma.tbl_categories.delete({
      where: { id }
    });
  }
}

export default new CategoryRepository();
