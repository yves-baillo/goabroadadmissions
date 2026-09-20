const JSONBIN_API = 'https://api.jsonbin.io/v3/b'

// Hardcoded credentials — env vars weren't surviving the Pxxl build.
// This file is client-side anyway; the key is visible in the bundle no matter what.
const JSONBIN_KEY = '$2a$10$Kxyjo9JsKFP5Q5mvoLVrbesySn6z4HJqjwMi4pCMV3w/3QX.vlxay'
const JSONBIN_BIN_ID = '6ab0031dac6210605ae30b40'

export const isJsonBinConfigured = () => Boolean(JSONBIN_KEY && JSONBIN_BIN_ID)

const assertConfigured = () => {
  if (!isJsonBinConfigured()) {
    throw new Error('JSONBin is not configured. Add VITE_JSONBIN_KEY and VITE_JSONBIN_BIN_ID to .env.local.')
  }
}

const request = async (path = '/latest', options = {}) => {
  assertConfigured()

  const response = await fetch(`${JSONBIN_API}/${JSONBIN_BIN_ID}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': JSONBIN_KEY,
      'X-Bin-Meta': 'false',
      ...(options.headers || {})
    }
  })

  if (!response.ok) {
    const message = await response.text()
    if (response.status === 401 || response.status === 403) {
      throw new Error('JSONBin rejected the credentials. Create or copy a valid Master Key and confirm it has access to this Bin ID, then restart the Vite server.')
    }
    throw new Error(`JSONBin request failed (${response.status}): ${message || response.statusText}`)
  }

  return response.json()
}

export const readDatabase = async () => {
  const data = await request('/latest')
  const record = data?.record ?? data

  if (Array.isArray(record)) {
    return { admins: [], scholarships: record, subscribers: [], contacts: [], inquiries: [] }
  }

  return {
    admins: Array.isArray(record?.admins) ? record.admins : [],
    scholarships: Array.isArray(record?.scholarships) ? record.scholarships : [],
    subscribers: Array.isArray(record?.subscribers) ? record.subscribers : [],
    contacts: Array.isArray(record?.contacts) ? record.contacts : [],
    inquiries: Array.isArray(record?.inquiries) ? record.inquiries : []
  }
}

export const writeDatabase = async (database) => {
  return request('', {
    method: 'PUT',
    body: JSON.stringify(database)
  })
}

export const updateDatabase = async (updater) => {
  const database = await readDatabase()
  const updated = await updater(database)
  await writeDatabase(updated)
  return updated
}

export const getJsonBinConfig = () => ({ JSONBIN_KEY, JSONBIN_BIN_ID })