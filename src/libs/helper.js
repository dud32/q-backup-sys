// import Moment from 'moment'
// import { extendMoment } from 'moment-range'

// const moment = extendMoment(Moment)

var time = {
  hc: function (h) {
    return (h === 0 || h === 24) ? '12:00am' : (h === 12) ? '12:00pm' : (h % 12) + ':00' + (h > 12 ? 'pm' : 'am')
  }
}

// Local storage

var ls = {
  get: (key, type) => {
    var item = window.localStorage.getItem(key)

    if (type === 'Object') item = JSON.parse(item)

    return item
  },
  set: (key, val, type) => {
    if (type === 'Object') val = JSON.stringify(val)

    window.localStorage.setItem(key, val)
  },
  remove: (key) => {
    window.localStorage.removeItem(key)
  },
  empty: (key) => {
    return window.localStorage.getItem(key) === null
  }
}

// Api

const api = {}
api.keys = {
  sh: {
    get () {
      return ls.get('Api-keys-sh')
    },
    set (key) {
      ls.set('Api-keys-sh', key)
    }
  } // Internal
}

// Auth

var auth = {
  user: {
    get () {
      return ls.get('Auth-login-user', 'Object')
    },
    loggedIn () {
      return ls.get('Auth-login-user', 'Object') !== null
    }
  }
}

// Oauth

const oauth = {}

oauth.ls = {}
oauth.ls.key = 'OAuth-login-user'

oauth.ls.get = () => {
  return ls.get(oauth.ls.key, 'Object')
}
oauth.ls.set = (user) => {
  ls.set(oauth.ls.key, user, 'Object')
}
oauth.ls.check = () => {
  return oauth.ls.get() !== null
}

// Spot

const business = {}

business.ls = {}
business.ls.key = 'Sh-business'

business.ls.get = () => {
  return ls.get(business.ls.key, 'Object')
}
business.ls.set = (item) => {
  ls.set(business.ls.key, item, 'Object')
}

// Date
/*
var date = {
  df: (date) => {
    return moment(date).format('MMMM Do YYYY')
  },
  dft: (date) => {
    return moment(date).format('MMM do YYYY hh:mm')
  },
  addDays: (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }
}
*/

// Arr

const arr = {
  swap (arr, i, j) {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp

    return arr
  }
}

arr.shuffle = (a) => {
  let i = a.length

  while (i > 0) {
    arr.swap(a,
      Math.floor(Math.random() * i),
      Math.floor(Math.random() * i)
    )
    i--
  }

  return a
}

// Object

var obj = {
  clone: (o) => {
    return JSON.parse(JSON.stringify(o))
  },
  merge (o, o1) {
    for (const i in o1) if (o[i] !== undefined) o1[i] = o[i]
    return o1
  }
}

// notify

const notify = {
  s: (that, message) => {
    message = message === undefined ? 'Success' : message

    that.$q.notify({
      group: false,
      position: 'top',
      color: 'info',
      message
    })
  },
  e: (that, message) => {
    message = message === undefined ? 'Request failed' : message

    that.$q.notify({
      group: false,
      position: 'top',
      color: 'red',
      message
    })
  }
}

const misc = {
  randstr: (length) => {
    if (length === undefined) length = 5

    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let text = ''

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
  },
  pasteCapture (that, evt, id) {
    let text, onPasteStripFormattingIEPaste
    evt.preventDefault()

    var ref = that.$refs['editor_ref' + id]

    if (ref.length > 0) ref = ref[0]

    if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
      text = evt.originalEvent.clipboardData.getData('text/plain')
      ref.runCmd('insertText', text)
    } else if (evt.clipboardData && evt.clipboardData.getData) {
      text = evt.clipboardData.getData('text/plain')
      ref.runCmd('insertText', text)
    } else if (window.clipboardData && window.clipboardData.getData) {
      if (!onPasteStripFormattingIEPaste) {
        onPasteStripFormattingIEPaste = true
        ref.runCmd('ms-pasteTextOnly', text)
      }
      onPasteStripFormattingIEPaste = false
    }
  }
}

export default {
  time,
  ls,
  api,
  auth,
  oauth,
  business,
  // date,
  arr,
  obj,
  notify,
  misc
}
