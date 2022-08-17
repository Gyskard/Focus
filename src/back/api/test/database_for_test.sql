-- Adminer 4.8.1 PostgreSQL 14.3 (Debian 14.3-1.pgdg110+1) dump

DROP TABLE IF EXISTS "Event";
DROP SEQUENCE IF EXISTS "Event_id_seq";
CREATE SEQUENCE "Event_id_seq" START 100;

CREATE TABLE "public"."Event" (
    "id" integer DEFAULT nextval('"Event_id_seq"') NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" character varying(255),
    "localisation" character varying(255) NOT NULL,
    "date" timestamptz NOT NULL,
    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "EventPerson";
CREATE TABLE "public"."EventPerson" (
    "event_id" integer NOT NULL,
    "person_id" integer NOT NULL,
    CONSTRAINT "EventPerson_pkey" PRIMARY KEY ("event_id", "person_id")
) WITH (oids = false);


DROP TABLE IF EXISTS "File";
DROP SEQUENCE IF EXISTS "File_id_seq";
CREATE SEQUENCE "File_id_seq" START 100;

CREATE TABLE "public"."File" (
    "id" integer DEFAULT nextval('"File_id_seq"') NOT NULL,
    "storage_id" character varying(255) NOT NULL,
    "name" character varying(255) NOT NULL,
    "event_id" integer,
    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "Person";
DROP SEQUENCE IF EXISTS "Person_id_seq";
CREATE SEQUENCE "Person_id_seq" START 100;

CREATE TABLE "public"."Person" (
    "id" integer DEFAULT nextval('"Person_id_seq"') NOT NULL,
    "first_name" character varying(255) NOT NULL,
    "last_name" character varying(255) NOT NULL,
    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "Person" ("id", "first_name", "last_name") VALUES
(1,	'John',	'Doe');

INSERT INTO "Person" ("id", "first_name", "last_name") VALUES
(2,	'Isaac', 'Asimov');

DROP TABLE IF EXISTS "Picture";
DROP SEQUENCE IF EXISTS "Picture_id_seq";
CREATE SEQUENCE "Picture_id_seq" START 100;

CREATE TABLE "public"."Picture" (
    "id" integer DEFAULT nextval('"Picture_id_seq"') NOT NULL,
    "storage_id" character varying(255) NOT NULL,
    "event_id" integer,
    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


ALTER TABLE ONLY "public"."EventPerson" ADD CONSTRAINT "EventPerson_event_id_fkey" FOREIGN KEY (event_id) REFERENCES "Event"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."EventPerson" ADD CONSTRAINT "EventPerson_person_id_fkey" FOREIGN KEY (person_id) REFERENCES "Person"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."File" ADD CONSTRAINT "File_event_id_fkey" FOREIGN KEY (event_id) REFERENCES "Event"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."Picture" ADD CONSTRAINT "Picture_event_id_fkey" FOREIGN KEY (event_id) REFERENCES "Event"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

-- 2022-08-16 14:36:14.068457+00
