function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
export function adaptPocketBaseUsers(payload) {
  if (!isObject(payload)) throw new TypeError('PocketBase payload must be an object.');
  if (!Array.isArray(payload.items)) throw new TypeError('PocketBase payload.items must be an array.');
  if (!Number.isInteger(payload.totalItems) || payload.totalItems < 0) {
    throw new TypeError('PocketBase payload.totalItems must be a non-negative integer.');
  }

  const users = payload.items.map((record, index) => {
    if (!isObject(record)) throw new TypeError(`PocketBase payload.items[${index}] must be an object.`);
    for (const key of ['id', 'display_name', 'role', 'account_status']) {
      if (typeof record[key] !== 'string' || !record[key].trim()) {
        throw new TypeError(`PocketBase payload.items[${index}].${key} must be a non-empty string.`);
      }
    }
    return {
      id: record.id,
      display_name: record.display_name,
      role: record.role,
      account_status: record.account_status,
      campus: typeof record.campus === 'string' ? record.campus : null,
      department: typeof record.department === 'string' ? record.department : null,
      support_status: typeof record.support_status === 'string' ? record.support_status : null,
    };
  });

  return { users, total: payload.totalItems };
}
