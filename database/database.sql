CREATE DATABASE IF NOT EXISTS `movieRental`
    DEFAULT CHARACTER SET uft8
    DEFAULT COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `movieRental`.`movies`(
    `id` BINARY(16) NOT NULL,
    `title` VARCHAR(80) NOT NULL UNIQUE,
    `director` VARCHAR(80) NOT NULL,
    `quantities` INT NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updateAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`title`) 
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `movieRental`.`users`(
    `id` BINARY(16) NOT NULL, 
    `name` VARCHAR(80) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updateAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    PRIMARY KEY(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `movieRental`.`rentals`(
    `id` BINARY(16) NOT NULL,
    `idMovie` BINARY(16) NOT NULL,
    `idUser` BINARY(16) NOT NULL,
    `status` ENUM('RENTED','RETURNED'),
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updateAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`),
    FOREIGN KEY (`idMovie`) REFERENCES `movieRental`.`movies`(`id`),
    FOREIGN KEY (`idUser`) REFERENCES `movieRental`.`users`(`id`)
) ENGINE = InnoDB;