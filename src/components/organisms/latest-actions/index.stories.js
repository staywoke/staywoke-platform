import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

import { mockActions } from '../../../mocks'

const stories = storiesOf('Organisms | Latest Actions', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => {
  return {
    components: { Comp },
    template: `<sw-latest-actions :actions="actions" :style="{ width: '360px', margin: '0 auto' }" />`,
    data () {
      return {
        actions: mockActions
      }
    }
  }
})
