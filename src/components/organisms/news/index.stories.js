import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

import { mockNews } from '../../../mocks'

const stories = storiesOf('Organisms | News', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => {
  return {
    components: { Comp },
    template: `<sw-news :articles="articles" :style="{ width: '360px', margin: '0 auto' }" />`,
    data () {
      return {
        articles: mockNews
      }
    }
  }
})
