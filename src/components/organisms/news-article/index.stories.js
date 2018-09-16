import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

const stories = storiesOf('Organisms | News Article', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => {
  return {
    components: { Comp },
    template: `<sw-news-article
      :article="article"
      :style="{ width: '360px', margin: '0 auto' }"
      @backClicked="backClicked"
      @readMoreClicked="readMoreClicked"
    />`,
    data () {
      return {
        article: {
          image: 'https://s-i.huffpost.com/gen/4986490/images/o-JEFF-SESSIONS-facebook.jpg',
          title: 'Jeff Sessions is slowly but surely undoing Americas criminal justice progress',
          slug: 'jeff-sessions-undoing-criminal-justice-progress',
          source: 'NBC News',
          summary: 'The Russia investigation may be undercutting Attorney General Jeff Sessions’ credibility, but it has not undermined his efforts to take the U.S. Justice Department back in time.\n\nThe time Sessions wants to go back to features an unforgiving system of mass incarceration that disproportionately targets people of color in a legal structure too often stacked against them.',
          author: 'James Braxton Peterson',
          url: 'https://www.nbcnews.com/think/opinion/jeff-sessions-slowly-surely-undoing-america-s-criminal-justice-progress-ncna823126',
          date: new Date('2017/11/23 04:22:00'),
          read: false
        }
      }
    },
    methods: {
      backClicked: action('Back Clicked'),
      readMoreClicked: action('Read More Clicked')
    }
  }
})
