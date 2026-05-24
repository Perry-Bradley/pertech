import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Services } from "./collections/Services";
import { Projects } from "./collections/Projects";
import { SiteSettings } from "./globals/SiteSettings";
import { Pages } from "./globals/Pages";
import { HomePage } from "./globals/HomePage";
import { AboutPage } from "./globals/AboutPage";
import { ContactPage } from "./globals/ContactPage";
import { ServicesIndexPage } from "./globals/ServicesIndexPage";
import { PortfolioIndexPage } from "./globals/PortfolioIndexPage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUri = process.env.DATABASE_URI || "file:./pertech.db";
const isPostgres =
  databaseUri.startsWith("postgres://") || databaseUri.startsWith("postgresql://");

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
const useBlobStorage = !!blobToken;

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Pertech Admin",
    },
  },
  collections: [Users, Media, Services, Projects],
  globals: [
    SiteSettings,
    Pages,
    HomePage,
    AboutPage,
    ContactPage,
    ServicesIndexPage,
    PortfolioIndexPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // Auto-pick adapter:
  //  - postgres:// URI  → Postgres (production / Vercel)
  //  - file: URI        → SQLite (local dev)
  db: isPostgres
    ? postgresAdapter({
        pool: { connectionString: databaseUri },
        push: true,
      })
    : sqliteAdapter({
        client: { url: databaseUri },
        push: true,
      }),
  sharp,
  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB
    },
  },
  // Auto-pick storage:
  //  - BLOB_READ_WRITE_TOKEN set → Vercel Blob (production)
  //  - unset                     → local disk under ./media (dev)
  plugins: useBlobStorage
    ? [
        vercelBlobStorage({
          collections: { media: true },
          token: blobToken!,
        }),
      ]
    : [],
});
