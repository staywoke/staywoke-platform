<template>
  <div class='action'>
    <div class='location'>
      <span class='stateface' :class='locationIcon'></span>
      <span class='name'>
        {{ locationName }}
      </span>
    </div>
    <div class='summary'>
      <div class='title'>
        {{ actionTitle }}
      </div>
      <div class='action-type'>
        <font-awesome-icon color='#FFFFFF' :icon='actionIcon' class='button-icon'></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Action',
  props: {
    action: {
      type: Object,
      default: () => ({
        type: null,
        title: null,
        national: false,
        state: null
      }),
      validator: function (action) {
        const actionTypes = [
          'call',
          'donate',
          'event',
          'protest',
          'sign-petition',
          'signup-updates'
        ]

        const states = [
          'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC',
          'FM','FL','GA','GU','HI','ID','IL','IN','IA','KS',
          'KY','LA','ME','MH','MD','MA','MI','MN','MS','MO',
          'MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP',
          'OH','OK','OR','PW','PA','PR','RI','SC','SD','TN',
          'TX','UT','VT','VI','VA','WA','WV','WI','WY'
        ]

        const validType = (actionTypes.indexOf(action.type) !== -1)
        const validLocation = ((action.national && action.state) || (!action.national && states.indexOf(action.state) !== -1 ))

        return (validType && validLocation)
      }
    }
  },
  computed: {
    locationName() {
      if (this.action.national) {
        return 'National'
      } else {
        const states = {
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

        return states[this.action.state.toUpperCase()]
      }
    },
    locationIcon() {
      if (this.action.national) {
        return 'stateface-us'
      } else {
        return 'stateface-' + this.action.state.toLowerCase()
      }
    },
    actionIcon() {
      let icon

      if (this.action.type === 'call') {
        icon = 'phone'
      }
      else if (this.action.type === 'donate') {
        icon = 'dollar-sign'
      }
      else if (this.action.type === 'event') {
        icon = 'clock'
      }
      else if (this.action.type === 'protest') {
        icon = 'hand-rock'
      }
      else if (this.action.type === 'sign-petition') {
        icon = 'pencil'
      }
      else if (this.action.type === 'signup-updates') {
        icon = 'envelope-open'
      }

      return ['fas', icon]
    },
    actionTitle() {
      const max = 90

      if (this.action.title.length <= max) {
        return this.action.title;
      }

      var subString = this.action.title.substr(0, max-1);

      return subString.substr(0, subString.lastIndexOf(' ')) + ' ...';
    }
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.action {
  position: relative;

  .location {
    width: 90px;
    height: 65px;
    background: #111;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    float: left;
    text-align: center;

    .stateface {
      color: #00bffa;
      font-size: 40px;
      line-height: 24px;
      display: block;
      margin-top: 14px;
    }

    .name {
      color: #FFF;
      white-space: nowrap;
      font-size: 11px;
      font-weight: 900;
    }
  }

  .summary {
    display: inline-block;
    width: calc(100% - 90px);
    height: 65px;
    float: left;
    padding-left: 10px;
    position: relative;

    .title {
      font-weight: 900;
      line-height: 16px;
      padding-right: 25px;
      padding-top: 8px;
    }

    .action-type {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 40px 40px;
      border-color: transparent transparent #000000 transparent;
      position: absolute;
      bottom: 0;
      right: 0;

      svg {
        position: absolute;
        right: 7px;
        top: 21px;
        width: 12px;
        height: 12px;
      }
    }
  }

  .details {
    font-size: 10px;
    text-transform: uppercase;
    line-height: 10px;
    color: #666;
    position: absolute;
    bottom: 0;
    width: 100%;

    .date {
      position: absolute;
      right: 0;
      bottom: 0;
      color: #999;
    }
  }
}
</style>
