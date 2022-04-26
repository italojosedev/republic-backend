import {
  getConnection,
  Connection,
  QueryRunner,
  FindOneOptions,
  ILike,
  Not
} from 'typeorm';
import { IRepublic } from '@interfaces';
import { Republic } from '@models';
import { Code } from '@utils';

class RepublicRepository {
  private relations: string[] = ['users'];

  async store(body: IRepublic): Promise<Republic> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const republic: Republic = queryRunner.manager.create(Republic, {
        actived: true,
        ...body
      });

      await queryRunner.manager.save(republic);

      await queryRunner.commitTransaction();

      return republic;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async list(page: number, itemsPerPage: number): Promise<object> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    const republics: Republic[] = await queryRunner.manager.find(Republic, {
      order: {
        createdAt: 'ASC',
      },
      take: +itemsPerPage,
      skip: +page * +itemsPerPage,
      relations: this.relations,
    });

    const total: number = await queryRunner.manager.count(Republic);

    await queryRunner.release();

    return {
      republics,
      total: {
        items: total,
        pages: total > +itemsPerPage ? total / +itemsPerPage : total,
      },
      currentPage: +page,
      itemsPerPage: +itemsPerPage,
    };
  }

  async getById(id: number): Promise<Republic> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    try {
      const republic: Republic = await queryRunner.manager.findOneOrFail(Republic, id, {
        relations: this.relations,
      });

      return republic;
    } catch (error) {
      console.log('InterestRepository getById error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(query: FindOneOptions<Republic>) {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    try {
      const republic = await queryRunner.manager.findOne(Republic, {
        ...query,
        relations: this.relations,
      });

      return republic;
    } catch (error) {
      console.log('RepublicRepository findOne error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findOneById(id: number) {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    try {
      const republic = await queryRunner.manager.findOne(Republic, id, {
        relations: this.relations,
      });

      return republic;
    } catch (error) {
      console.log('RepublicRepository findOneById error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async searchByName(
    name: string,
    page: number,
    itemsPerPage: number,
    republicId: number
  ): Promise<object> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    const republics: Republic[] = await queryRunner.manager.find(Republic, {
      where: {
        fullName: ILike(`%${name}%`),
        id: Not(republicId)
      },
      take: +itemsPerPage,
      skip: +page * +itemsPerPage,
      relations: [...this.relations],
    });

    const total: number = await queryRunner.manager.count(Republic,  {
      where: {
        fullName: ILike(`%${name}%`),
        id: Not(republicId)
      },
    });

    await queryRunner.release();

    return {
      republics,
      total: {
        items: total,
        pages: Math.round(total / +itemsPerPage) ,
      },
      currentPage: +page,
      itemsPerPage: +itemsPerPage,
    };
  }

  async update(id: number, body: any): Promise<Republic> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      await queryRunner.manager.update(Republic, id, {
        ...body,
      });
      console.log('body')
      console.log(body)

      await queryRunner.commitTransaction();
      const republic: Republic = await this.getById(id);

      return republic;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async destroy(id: number): Promise<string> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.getById(id);

      await queryRunner.manager.delete(Republic, id);

      await queryRunner.commitTransaction();

      return 'Republic has been deleted';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

export default new RepublicRepository();
