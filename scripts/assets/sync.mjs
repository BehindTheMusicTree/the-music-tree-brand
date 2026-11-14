import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { downloadPublished, preparePublic, synchronize, verifyHttps, cacheControl } from './public.mjs';

function required(name) { if (!process.env[name]) throw new Error(`Missing configuration: ${name}`); return process.env[name]; }
const version = process.argv[2];
const bucket = required('BRAND_ASSETS_BUCKET');
const publicUrl = required('BRAND_ASSETS_PUBLIC_URL');
if (bucket !== 'btmt-brand-assets' || publicUrl !== 'https://brand-assets.themusictree.org') throw new Error('Unexpected brand bucket/domain');
const client = new S3Client({ endpoint: `https://${required('CLOUDFLARE_ACCOUNT_ID')}.r2.cloudflarestorage.com`, region: 'auto', credentials: { accessKeyId: required('BRAND_ASSETS_ACCESS_KEY_ID'), secretAccessKey: required('BRAND_ASSETS_SECRET_ACCESS_KEY') } });
const storage = {
  async get(Key) {
    try {
      const result = await client.send(new GetObjectCommand({ Bucket: bucket, Key }));
      return { body: Buffer.from(await result.Body.transformToByteArray()), contentType: result.ContentType, cacheControl: result.CacheControl };
    } catch (error) { if (error.name === 'NoSuchKey') return null; throw error; }
  },
  async putIfAbsent(Key, object) {
    try {
      await client.send(new PutObjectCommand({ Bucket: bucket, Key, Body: object.body, ContentType: object.contentType, CacheControl: cacheControl, Metadata: { sha256: object.sha256 }, IfNoneMatch: '*' }));
      return true;
    } catch (error) { if (error.$metadata?.httpStatusCode === 412) return false; throw error; }
  },
};
const dir = await mkdtemp(path.join(tmpdir(), 'brand-public-'));
try {
  const file = path.join(dir, 'published.tgz');
  const provenance = await downloadPublished(version, file);
  const bundle = await preparePublic(file, version, provenance);
  await synchronize(bundle, storage, object => verifyHttps(publicUrl, object));
  process.stdout.write(`Verified ${bundle.files.length} public assets for ${version}\n`);
} finally { await rm(dir, { recursive: true, force: true }); }
