import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

const stories = storiesOf('Molecules | Impact', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => ({
  components: { Comp },
  template: `<sw-impact
    :impact="impact"
    :style="{ width: '360px', margin: '0 auto' }"
    @moreClicked="moreClicked"
  />`,
  methods: {
    moreClicked: action('More Clicked')
  },
  data () {
    return {
      impact: {
        type: 'call',
        total: 123,
        lastTitle: 'Rep. Terri Sewell',
        lastDate: new Date()
      }
    }
  }
}))
