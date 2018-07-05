import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

const stories = storiesOf('Atoms | Action Item', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => ({
  components: { Comp },
  template: `<sw-action-item
    :item="item"
    :style="{ width: '360px', margin: '0 auto' }"
    @actionItemClicked="actionItemClicked"
  />`,
  methods: {
    actionItemClicked: action('Action Item Clicked')
  },
  data () {
    return {
      item: {
        title: 'Policing'
      }
    }
  }
}))
