import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

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
        action: {
          type: 'event',
          slug: 'justice-for-sandra-bland',
          title: 'Justice for Sandra Bland and all Black Women',
          national: false,
          state: 'NY',
          organization: 'Take Action NYC',
          image: 'https://images.complex.com/complex/images/c_limit,w_680/fl_lossy,pg_1,q_auto/s2r4zk4qtjrsxe1oryhp/justice-for-sandra-bland',
          summary: 'Join People’s Power Assembly NYC and Equality for Flatbush to honor Sandra Bland and all Black women and girls brutalized and killed by state violence. We will uplift Black women and girls. We call on everyone to "Say Her Name!"',
          callToAction: 'Join PPA every Wednesday as we demand justice for all! 7 to 9 p.m. at 147 West 24th Street, 2nd Floor.',
          url: 'http://takeactionnyc.com/nyc-protest-event-calendar/#event|justice-for-sandra-bland-and-all-black-women|5333'
        }
      }
    },
    methods: {
      backClicked: action('Back Clicked'),
      actionClicked: action('Action Clicked')
    }
  }
})
