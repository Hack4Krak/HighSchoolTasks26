ALTER TABLE "containers" ADD COLUMN "session" text NOT NULL;--> statement-breakpoint
ALTER TABLE "containers" DROP COLUMN "user_ip";