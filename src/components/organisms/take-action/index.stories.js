import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

import { mockActions } from '../../../mocks'

const stories = storiesOf('Organisms | Take Action', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => {
  return {
    components: { Comp },
    template: `<sw-take-action
      :action="action"
      :style="{ width: '360px', margin: '0 auto' }"
      @backClicked="backClicked"
      @actionClicked="actionClicked"
    />`,
    data () {
      return {
        action: mockActions[2]
      }
    },
    methods: {
      backClicked: action('Back Clicked'),
      actionClicked: action('Action Clicked')
    }
  }
})
