const { JSON } = window

/* -------------------------------------------------------------------------- */

export const serialize = JSON.stringify
export const deserialize = JSON.parse

/* -------------------------------------------------------------------------- */

export const isFunction = (o) => typeof o === 'function'
