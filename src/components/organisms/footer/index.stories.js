import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Footer from '.'
import README from './README.md'

const stories = storiesOf('Organisms | Footer', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => ({
  components: { Footer },
  template: `<sw-footer
    feed-updated
    @feedClicked="feedClicked"
    @actionCenterClicked="actionCenterClicked"
    @myImpactClicked="myImpactClicked"
    :style="{ width: '360px', margin: '0 auto' }"
  />`,
  methods: {
    feedClicked: action('Feed Clicked'),
    actionCenterClicked: action('Action Center Clicked'),
    myImpactClicked: action('My Impact Clicked')
  }
}))
