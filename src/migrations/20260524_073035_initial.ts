import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_icon" AS ENUM('Palette', 'Search', 'Globe', 'Layers', 'Smartphone', 'Share2', 'PenTool', 'Code', 'Megaphone', 'Sparkles');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_feature_url" varchar,
  	"sizes_feature_width" numeric,
  	"sizes_feature_height" numeric,
  	"sizes_feature_mime_type" varchar,
  	"sizes_feature_filesize" numeric,
  	"sizes_feature_filename" varchar
  );
  
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "services_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "services_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "services_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "services_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tier" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"for" varchar NOT NULL
  );
  
  CREATE TABLE "services_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"icon" "enum_services_icon" DEFAULT 'Layers' NOT NULL,
  	"short" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_keywords" varchar,
  	"seo_og_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "projects_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"client" varchar NOT NULL,
  	"year" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"challenge" varchar NOT NULL,
  	"approach" varchar NOT NULL,
  	"outcome" varchar NOT NULL,
  	"link_label" varchar,
  	"link_url" varchar,
  	"cover_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_keywords" varchar,
  	"seo_og_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"services_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Pertech' NOT NULL,
  	"tagline" varchar DEFAULT 'Digital Studio for Ambitious Brands' NOT NULL,
  	"contact_email" varchar DEFAULT 'hello@pertech.studio' NOT NULL,
  	"availability" varchar DEFAULT 'Available · Q3 2026',
  	"default_title" varchar DEFAULT 'Pertech — Digital Studio for Ambitious Brands' NOT NULL,
  	"title_template" varchar DEFAULT '%s | Pertech',
  	"default_description" varchar DEFAULT 'Pertech is a design & engineering studio crafting premium websites, web apps, mobile apps, brand identities, and growth-led SEO.' NOT NULL,
  	"default_keywords" varchar DEFAULT 'web design agency, web development, mobile app, SEO, UI UX design',
  	"default_og_image_id" integer,
  	"site_url" varchar DEFAULT 'https://pertech.studio' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"home_title" varchar,
  	"home_description" varchar,
  	"home_keywords" varchar,
  	"home_og_image_id" integer,
  	"home_noindex" boolean DEFAULT false,
  	"services_title" varchar,
  	"services_description" varchar,
  	"services_keywords" varchar,
  	"services_og_image_id" integer,
  	"services_noindex" boolean DEFAULT false,
  	"portfolio_title" varchar,
  	"portfolio_description" varchar,
  	"portfolio_keywords" varchar,
  	"portfolio_og_image_id" integer,
  	"portfolio_noindex" boolean DEFAULT false,
  	"about_title" varchar,
  	"about_description" varchar,
  	"about_keywords" varchar,
  	"about_og_image_id" integer,
  	"about_noindex" boolean DEFAULT false,
  	"contact_title" varchar,
  	"contact_description" varchar,
  	"contact_keywords" varchar,
  	"contact_og_image_id" integer,
  	"contact_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_hero_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"italic" boolean DEFAULT false
  );
  
  CREATE TABLE "home_page_marquee_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge" varchar DEFAULT 'Available · Q3 2026',
  	"hero_meta" varchar DEFAULT 'Studio of 8 · Remote-first',
  	"hero_description" varchar DEFAULT 'Pertech is a design and engineering studio for brands that refuse to look generic. We build websites, products, mobile apps, and growth systems the way they should have been built the first time.' NOT NULL,
  	"hero_primary_c_t_a_label" varchar NOT NULL,
  	"hero_primary_c_t_a_href" varchar NOT NULL,
  	"hero_secondary_c_t_a_label" varchar NOT NULL,
  	"hero_secondary_c_t_a_href" varchar NOT NULL,
  	"marquee_eyebrow" varchar DEFAULT 'Trusted by founders, operators, and creative directors',
  	"services_eyebrow" varchar DEFAULT 'Services',
  	"services_title_line_one" varchar DEFAULT 'Six disciplines.',
  	"services_title_line_two" varchar DEFAULT 'One studio.',
  	"services_description" varchar DEFAULT 'We don''t subcontract the work that matters. Every service is owned by senior practitioners who''ve shipped at scale.',
  	"portfolio_eyebrow" varchar DEFAULT 'Selected work',
  	"portfolio_title_line_one" varchar DEFAULT 'Recent case studies',
  	"portfolio_title_line_two" varchar DEFAULT 'from the studio.',
  	"about_eyebrow" varchar DEFAULT 'About the studio',
  	"about_body" varchar DEFAULT 'We''re eight humans who''ve spent the last decade quietly shipping products you''ve probably used. We started Pertech because the work we wanted to make didn''t exist at the agencies we''d worked at.',
  	"process_eyebrow" varchar DEFAULT 'How we work',
  	"process_title_line_one" varchar DEFAULT 'A studio process,',
  	"process_title_line_two" varchar DEFAULT 'not an agency one.',
  	"process_description" varchar DEFAULT 'We collaborate the way the best in-house teams do — with high context, weekly working sessions, and shared definitions of done.',
  	"testimonials_eyebrow" varchar DEFAULT 'What clients say',
  	"testimonials_title_line_one" varchar DEFAULT 'Words from',
  	"testimonials_title_line_two" varchar DEFAULT 'the people we shipped with.',
  	"cta_badge" varchar DEFAULT 'Now booking · Q3 2026',
  	"cta_title_line_one" varchar DEFAULT 'Let''s build',
  	"cta_title_line_two" varchar DEFAULT 'something rare.',
  	"cta_description" varchar DEFAULT 'We take on a handful of new partnerships each quarter. If you''re building something ambitious, we''d love to hear about it.',
  	"cta_primary_label" varchar NOT NULL,
  	"cta_primary_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Studio',
  	"title" varchar DEFAULT 'A small studio with senior taste.' NOT NULL,
  	"description" varchar DEFAULT 'Eight humans, twelve time zones over the last decade, and a shared belief that craft is not optional.',
  	"intro" varchar DEFAULT 'We started Pertech in 2021 because the work we wanted to make didn''t exist at the agencies we''d worked at. Today we''re a small remote-first studio partnering with founders and product leaders to ship rare, durable, opinionated work.',
  	"principles_eyebrow" varchar DEFAULT 'Principles',
  	"principles_title" varchar DEFAULT 'What we believe.',
  	"team_eyebrow" varchar DEFAULT 'The team',
  	"team_title" varchar DEFAULT 'Eight people doing the work.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_budgets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Contact',
  	"title" varchar DEFAULT 'Let''s talk.' NOT NULL,
  	"description" varchar DEFAULT 'A real human reads every inquiry. Tell us about your project — we''ll come back within one business day.',
  	"new_business_email" varchar DEFAULT 'new@pertech.studio',
  	"studio_blurb" varchar DEFAULT 'Remote-first.
  Hubs in Lisbon, New York, Singapore.',
  	"press_email" varchar DEFAULT 'press@pertech.studio',
  	"submit_label" varchar DEFAULT 'Send inquiry',
  	"footer_note" varchar DEFAULT 'We reply within one business day.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_index_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Services',
  	"title" varchar DEFAULT 'Six disciplines. One studio.' NOT NULL,
  	"description" varchar DEFAULT 'We''re senior practitioners in design, engineering, and growth. Every engagement is led end-to-end by people who''ve shipped at scale.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "portfolio_index_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Work',
  	"title" varchar DEFAULT 'Selected case studies.' NOT NULL,
  	"description" varchar DEFAULT 'A handful of recent engagements we''re proud to put our name on. More available on request — some work lives behind NDAs.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_process" ADD CONSTRAINT "services_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_deliverables" ADD CONSTRAINT "services_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_tools" ADD CONSTRAINT "services_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_pricing" ADD CONSTRAINT "services_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_faqs" ADD CONSTRAINT "services_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_services" ADD CONSTRAINT "projects_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_metrics" ADD CONSTRAINT "projects_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_home_og_image_id_media_id_fk" FOREIGN KEY ("home_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_services_og_image_id_media_id_fk" FOREIGN KEY ("services_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_portfolio_og_image_id_media_id_fk" FOREIGN KEY ("portfolio_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_about_og_image_id_media_id_fk" FOREIGN KEY ("about_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_contact_og_image_id_media_id_fk" FOREIGN KEY ("contact_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_words" ADD CONSTRAINT "home_page_hero_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_marquee_clients" ADD CONSTRAINT "home_page_marquee_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_process_steps" ADD CONSTRAINT "home_page_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_stats" ADD CONSTRAINT "home_page_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_testimonials" ADD CONSTRAINT "home_page_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_principles" ADD CONSTRAINT "about_page_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_team" ADD CONSTRAINT "about_page_team_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_team" ADD CONSTRAINT "about_page_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_services" ADD CONSTRAINT "contact_page_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_budgets" ADD CONSTRAINT "contact_page_budgets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_feature_sizes_feature_filename_idx" ON "media" USING btree ("sizes_feature_filename");
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services_process_order_idx" ON "services_process" USING btree ("_order");
  CREATE INDEX "services_process_parent_id_idx" ON "services_process" USING btree ("_parent_id");
  CREATE INDEX "services_deliverables_order_idx" ON "services_deliverables" USING btree ("_order");
  CREATE INDEX "services_deliverables_parent_id_idx" ON "services_deliverables" USING btree ("_parent_id");
  CREATE INDEX "services_tools_order_idx" ON "services_tools" USING btree ("_order");
  CREATE INDEX "services_tools_parent_id_idx" ON "services_tools" USING btree ("_parent_id");
  CREATE INDEX "services_pricing_order_idx" ON "services_pricing" USING btree ("_order");
  CREATE INDEX "services_pricing_parent_id_idx" ON "services_pricing" USING btree ("_parent_id");
  CREATE INDEX "services_faqs_order_idx" ON "services_faqs" USING btree ("_order");
  CREATE INDEX "services_faqs_parent_id_idx" ON "services_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_seo_seo_og_image_idx" ON "services" USING btree ("seo_og_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "projects_services_order_idx" ON "projects_services" USING btree ("_order");
  CREATE INDEX "projects_services_parent_id_idx" ON "projects_services" USING btree ("_parent_id");
  CREATE INDEX "projects_metrics_order_idx" ON "projects_metrics" USING btree ("_order");
  CREATE INDEX "projects_metrics_parent_id_idx" ON "projects_metrics" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_cover_idx" ON "projects" USING btree ("cover_id");
  CREATE INDEX "projects_seo_seo_og_image_idx" ON "projects" USING btree ("seo_og_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE INDEX "pages_home_home_og_image_idx" ON "pages" USING btree ("home_og_image_id");
  CREATE INDEX "pages_services_services_og_image_idx" ON "pages" USING btree ("services_og_image_id");
  CREATE INDEX "pages_portfolio_portfolio_og_image_idx" ON "pages" USING btree ("portfolio_og_image_id");
  CREATE INDEX "pages_about_about_og_image_idx" ON "pages" USING btree ("about_og_image_id");
  CREATE INDEX "pages_contact_contact_og_image_idx" ON "pages" USING btree ("contact_og_image_id");
  CREATE INDEX "home_page_hero_words_order_idx" ON "home_page_hero_words" USING btree ("_order");
  CREATE INDEX "home_page_hero_words_parent_id_idx" ON "home_page_hero_words" USING btree ("_parent_id");
  CREATE INDEX "home_page_marquee_clients_order_idx" ON "home_page_marquee_clients" USING btree ("_order");
  CREATE INDEX "home_page_marquee_clients_parent_id_idx" ON "home_page_marquee_clients" USING btree ("_parent_id");
  CREATE INDEX "home_page_process_steps_order_idx" ON "home_page_process_steps" USING btree ("_order");
  CREATE INDEX "home_page_process_steps_parent_id_idx" ON "home_page_process_steps" USING btree ("_parent_id");
  CREATE INDEX "home_page_stats_order_idx" ON "home_page_stats" USING btree ("_order");
  CREATE INDEX "home_page_stats_parent_id_idx" ON "home_page_stats" USING btree ("_parent_id");
  CREATE INDEX "home_page_testimonials_order_idx" ON "home_page_testimonials" USING btree ("_order");
  CREATE INDEX "home_page_testimonials_parent_id_idx" ON "home_page_testimonials" USING btree ("_parent_id");
  CREATE INDEX "about_page_principles_order_idx" ON "about_page_principles" USING btree ("_order");
  CREATE INDEX "about_page_principles_parent_id_idx" ON "about_page_principles" USING btree ("_parent_id");
  CREATE INDEX "about_page_team_order_idx" ON "about_page_team" USING btree ("_order");
  CREATE INDEX "about_page_team_parent_id_idx" ON "about_page_team" USING btree ("_parent_id");
  CREATE INDEX "about_page_team_photo_idx" ON "about_page_team" USING btree ("photo_id");
  CREATE INDEX "contact_page_services_order_idx" ON "contact_page_services" USING btree ("_order");
  CREATE INDEX "contact_page_services_parent_id_idx" ON "contact_page_services" USING btree ("_parent_id");
  CREATE INDEX "contact_page_budgets_order_idx" ON "contact_page_budgets" USING btree ("_order");
  CREATE INDEX "contact_page_budgets_parent_id_idx" ON "contact_page_budgets" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services_process" CASCADE;
  DROP TABLE "services_deliverables" CASCADE;
  DROP TABLE "services_tools" CASCADE;
  DROP TABLE "services_pricing" CASCADE;
  DROP TABLE "services_faqs" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "projects_services" CASCADE;
  DROP TABLE "projects_metrics" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "home_page_hero_words" CASCADE;
  DROP TABLE "home_page_marquee_clients" CASCADE;
  DROP TABLE "home_page_process_steps" CASCADE;
  DROP TABLE "home_page_stats" CASCADE;
  DROP TABLE "home_page_testimonials" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "about_page_principles" CASCADE;
  DROP TABLE "about_page_team" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "contact_page_services" CASCADE;
  DROP TABLE "contact_page_budgets" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "services_index_page" CASCADE;
  DROP TABLE "portfolio_index_page" CASCADE;
  DROP TYPE "public"."enum_services_icon";`)
}
