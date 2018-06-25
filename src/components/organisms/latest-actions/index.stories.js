import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Component from '.'
import README from './README.md'

const stories = storiesOf('Organisms | Latest Actions', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => {
  return {
    components: { Component },
    template: `<sw-latest-actions :actions="[
      {
        type: 'call',
        title: 'Call your Member of Congress to stop welfare and Medicate cuts',
        national: true
      },
      {
        type: 'sign-petition',
        title: 'Sign petition to Secretary of the state to change voting laws',
        state: 'FL'
      },
      {
        type: 'event',
        title: 'Join StayWoke Meeting in New York',
        national: false,
        state: 'NY'
      }
    ]" :style="{ width: '360px', margin: '0 auto' }" />`,
    methods: {}
  }
})
