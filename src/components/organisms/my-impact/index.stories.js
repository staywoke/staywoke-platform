import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

const stories = storiesOf('Organisms | My Impact', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => {
  return {
    components: { Comp },
    template: `<sw-my-impact :impact-list="impactList" :style="{ width: '360px', margin: '0 auto' }" @moreClicked="moreClicked" />`,
    methods: {
      moreClicked: action('More Clicked')
    },
    data () {
      return {
        impactList: [
          {
            type: 'call',
            total: 123,
            lastTitle: 'Rep. Terri Sewell',
            lastDate: new Date()
          },
          {
            type: 'event',
            total: 22,
            lastTitle: 'Birmingham Indivisible',
            lastDate: new Date()
          },
          {
            type: 'sign-petition',
            total: 38,
            lastTitle: 'Sec. of State Merrill',
            lastDate: new Date()
          }
        ]
      }
    }
  }
})
