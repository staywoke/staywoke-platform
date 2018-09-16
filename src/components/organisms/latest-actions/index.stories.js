import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

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
        actions: [
          {
            type: 'call',
            slug: 'stop-welfare-and-medicare-cuts',
            title: 'Call your Member of Congress to stop welfare and Medicare cuts',
            national: true,
            state: null,
            organization: 'moveon.org',
            image: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/58024697/886310592.jpg.0.jpg',
            summary: 'Congress will be back in Washington, D.C., on November 13 and they’ll be making high-stakes decisions on jobs, the Bush tax cuts for the richest 2%, and whether to cut Medicare, Social Security and Medicaid before the end of the year.\n\nCorporations and millionaires—who spent record amounts trying to buy the election for Mitt Romney—are going to be spending tens of millions on a full frontal assault in the halls of Congress to keep their special perks.',
            callToAction: 'Tell Congress: No Cuts to Medicare, Medicaid and Social Security and No Tax Cuts for the Rich.',
            url: 'https://petitions.moveon.org/sign/tell-congress-no-cuts'
          },
          {
            type: 'sign-petition',
            slug: 'florida-petition-seeks-to-restore-voting-rights',
            title: 'Florida Petition Seeks to Restore Voting Rights of 1.5 Million People',
            national: false,
            state: 'FL',
            organization: 'Florida Rights Restoration Coalition',
            image: 'http://floridapolitics.com/wp-content/uploads/2018/01/issue-voting-rights.jpg',
            summary: 'Across the country, nearly 6 million American citizens who served felony convictions cannot vote due to Jim Crow style laws. The state of Florida is among the strictest of states when it comes to this form of voter suppression, effectively imposing lifelong disenfranchisement to over 1.5 million people who were formerly incarcerated.',
            callToAction: 'Restore voting rights to over 1.5 million Floridians',
            url: 'https://floridarrc.com/wp-content/uploads/2017/02/3ecbf8_3ba4d6758f154f839954e38eb612b87a.pdf'
          },
          {
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
        ]
      }
    }
  }
})
