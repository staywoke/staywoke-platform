import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

const stories = storiesOf('Molecules | Action', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => ({
  components: { Comp },
  template: `<sw-action
    :action="action"
    :style="{ width: '360px', margin: '0 auto' }"
  />`,
  data () {
    return {
      action: {
        type: 'call',
        title: 'Call your Member of Congress to stop welfare and Medicate cuts',
        national: false,
        state: 'MO'
      }
    }
  }
}))
