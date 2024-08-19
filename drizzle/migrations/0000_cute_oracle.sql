CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`googleId` text NOT NULL,
	`displayName` text NOT NULL,
	`email` text NOT NULL,
	`jwt` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_googleId_unique` ON `users` (`googleId`);