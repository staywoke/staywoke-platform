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
export const actionIcon  = (style, action) => {
  let icon

  if (action === 'call') {
    icon = 'phone'
  }
  else if (action === 'donate') {
    icon = 'dollar-sign'
  }
  else if (action === 'event') {
    icon = 'clock'
  }
  else if (action === 'protest') {
    icon = 'hand-rock'
  }
  else if (action === 'sign-petition') {
    icon = 'pencil'
  }
  else if (action === 'signup-updates') {
    icon = 'envelope-open'
  }

  return [style, icon]
}

export const actionSummary  = (action) => {
  let summary

  if (action === 'call') {
    summary = 'Phone Calls Made'
  }
  else if (action === 'donate') {
    summary = 'Donations Made'
  }
  else if (action === 'event') {
    summary = 'Events Attended'
  }
  else if (action === 'protest') {
    summary = 'Protests Attended'
  }
  else if (action === 'sign-petition') {
    summary = 'Petitions Signed'
  }
  else if (action === 'signup-updates') {
    summary = 'Updates Requested'
  }

  return summary
}

export const actionLabel  = (action) => {
  let summary

  if (action === 'call') {
    summary = 'Call'
  }
  else if (action === 'donate') {
    summary = 'Donate'
  }
  else if (action === 'event') {
    summary = 'Event'
  }
  else if (action === 'protest') {
    summary = 'Protest'
  }
  else if (action === 'sign-petition') {
    summary = 'Sign'
  }
  else if (action === 'signup-updates') {
    summary = 'Signup'
  }

  return summary
}

export const actionButton  = (action) => {
  let summary

  if (action === 'call') {
    summary = 'I\'m Ready to Call'
  }
  else if (action === 'donate') {
    summary = 'I\'m Ready to Donate'
  }
  else if (action === 'event') {
    summary = 'Go to Event'
  }
  else if (action === 'protest') {
    summary = 'Join Protest'
  }
  else if (action === 'sign-petition') {
    summary = 'Sign Petition'
  }
  else if (action === 'signup-updates') {
    summary = 'Signup for Updates'
  }

  return summary
}

export const stateCodes = [
  'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC',
  'FM','FL','GA','GU','HI','ID','IL','IN','IA','KS',
  'KY','LA','ME','MH','MD','MA','MI','MN','MS','MO',
  'MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP',
  'OH','OK','OR','PW','PA','PR','RI','SC','SD','TN',
  'TX','UT','VT','VI','VA','WA','WV','WI','WY'
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
