DO $$ BEGIN
 -- Create enum type "role" if it doesn't already exist
 CREATE TYPE "role" AS ENUM('team_leader', 'member', 'owner');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "task_type" AS ENUM('todo', 'doing', 'done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Create table users
CREATE TABLE IF NOT EXISTS "users" (
    "id" uuid PRIMARY KEY NOT NULL,
    "username" varchar(64) NOT NULL,
    "email" varchar(320) NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "users_email_unique" UNIQUE ("email")
);

-- Create table projects
CREATE TABLE IF NOT EXISTS "projects" (
    "id" bigserial PRIMARY KEY NOT NULL,
    "title" varchar(50) NOT NULL,
    "description" text NOT NULL,
    "image" text,
    "public" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Create table tasks
CREATE TABLE IF NOT EXISTS "tasks" (
    "id" bigserial PRIMARY KEY NOT NULL,
    "project_id" bigint NOT NULL REFERENCES "projects"("id") ON DELETE CASCADE,
    "description" text NOT NULL,
    "estimated_time" integer NOT NULL,
    "time_left" integer NOT NULL,
    "over_time" integer DEFAULT 0 NOT NULL,
    "type" "task_type" DEFAULT 'todo' NOT NULL,
    "order" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "tasks_order_type_project_id_unique" UNIQUE ("order", "type", "project_id")
);

-- Create table project_users
CREATE TABLE IF NOT EXISTS "project_users" (
    "id" bigserial PRIMARY KEY NOT NULL,
    "project_id" bigint NOT NULL REFERENCES "projects"("id") ON DELETE CASCADE,
    "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "role" "role" NOT NULL,
    CONSTRAINT "project_users_project_id_user_id_unique" UNIQUE ("project_id", "user_id")
);

-- Create table task_users
CREATE TABLE IF NOT EXISTS "task_users" (
    "id" bigserial PRIMARY KEY NOT NULL,
    "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "task_id" bigint NOT NULL REFERENCES "tasks"("id") ON DELETE CASCADE,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "task_users_user_id_task_id_unique" UNIQUE ("user_id", "task_id")
);

-- Create function to handle new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  INSERT INTO public.users (id, email, username)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'username');
  RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();
