import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

const stories = storiesOf('Organisms | Header', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => ({
  components: { Comp },
  template: `<sw-header
    email-hash="e1d91ee5412c6334f2123b747ca0f1d2"
    username="Peter"
    action-count="18"
    @accountClicked="accountClicked"
    @logoClicked="logoClicked"
    @menuClicked="menuClicked"
    @menuItemClicked="menuItemClicked"
    :style="{ width: '360px', margin: '0 auto' }"
  />`,
  methods: {
    accountClicked: action('Account Clicked'),
    logoClicked: action('Logo Clicked'),
    menuClicked: action('Menu Clicked'),
    menuItemClicked: action('Menu Item Clicked'),
  }
}))
