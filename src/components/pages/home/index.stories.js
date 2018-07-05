import { storiesOf } from '@storybook/vue'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

import { mockActions, mockImpactList, mockNews, mockImpactDetails } from '../../../mocks'

const stories = storiesOf('Pages | Home', module)

stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => {
  return {
    components: { Comp },
    template: `<sw-page-home tweet="988889085958938633"
      :news="news"
      :actions="actions"
      :impact-list="impactList"
      :impact-details="impactDetails"
      :style="{ width: '100vw', height: '100vh', padding: '0', margin: 0 }"
    />`,
    data () {
      return {
        news: mockNews,
        actions: mockActions,
        impactList: mockImpactList,
        impactDetails: mockImpactDetails
      }
    }
  }
})
