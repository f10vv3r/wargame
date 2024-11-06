CREATE TABLE `users` (
	`usr_idx`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`id`	VARCHAR(60)	NOT NULL,
	`pw`	CHAR(60)	NOT NULL,
	`email`	VARCHAR(60)	NOT NULL,
	`class`	INT	NOT NULL,
	`flag`	JSON	NOT NULL,
	`usr_time`	DATETIME	NOT NULL
);

CREATE TABLE `comments` (
	`com_idx`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`com_group`	INT	NOT NULL,
	`usr_idx`	INT	NOT NULL,
	`pro_idx`	INT	NOT NULL,
	`text`	TEXT	NOT NULL,
	`depth`	INT	NOT NULL,
	`com_time`	DATETIME	NOT NULL
);

CREATE TABLE `problems` (
	`pro_idx`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`usr_idx`	INT	NOT NULL,
	`title`	TEXT	NOT NULL,
	`text`	TEXT	NOT NULL,
	`flag`	VARCHAR(256)	NOT NULL,
	`pro_time`	DATETIME	NOT NULL
);

ALTER TABLE `users` ADD CONSTRAINT `PK_USERS` PRIMARY KEY (
	`usr_idx`
);

ALTER TABLE `comments` ADD CONSTRAINT `PK_COMMENTS` PRIMARY KEY (
	`com_idx`,
	`com_group`,
	`usr_idx`,
	`pro_idx`
);

ALTER TABLE `problems` ADD CONSTRAINT `PK_PROBLEMS` PRIMARY KEY (
	`pro_idx`,
	`usr_idx`
);

ALTER TABLE `comments` ADD CONSTRAINT `FK_users_TO_comments_1` FOREIGN KEY (
	`usr_idx`
)
REFERENCES `users` (
	`usr_idx`
);

ALTER TABLE `comments` ADD CONSTRAINT `FK_problems_TO_comments_1` FOREIGN KEY (
	`pro_idx`
)
REFERENCES `problems` (
	`pro_idx`
);

ALTER TABLE `problems` ADD CONSTRAINT `FK_users_TO_problems_1` FOREIGN KEY (
	`usr_idx`
)
REFERENCES `users` (
	`usr_idx`
);

