import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '@models';
import { Util } from '@utils';

@Injectable()
export class AuthorService {

  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async validate(author: Author) {
      const checkUnique = await this.authorRepository.
      createQueryBuilder('author').
      where('author.dogName = :dogName', {dogName: author.dogName} ).
      getCount();

      if (checkUnique > 0) {
        throw new BadRequestException(Util.getMessage('dogname_unique'));
      }
  }

  async findAuthor(id: number): Promise<Author> {
    return await this.authorRepository.findOne(id);
  }

  async createAuthor(author: Author): Promise<Author> {
    return await this.authorRepository.save(author);
  }

  async editAuthor(author: Author): Promise<Author> {
    return await this.authorRepository.save(author);
  }

  async list(max: number, offset: number): Promise<any> {
    return await this.authorRepository.findAndCount({
      skip: offset,
      take: max,
    });
  }
}
