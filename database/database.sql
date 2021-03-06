CREATE DATABASE IF NOT EXISTS `movieRental`
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;

use `movieRental`;

CREATE TABLE IF NOT EXISTS `movieRental`.`movies`(
    `id` CHAR (36) NOT NULL,
    `title` VARCHAR (80) NOT NULL UNIQUE,
    `director` VARCHAR (80) NOT NULL,
    `quantities` INT UNSIGNED NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updateAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`title`) 
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `movieRental`.`users`(
    `id` CHAR(36) NOT NULL, 
    `name` VARCHAR(80) NOT NULL,
    `email` VARCHAR(80) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updateAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    PRIMARY KEY(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `movieRental`.`rentals`(
    `id` CHAR(36) NOT NULL,
    `titleMovie` VARCHAR(80) NOT NULL,
    `idUser` CHAR(36) NOT NULL,
    `status` ENUM('rented','returned') DEFAULT 'rented',
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updateAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`),
    FOREIGN KEY (`idUser`) REFERENCES `users`(`id`),
    FOREIGN KEY (`titleMovie`) REFERENCES `movies`(`title`)
) ENGINE = InnoDB;

INSERT INTO `movieRental`.`users` (`id`, `name`, `email`, `password`) VALUES ('62267e26-1f23-4983-9131-95dd6d301893', 'John Doe', 'johndoe@email.com', '$2a$10$oFbjTxlnwEDxJSVWXjYpKOKrFTGaxXWoinTLo0fuP8zSh3qX9ty7q');