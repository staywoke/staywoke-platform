import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Action from '.'
import README from './README.md'

const stories = storiesOf('Molecules | Action', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => ({
  components: { Action },
  template: `<sw-action
    :action="{
      type: 'call',
      title: 'Call your Member of Congress to stop welfare and Medicate cuts',
      national: false,
      state: 'MO'
    }"
    :style="{ width: '360px', margin: '0 auto' }"
  />`,
  methods: {}
}))
