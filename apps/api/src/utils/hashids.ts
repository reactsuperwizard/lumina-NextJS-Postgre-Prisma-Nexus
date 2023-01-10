import Hashids from 'hashids'

// changing the hashid settings will have repercussions for decoding/encoding all
// currently shared urls - do with caution!
const hashids = new Hashids(process.env.SALT, 4, 'abcdefghijklmnopqrstuvwxyz')

export { hashids }
