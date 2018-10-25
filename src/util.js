/**
 * Types of Actions
 * @type {Array}
 */
export const actionTypes = [
  'call',
  'donate',
  'event',
  'protest',
  'sign-petition',
  'signup-updates'
]

/**
 * Get Icon for Action Type
 * @param  {string} style font style
 * @param  {string} action from actionTypes
 * @return {string}        [description]
 */
export const actionIcon = (style, action) => {
  let icon

  if (action === 'call') {
    icon = 'phone'
  } else if (action === 'donate') {
    icon = 'dollar-sign'
  } else if (action === 'event') {
    icon = 'clock'
  } else if (action === 'protest') {
    icon = 'hand-rock'
  } else if (action === 'sign-petition') {
    icon = 'pencil'
  } else if (action === 'signup-updates') {
    icon = 'envelope-open'
  }

  return [style, icon]
}

export const actionSummary = (action) => {
  let summary

  if (action === 'call') {
    summary = 'Phone Calls Made'
  } else if (action === 'donate') {
    summary = 'Donations Made'
  } else if (action === 'event') {
    summary = 'Events Attended'
  } else if (action === 'protest') {
    summary = 'Protests Attended'
  } else if (action === 'sign-petition') {
    summary = 'Petitions Signed'
  } else if (action === 'signup-updates') {
    summary = 'Updates Requested'
  }

  return summary
}

export const actionLabel = (action) => {
  let summary

  if (action === 'call') {
    summary = 'Call'
  } else if (action === 'donate') {
    summary = 'Donate'
  } else if (action === 'event') {
    summary = 'Event'
  } else if (action === 'protest') {
    summary = 'Protest'
  } else if (action === 'sign-petition') {
    summary = 'Sign'
  } else if (action === 'signup-updates') {
    summary = 'Signup'
  }

  return summary
}

export const actionButton = (action) => {
  let summary

  if (action === 'call') {
    summary = 'Call Voters'
  } else if (action === 'donate') {
    summary = 'Ready to Donate'
  } else if (action === 'event') {
    summary = 'Go to Event'
  } else if (action === 'protest') {
    summary = 'Join Protest'
  } else if (action === 'sign-petition') {
    summary = 'Sign Petition'
  } else if (action === 'signup-updates') {
    summary = 'Signup for Updates'
  }

  return summary
}

export const stateCodes = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
  'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
  'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
  'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
  'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
  'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
]

export const stateList = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AS': 'American Samoa',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'DC': 'District Of Columbia',
  'FM': 'Federated States Of Micronesia',
  'FL': 'Florida',
  'GA': 'Georgia',
  'GU': 'Guam',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MH': 'Marshall Islands',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'MP': 'Northern Mariana Islands',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PW': 'Palau',
  'PA': 'Pennsylvania',
  'PR': 'Puerto Rico',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VI': 'Virgin Islands',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming'
}

export const metaInfo = (meta) => {
  if (!meta) {
    meta = {}
  }

  const title = (meta.title) ? meta.title : 'StayWoke: Learn | Build | Resist'
  const description = (meta.description) ? meta.description : 'There are more of us who support equality and justice than who oppose it. Join a community of learners, builders, and activists to create solutions to advance equality and justice in America.'
  const keywords = (meta.keywords) ? meta.keywords : 'StayWoke, Resist, Equality, Justice, Community, Activist, America'
  const image = (meta.image) ? meta.image : 'https://staywoke-platform.s3.amazonaws.com/staywoke-card.jpg'

  let url = (meta.url) ? meta.url : 'https://app.staywoke.org'

  if (url.length > 1 && url.charAt(0) === '/') {
    url = `${window.location.protocol}//${window.location.host}${url}`
  }

  return {
    title: title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },

      /* Twitter META Info */
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@staywoke' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:creator', content: '@staywoke' },
      { name: 'twitter:image:src', content: image },
      { name: 'twitter:domain', content: 'app.staywoke.org' },

      /* Open Graph protocol */
      { name: 'og:locale', content: 'en_US' },
      { name: 'og:type', content: 'website' },
      { name: 'og:title', content: title },
      { name: 'og:url', content: url },
      { name: 'og:image', content: image },
      { name: 'og:site_name', content: 'StayWoke' },
      { name: 'og:description', content: description },

      /* Dublin Core Metadata */
      { name: 'dc:language', content: 'en_US' },
      { name: 'dc:title', content: title },
      { name: 'dc:source', content: url },
      { name: 'dc:description', content: description }
    ]
  }
}
