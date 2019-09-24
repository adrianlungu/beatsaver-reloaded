import { join } from 'path'

export const CDN_PATH = join(__dirname, '..', 'cdn')
export const DUMP_PATH = join(CDN_PATH, 'dumps')
export const BEATSAVER_EPOCH = 1525132800

export const FILE_EXT_WHITELIST = [
  '.dat',
  '.json',
  '.egg',
  '.ogg',
  '.png',
  '.jpg',
  '.jpeg',
  '.srt',
]

export const FILE_TYPE_BLACKLIST = [
  'application/gzip',
  'application/vnd.ms-cab-compressed',
  'application/wasm',
  'application/x-7z-compressed',
  'application/x-apple-diskimage',
  'application/x-bzip2',
  'application/x-compress',
  'application/x-deb',
  'application/x-google-chrome-extension',
  'application/x-lzip',
  'application/x-msdownload',
  'application/x-msi',
  'application/x-rar-compressed',
  'application/x-rpm',
  'application/x-shockwave-flash',
  'application/x-sqlite3',
  'application/x-tar',
  'application/x-unix-archive',
  'application/x-xz',
  'application/x.ms.shortcut',
  'application/zip',
  'text/calendar',
]
