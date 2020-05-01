export const MimetypesKind = {
  opus: 'video/ogg',
  ogv: 'video/ogg',
  mp4: 'video/mp4',
  mov: 'video/mp4',
  m4v: 'video/mp4',
  mkv: 'video/x-matroska',
  m4a: 'audio/mp4',
  mp3: 'audio/mpeg',
  aac: 'audio/aac',
  oga: 'audio/ogg',
  m3u8: 'application/x-mpegURL',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp'
}

export const getMimetype = function(src = '') {
  const ext = getExtension(src)
  const mimetype = MimetypesKind[ext.toLowerCase()]

  return mimetype || ''
}

export const getExtension = function(src = '') {
  return src.split('.').pop() || ''
}
