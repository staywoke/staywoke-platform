const REGEX_DATA = 'xregexp'

const features = {
  astral: false,
  namespacing: false
}

const nativ = {
  exec: RegExp.prototype.exec,
  test: RegExp.prototype.test,
  match: String.prototype.match,
  replace: String.prototype.replace,
  split: String.prototype.split
}

const fixed = {}

let regexCache = {}
let patternCache = {}

const tokens = []
const defaultScope = 'default'
const classScope = 'class'
const nativeTokens = {
  'default': /\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|\(\?(?:[:=!]|<[=!])|[?*+]\?|{\d+(?:,\d*)?}\??|[\s\S]/,
  'class': /\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|[\s\S]/
}
const replacementToken = /\$(?:{([\w$]+)}|<([\w$]+)>|(\d\d?|[\s\S]))/g
const correctExecNpcg = nativ.exec.call(/()??/, '')[1] === undefined
const hasFlagsProp = /x/.flags !== undefined
const {
  toString
} = {}

function hasNativeFlag (flag) {
  let isSupported = true
  try {
    // eslint-disable-next-line
    new RegExp('', flag)
  } catch (exception) {
    isSupported = false
  }
  return isSupported
}
const hasNativeU = hasNativeFlag('u')
const hasNativeY = hasNativeFlag('y')
const registeredFlags = {
  g: true,
  i: true,
  m: true,
  u: hasNativeU,
  y: hasNativeY
}

function augment (regex, captureNames, xSource, xFlags, isInternalOnly) {
  regex[REGEX_DATA] = {
    captureNames
  }

  if (isInternalOnly) {
    return regex
  }

  // eslint-disable-next-line
  if (regex.__proto__) {
    // eslint-disable-next-line
    regex.__proto__ = XRegExp.prototype
  } else {
    for (const p in XRegExp.prototype) {
      regex[p] = XRegExp.prototype[p]
    }
  }

  regex[REGEX_DATA].source = xSource
  regex[REGEX_DATA].flags = xFlags ? xFlags.split('').sort().join('') : xFlags

  return regex
}

function clipDuplicates (str) {
  return nativ.replace.call(str, /([\s\S])(?=[\s\S]*\1)/g, '')
}

function copyRegex (regex, options) {
  if (!XRegExp.isRegExp(regex)) {
    throw new TypeError('Type RegExp expected')
  }

  const xData = regex[REGEX_DATA] || {}
  let flags = getNativeFlags(regex)
  let flagsToAdd = ''
  let flagsToRemove = ''
  let xregexpSource = null
  let xregexpFlags = null

  options = options || {}

  if (options.removeG) {
    flagsToRemove += 'g'
  }
  if (options.removeY) {
    flagsToRemove += 'y'
  }
  if (flagsToRemove) {
    flags = nativ.replace.call(flags, new RegExp(`[${flagsToRemove}]+`, 'g'), '')
  }

  if (options.addG) {
    flagsToAdd += 'g'
  }
  if (options.addY) {
    flagsToAdd += 'y'
  }
  if (flagsToAdd) {
    flags = clipDuplicates(flags + flagsToAdd)
  }

  if (!options.isInternalOnly) {
    if (xData.source !== undefined) {
      xregexpSource = xData.source
    }

    if (xData.flags != null) {
      xregexpFlags = flagsToAdd ? clipDuplicates(xData.flags + flagsToAdd) : xData.flags
    }
  }

  regex = augment(
    new RegExp(options.source || regex.source, flags),
    hasNamedCapture(regex) ? xData.captureNames.slice(0) : null,
    xregexpSource,
    xregexpFlags,
    options.isInternalOnly
  )

  return regex
}

function dec (hex) {
  return parseInt(hex, 16)
}

function getContextualTokenSeparator (match, scope, flags) {
  if (
    match.input[match.index - 1] === '(' ||
    match.input[match.index + match[0].length] === ')' ||
    match.input[match.index - 1] === '|' ||
    match.input[match.index + match[0].length] === '|' ||

    match.index < 1 ||
    match.index + match[0].length >= match.input.length ||

    nativ.test.call(/^\(\?[:=!]/, match.input.substr(match.index - 3, 3)) ||

    isQuantifierNext(match.input, match.index + match[0].length, flags)
  ) {
    return ''
  }

  return '(?:)'
}

function getNativeFlags (regex) {
  return hasFlagsProp
    ? regex.flags
    : nativ.exec.call(/\/([a-z]*)$/i, RegExp.prototype.toString.call(regex))[1]
}

function hasNamedCapture (regex) {
  return !!(regex[REGEX_DATA] && regex[REGEX_DATA].captureNames)
}

function hex (dec) {
  return parseInt(dec, 10).toString(16)
}

function isQuantifierNext (pattern, pos, flags) {
  const inlineCommentPattern = '\\(\\?#[^)]*\\)'
  const lineCommentPattern = '#[^#\\n]*'
  const quantifierPattern = '[?*+]|{\\d+(?:,\\d*)?}'
  return nativ.test.call(
    flags.includes('x')
      ? new RegExp(`^(?:\\s|${lineCommentPattern}|${inlineCommentPattern})*(?:${quantifierPattern})`)
      : new RegExp(`^(?:${inlineCommentPattern})*(?:${quantifierPattern})`),
    pattern.slice(pos)
  )
}

function isType (value, type) {
  return toString.call(value) === `[object ${type}]`
}

function pad4 (str) {
  while (str.length < 4) {
    str = `0${str}`
  }
  return str
}

function prepareFlags (pattern, flags) {
  if (clipDuplicates(flags) !== flags) {
    throw new SyntaxError(`Invalid duplicate regex flag ${flags}`)
  }

  pattern = nativ.replace.call(pattern, /^\(\?([\w$]+)\)/, ($0, $1) => {
    if (nativ.test.call(/[gy]/, $1)) {
      throw new SyntaxError(`Cannot use flag g or y in mode modifier ${$0}`)
    }
    flags = clipDuplicates(flags + $1)
    return ''
  })

  for (const flag of flags) {
    if (!registeredFlags[flag]) {
      throw new SyntaxError(`Unknown regex flag ${flag}`)
    }
  }

  return {
    pattern,
    flags
  }
}

function prepareOptions (value) {
  const options = {}

  if (isType(value, 'String')) {
    XRegExp.forEach(value, /[^\s,]+/, (match) => {
      options[match] = true
    })

    return options
  }

  return value
}

function registerFlag (flag) {
  if (!/^[\w$]$/.test(flag)) {
    throw new Error('Flag must be a single character A-Za-z0-9_$')
  }

  registeredFlags[flag] = true
}

function runTokens (pattern, flags, pos, scope, context) {
  let i = tokens.length
  const leadChar = pattern[pos]
  let result = null
  let match
  let t

  while (i--) {
    t = tokens[i]
    if (
      (t.leadChar && t.leadChar !== leadChar) ||
      (t.scope !== scope && t.scope !== 'all') ||
      (t.flag && !flags.includes(t.flag))
    ) {
      continue
    }

    match = XRegExp.exec(pattern, t.regex, pos, 'sticky')
    if (match) {
      result = {
        matchLength: match[0].length,
        output: t.handler.call(context, match, scope, flags),
        reparse: t.reparse
      }
      break
    }
  }

  return result
}

function setAstral (on) {
  features.astral = on
}

function setNamespacing (on) {
  features.namespacing = on
}

function toObject (value) {
  if (value == null) {
    throw new TypeError('Cannot convert null or undefined to object')
  }

  return value
}

function XRegExp (pattern, flags) {
  if (XRegExp.isRegExp(pattern)) {
    if (flags !== undefined) {
      throw new TypeError('Cannot supply flags when copying a RegExp')
    }
    return copyRegex(pattern)
  }

  pattern = pattern === undefined ? '' : String(pattern)
  flags = flags === undefined ? '' : String(flags)

  if (XRegExp.isInstalled('astral') && !flags.includes('A')) {
    flags += 'A'
  }

  if (!patternCache[pattern]) {
    patternCache[pattern] = {}
  }

  if (!patternCache[pattern][flags]) {
    const context = {
      hasNamedCapture: false,
      captureNames: []
    }
    let scope = defaultScope
    let output = ''
    let pos = 0
    let result

    const applied = prepareFlags(pattern, flags)
    let appliedPattern = applied.pattern
    const appliedFlags = applied.flags

    while (pos < appliedPattern.length) {
      do {
        result = runTokens(appliedPattern, appliedFlags, pos, scope, context)
        if (result && result.reparse) {
          appliedPattern = appliedPattern.slice(0, pos) +
            result.output +
            appliedPattern.slice(pos + result.matchLength)
        }
      } while (result && result.reparse)

      if (result) {
        output += result.output
        pos += (result.matchLength || 1)
      } else {
        const [token] = XRegExp.exec(appliedPattern, nativeTokens[scope], pos, 'sticky')
        output += token
        pos += token.length
        if (token === '[' && scope === defaultScope) {
          scope = classScope
        } else if (token === ']' && scope === classScope) {
          scope = defaultScope
        }
      }
    }

    patternCache[pattern][flags] = {
      pattern: nativ.replace.call(output, /(?:\(\?:\))+/g, '(?:)'),
      flags: nativ.replace.call(appliedFlags, /[^gimuy]+/g, ''),
      captures: context.hasNamedCapture ? context.captureNames : null
    }
  }

  const generated = patternCache[pattern][flags]
  return augment(
    new RegExp(generated.pattern, generated.flags),
    generated.captures,
    pattern,
    flags
  )
}

XRegExp.prototype = new RegExp()
XRegExp.version = '4.2.4'
XRegExp._clipDuplicates = clipDuplicates
XRegExp._hasNativeFlag = hasNativeFlag
XRegExp._dec = dec
XRegExp._hex = hex
XRegExp._pad4 = pad4

XRegExp.addToken = (regex, handler, options) => {
  options = options || {}
  let {
    optionalFlags
  } = options

  if (options.flag) {
    registerFlag(options.flag)
  }

  if (optionalFlags) {
    optionalFlags = nativ.split.call(optionalFlags, '')
    for (const flag of optionalFlags) {
      registerFlag(flag)
    }
  }

  tokens.push({
    regex: copyRegex(regex, {
      addG: true,
      addY: hasNativeY,
      isInternalOnly: true
    }),
    handler,
    scope: options.scope || defaultScope,
    flag: options.flag,
    reparse: options.reparse,
    leadChar: options.leadChar
  })

  XRegExp.cache.flush('patterns')
}

XRegExp.cache = (pattern, flags) => {
  if (!regexCache[pattern]) {
    regexCache[pattern] = {}
  }
  return regexCache[pattern][flags] || (
    regexCache[pattern][flags] = XRegExp(pattern, flags)
  )
}

XRegExp.cache.flush = (cacheName) => {
  if (cacheName === 'patterns') {
    patternCache = {}
  } else {
    regexCache = {}
  }
}

// eslint-disable-next-line
XRegExp.escape = (str) => nativ.replace.call(toObject(str), /[-\[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

XRegExp.exec = (str, regex, pos, sticky) => {
  let cacheKey = 'g'
  let addY = false
  let fakeY = false
  let match

  addY = hasNativeY && !!(sticky || (regex.sticky && sticky !== false))
  if (addY) {
    cacheKey += 'y'
  } else if (sticky) {
    fakeY = true
    cacheKey += 'FakeY'
  }

  regex[REGEX_DATA] = regex[REGEX_DATA] || {}

  const r2 = regex[REGEX_DATA][cacheKey] || (
    regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
      addG: true,
      addY,
      source: fakeY ? `${regex.source}|()` : undefined,
      removeY: sticky === false,
      isInternalOnly: true
    })
  )

  pos = pos || 0
  r2.lastIndex = pos

  match = fixed.exec.call(r2, str)

  if (fakeY && match && match.pop() === '') {
    match = null
  }

  if (regex.global) {
    regex.lastIndex = match ? r2.lastIndex : 0
  }

  return match
}

XRegExp.forEach = (str, regex, callback) => {
  let pos = 0
  let i = -1
  let match

  while ((match = XRegExp.exec(str, regex, pos))) {
    callback(match, ++i, str, regex)

    pos = match.index + (match[0].length || 1)
  }
}

XRegExp.globalize = (regex) => copyRegex(regex, {
  addG: true
})

XRegExp.install = (options) => {
  options = prepareOptions(options)

  if (!features.astral && options.astral) {
    setAstral(true)
  }

  if (!features.namespacing && options.namespacing) {
    setNamespacing(true)
  }
}

XRegExp.isInstalled = (feature) => !!(features[feature])

XRegExp.isRegExp = (value) => toString.call(value) === '[object RegExp]' // isType(value, 'RegExp');

XRegExp.match = (str, regex, scope) => {
  const global = (regex.global && scope !== 'one') || scope === 'all'
  const cacheKey = ((global ? 'g' : '') + (regex.sticky ? 'y' : '')) || 'noGY'

  regex[REGEX_DATA] = regex[REGEX_DATA] || {}

  const r2 = regex[REGEX_DATA][cacheKey] || (
    regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
      addG: !!global,
      removeG: scope === 'one',
      isInternalOnly: true
    })
  )

  const result = nativ.match.call(toObject(str), r2)

  if (regex.global) {
    regex.lastIndex = (
      (scope === 'one' && result)
        ? (result.index + result[0].length) : 0
    )
  }

  return global ? (result || []) : (result && result[0])
}

XRegExp.matchChain = (str, chain) => (function recurseChain (values, level) {
  const item = chain[level].regex ? chain[level] : {
    regex: chain[level]
  }
  const matches = []

  function addMatch (match) {
    if (item.backref) {
      const ERR_UNDEFINED_GROUP = `Backreference to undefined group: ${item.backref}`
      const isNamedBackref = isNaN(item.backref)

      if (isNamedBackref && XRegExp.isInstalled('namespacing')) {
        if (!(item.backref in match.groups)) {
          throw new ReferenceError(ERR_UNDEFINED_GROUP)
        }
      } else if (!match.hasOwnProperty(item.backref)) {
        throw new ReferenceError(ERR_UNDEFINED_GROUP)
      }

      const backrefValue = isNamedBackref && XRegExp.isInstalled('namespacing')
        ? match.groups[item.backref]
        : match[item.backref]

      matches.push(backrefValue || '')
    } else {
      matches.push(match[0])
    }
  }

  for (const value of values) {
    XRegExp.forEach(value, item.regex, addMatch)
  }

  return ((level === chain.length - 1) || !matches.length)
    ? matches
    : recurseChain(matches, level + 1)
}([str], 0))

XRegExp.replace = (str, search, replacement, scope) => {
  const isRegex = XRegExp.isRegExp(search)
  const global = (search.global && scope !== 'one') || scope === 'all'
  const cacheKey = ((global ? 'g' : '') + (search.sticky ? 'y' : '')) || 'noGY'
  let s2 = search

  if (isRegex) {
    search[REGEX_DATA] = search[REGEX_DATA] || {}

    s2 = search[REGEX_DATA][cacheKey] || (
      search[REGEX_DATA][cacheKey] = copyRegex(search, {
        addG: !!global,
        removeG: scope === 'one',
        isInternalOnly: true
      })
    )
  } else if (global) {
    s2 = new RegExp(XRegExp.escape(String(search)), 'g')
  }

  const result = fixed.replace.call(toObject(str), s2, replacement)

  if (isRegex && search.global) {
    search.lastIndex = 0
  }

  return result
}

XRegExp.replaceEach = (str, replacements) => {
  for (const r of replacements) {
    str = XRegExp.replace(str, r[0], r[1], r[2])
  }

  return str
}

XRegExp.split = (str, separator, limit) => fixed.split.call(toObject(str), separator, limit)

XRegExp.test = (str, regex, pos, sticky) => !!XRegExp.exec(str, regex, pos, sticky)

XRegExp.uninstall = (options) => {
  options = prepareOptions(options)

  if (features.astral && options.astral) {
    setAstral(false)
  }

  if (features.namespacing && options.namespacing) {
    setNamespacing(false)
  }
}

XRegExp.union = (patterns, flags, options) => {
  options = options || {}
  const conjunction = options.conjunction || 'or'
  let numCaptures = 0
  let numPriorCaptures
  let captureNames

  function rewrite (match, paren, backref) {
    const name = captureNames[numCaptures - numPriorCaptures]

    if (paren) {
      ++numCaptures
      if (name) {
        return `(?<${name}>`
      }
    } else if (backref) {
      return `\\${+backref + numPriorCaptures}`
    }

    return match
  }

  if (!(isType(patterns, 'Array') && patterns.length)) {
    throw new TypeError('Must provide a nonempty array of patterns to merge')
  }

  const parts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*\]/g
  const output = []
  for (const pattern of patterns) {
    if (XRegExp.isRegExp(pattern)) {
      numPriorCaptures = numCaptures
      captureNames = (pattern[REGEX_DATA] && pattern[REGEX_DATA].captureNames) || []
      output.push(nativ.replace.call(XRegExp(pattern.source).source, parts, rewrite))
    } else {
      output.push(XRegExp.escape(pattern))
    }
  }

  const separator = conjunction === 'none' ? '' : '|'
  return XRegExp(output.join(separator), flags)
}

fixed.exec = function (str) {
  const origLastIndex = this.lastIndex
  const match = nativ.exec.apply(this, arguments)

  if (match) {
    if (!correctExecNpcg && match.length > 1 && match.includes('')) {
      const r2 = copyRegex(this, {
        removeG: true,
        isInternalOnly: true
      })

      nativ.replace.call(String(str).slice(match.index), r2, (...args) => {
        const len = args.length
        for (let i = 1; i < len - 2; ++i) {
          if (args[i] === undefined) {
            match[i] = undefined
          }
        }
      })
    }

    let groupsObject = match
    if (XRegExp.isInstalled('namespacing')) {
      match.groups = Object.create(null)
      groupsObject = match.groups
    }
    if (this[REGEX_DATA] && this[REGEX_DATA].captureNames) {
      for (let i = 1; i < match.length; ++i) {
        const name = this[REGEX_DATA].captureNames[i - 1]
        if (name) {
          groupsObject[name] = match[i]
        }
      }
    }

    if (this.global && !match[0].length && (this.lastIndex > match.index)) {
      this.lastIndex = match.index
    }
  }

  if (!this.global) {
    this.lastIndex = origLastIndex
  }

  return match
}

fixed.test = function (str) {
  return !!fixed.exec.call(this, str)
}

fixed.match = function (regex) {
  if (!XRegExp.isRegExp(regex)) {
    regex = new RegExp(regex)
  } else if (regex.global) {
    const result = nativ.match.apply(this, arguments)
    regex.lastIndex = 0

    return result
  }

  return fixed.exec.call(regex, toObject(this))
}

fixed.replace = function (search, replacement) {
  const isRegex = XRegExp.isRegExp(search)
  let origLastIndex
  let captureNames
  let result

  if (isRegex) {
    if (search[REGEX_DATA]) {
      ({
        captureNames
      } = search[REGEX_DATA])
    }
    origLastIndex = search.lastIndex
  } else {
    search += ''
  }

  if (isType(replacement, 'Function')) {
    result = nativ.replace.call(String(this), search, (...args) => {
      if (captureNames) {
        let groupsObject

        if (XRegExp.isInstalled('namespacing')) {
          groupsObject = Object.create(null)
          args.push(groupsObject)
        } else {
          // eslint-disable-next-line
          args[0] = new String(args[0]);
          [groupsObject] = args
        }

        for (let i = 0; i < captureNames.length; ++i) {
          if (captureNames[i]) {
            groupsObject[captureNames[i]] = args[i + 1]
          }
        }
      }

      if (isRegex && search.global) {
        search.lastIndex = args[args.length - 2] + args[0].length
      }
      return replacement(...args)
    })
  } else {
    result = nativ.replace.call(this == null ? this : String(this), search, (...args) => {
      return nativ.replace.call(String(replacement), replacementToken, replacer)

      function replacer ($0, bracketed, angled, dollarToken) {
        bracketed = bracketed || angled
        if (bracketed) {
          let n = +bracketed
          if (n <= args.length - 3) {
            return args[n] || ''
          }
          n = captureNames ? captureNames.indexOf(bracketed) : -1
          if (n < 0) {
            throw new SyntaxError(`Backreference to undefined group ${$0}`)
          }
          return args[n + 1] || ''
        }
        if (dollarToken === '$') {
          return '$'
        }
        if (dollarToken === '&' || +dollarToken === 0) {
          return args[0]
        }
        if (dollarToken === '`') {
          return args[args.length - 1].slice(0, args[args.length - 2])
        }
        if (dollarToken === "'") {
          return args[args.length - 1].slice(args[args.length - 2] + args[0].length)
        }
        dollarToken = +dollarToken

        if (!isNaN(dollarToken)) {
          if (dollarToken > args.length - 3) {
            throw new SyntaxError(`Backreference to undefined group ${$0}`)
          }
          return args[dollarToken] || ''
        }
        throw new SyntaxError(`Invalid token ${$0}`)
      }
    })
  }

  if (isRegex) {
    if (search.global) {
      search.lastIndex = 0
    } else {
      search.lastIndex = origLastIndex
    }
  }

  return result
}

fixed.split = function (separator, limit) {
  if (!XRegExp.isRegExp(separator)) {
    return nativ.split.apply(this, arguments)
  }

  const str = String(this)
  const output = []
  const origLastIndex = separator.lastIndex
  let lastLastIndex = 0
  let lastLength

  limit = (limit === undefined ? -1 : limit) >>> 0

  XRegExp.forEach(str, separator, (match) => {
    if ((match.index + match[0].length) > lastLastIndex) {
      output.push(str.slice(lastLastIndex, match.index))
      if (match.length > 1 && match.index < str.length) {
        Array.prototype.push.apply(output, match.slice(1))
      }
      lastLength = match[0].length
      lastLastIndex = match.index + lastLength
    }
  })

  if (lastLastIndex === str.length) {
    if (!nativ.test.call(separator, '') || lastLength) {
      output.push('')
    }
  } else {
    output.push(str.slice(lastLastIndex))
  }

  separator.lastIndex = origLastIndex
  return output.length > limit ? output.slice(0, limit) : output
}

XRegExp.addToken(
  /\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4}|{[\dA-Fa-f]+})|x(?![\dA-Fa-f]{2}))/,
  (match, scope) => {
    if (match[1] === 'B' && scope === defaultScope) {
      return match[0]
    }
    throw new SyntaxError(`Invalid escape ${match[0]}`)
  }, {
    scope: 'all',
    leadChar: '\\'
  }
)

XRegExp.addToken(
  /\\u{([\dA-Fa-f]+)}/,
  (match, scope, flags) => {
    const code = dec(match[1])
    if (code > 0x10FFFF) {
      throw new SyntaxError(`Invalid Unicode code point ${match[0]}`)
    }
    if (code <= 0xFFFF) {
      return `\\u${pad4(hex(code))}`
    }
    if (hasNativeU && flags.includes('u')) {
      return match[0]
    }
    throw new SyntaxError('Cannot use Unicode code point above \\u{FFFF} without flag u')
  }, {
    scope: 'all',
    leadChar: '\\'
  }
)

XRegExp.addToken(
  /\[(\^?)\]/,
  /* eslint-disable no-confusing-arrow */
  (match) => (match[1] ? '[\\s\\S]' : '\\b\\B'),
  /* eslint-enable no-confusing-arrow */
  {
    leadChar: '['
  }
)

XRegExp.addToken(
  /\(\?#[^)]*\)/,
  getContextualTokenSeparator, {
    leadChar: '('
  }
)

XRegExp.addToken(
  /\s+|#[^\n]*\n?/,
  getContextualTokenSeparator, {
    flag: 'x'
  }
)

XRegExp.addToken(
  /\./,
  () => '[\\s\\S]', {
    flag: 's',
    leadChar: '.'
  }
)

XRegExp.addToken(
  /\\k<([\w$]+)>/,
  function (match) {
    const index = isNaN(match[1]) ? (this.captureNames.indexOf(match[1]) + 1) : +match[1]
    const endIndex = match.index + match[0].length
    if (!index || index > this.captureNames.length) {
      throw new SyntaxError(`Backreference to undefined group ${match[0]}`)
    }
    return `\\${index}${
      endIndex === match.input.length || isNaN(match.input[endIndex])
        ? '' : '(?:)'
    }`
  }, {
    leadChar: '\\'
  }
)

XRegExp.addToken(
  /\\(\d+)/,
  function (match, scope) {
    if (
      !(
        scope === defaultScope &&
        /^[1-9]/.test(match[1]) &&
        +match[1] <= this.captureNames.length
      ) &&
      match[1] !== '0'
    ) {
      throw new SyntaxError(`Cannot use octal escape or backreference to undefined group ${match[0]}`)
    }
    return match[0]
  }, {
    scope: 'all',
    leadChar: '\\'
  }
)

XRegExp.addToken(
  /\(\?P?<([\w$]+)>/,
  function (match) {
    if (!isNaN(match[1])) {
      throw new SyntaxError(`Cannot use integer as capture name ${match[0]}`)
    }
    if (!XRegExp.isInstalled('namespacing') && (match[1] === 'length' || match[1] === '__proto__')) {
      throw new SyntaxError(`Cannot use reserved word as capture name ${match[0]}`)
    }
    if (this.captureNames.includes(match[1])) {
      throw new SyntaxError(`Cannot use same name for multiple groups ${match[0]}`)
    }
    this.captureNames.push(match[1])
    this.hasNamedCapture = true
    return '('
  }, {
    leadChar: '('
  }
)

XRegExp.addToken(
  /\((?!\?)/,
  function (match, scope, flags) {
    if (flags.includes('n')) {
      return '(?:'
    }
    this.captureNames.push(null)
    return '('
  }, {
    optionalFlags: 'n',
    leadChar: '('
  }
)

export default XRegExp
