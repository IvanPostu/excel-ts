export function toHTML(): string {
  return `
  <li class="dashboard__record">
    <a href="#">Table number 1</a>
    <strong>11.11.2011</strong>
  </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.includes('excel')) {
      keys.push(key)
    }
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  if (!keys.length) {
    return `<p>You have not created any tables yet.</p>`
  }

  return `
    <div class="dashboard__list-header">
      <span>Title</span>
      <span>Date of change</span>
    </div>

    <ul class="dashboard__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}
