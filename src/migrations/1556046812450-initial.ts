import {MigrationInterface, QueryRunner} from 'typeorm';

export class Initial1556046812450 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `author` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(300) NOT NULL, `lastName` varchar(300) NOT NULL, `points` int NOT NULL, `isActive` tinyint NOT NULL, `dogName` varchar(255) NOT NULL, UNIQUE INDEX `IDX_5e9e388dd1b6883671c2acbea9` (`dogName`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP INDEX `IDX_5e9e388dd1b6883671c2acbea9` ON `author`');
        await queryRunner.query('DROP TABLE `author`');
    }

}
