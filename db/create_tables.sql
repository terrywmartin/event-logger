CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" varchar[100] UNIQUE,
  "password" text,
  "active" boolean,
  "create_at" timestamp,
  "updated_at" timestamp
);

DROP TABLE IF EXISTS "projects" CASCADE;

CREATE TABLE "projects" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar[50],
  "description" varchar[250],
  "created_at" timestamp,
  "updated_at" timestamp
);

DROP TABLE IF EXISTS "api_keys" CASCADE;

CREATE TABLE "api_keys" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar[50],
  "prefix" varchar[10],
  "hash" text,
  "user_id" uuid,
  "project_id" uuid,
  "create_at" timestamp
);

DROP TABLE IF EXISTS "users_projects" CASCADE;

CREATE TABLE "users_projects" (
  "user_id" uuid,
  "project_id" uuid,

  PRIMARY KEY ("user_id", "project_id")
);

DROP TABLE IF EXISTS "categories" CASCADE;

CREATE TABLE "categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar[100],
  "user_id" uuid,
  "create_at" timestamp,
  "updated_at" timestamp
);

DROP TABLE IF EXISTS "events" CASCADE;

CREATE TABLE "events" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "project_id" uuid,
  "category" varchar[100],
  "type" varchar[50],
  "data" jsonb,
  "create_at" timestamp
);

DROP TABLE IF EXISTS "event_types" CASCADE;
CREATE TABLE "event_types" (
  "id" uuid PRIMARY KEY,
  "name" varchar[50],
  "user_id" uuid
);

DROP TABLE IF EXISTS "required_keys" CASCADE;

CREATE TABLE "required_keys" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar[25],
  "project_id" uuid,
  "create_at" timestamp
);

CREATE INDEX ON "users" ("id");

CREATE INDEX ON "users" ("email");

CREATE INDEX ON "projects" ("id");

CREATE INDEX ON "projects" ("name");

CREATE INDEX ON "api_keys" ("id");

CREATE INDEX ON "api_keys" ("name");

CREATE INDEX ON "api_keys" ("prefix");

CREATE INDEX ON "categories" ("id");

CREATE INDEX ON "categories" ("name");

CREATE INDEX ON "events" ("id");

CREATE INDEX ON "events" ("category");

CREATE INDEX ON "events" ("type");

CREATE INDEX ON "events" ("create_at");

CREATE INDEX ON "required_keys" ("id");

CREATE INDEX ON "required_keys" ("name");

ALTER TABLE "users_projects" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "users_projects" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "api_keys" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "api_keys" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "categories" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "events" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "required_keys" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "event_types" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
