import { storiesOf } from '@storybook/vue'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

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
        news: [
          {
            image: 'https://media1.s-nbcnews.com/j/newscms/2017_49/2250146/171205-doug-jones-se-222p_e55db1a47ae3d878ce063a92009786c5.focal-760x380.jpg',
            title: 'African-Americans Propel Jones To Alabama Win',
            slug: 'african-americans-propel-jones-to-win',
            source: 'npm.org',
            summary: 'When Sen.-elect Doug Jones, D-Ala., addressed his cheering supporters Tuesday night in Birmingham, Ala., one of his first shout-outs went to his African-American supporters. As well it should have.',
            author: 'Brian Naylor',
            url: 'https://www.npr.org/2017/12/13/570531505/black-votes-matter-african-americans-propel-jones-to-alabama-win',
            date: new Date('2017/12/13 12:00:00'),
            read: false
          },
          {
            image: 'https://scontent.ftpa1-2.fna.fbcdn.net/v/t1.0-0/p480x480/36666142_1039772706180138_963767962320240640_n.jpg?_nc_cat=0&oh=8c055708e2358fa03462ba6f2d566fa1&oe=5BAB77AA',
            title: 'Black State Rep. Says Someone Called Cops On Her While Canvassing',
            slug: 'black-state-rep-says-someone-called-cops',
            source: 'Huffington Post',
            summary: 'An Oregon state representative called on her community to be better to one another after a constituent mistook her behavior as suspicious and called the police while she was canvassing.\n\n"Big shout out to Officer Campbell who responded professionally to someone who said that I was going door to door and spending a lot of time typing on my cell phone after each house—- aka canvassing and keeping account of what my community cares about!" Rep. Janelle Bynum (D) wrote Tuesday on Facebook.',
            author: 'Willa Frej',
            url: 'https://www.huffingtonpost.com/entry/black-state-rep-cops-canvassing_us_5b3cadb1e4b09e4a8b28faaf',
            date: new Date('2018/07/04 12:00:00'),
            read: true
          },
          {
            image: 'https://s-i.huffpost.com/gen/4986490/images/o-JEFF-SESSIONS-facebook.jpg',
            title: 'Jeff Sessions is slowly but surely undoing Americas criminal justice progress',
            slug: 'jeff-sessions-undoing-criminal-justice-progress',
            source: 'NBC News',
            summary: 'The Russia investigation may be undercutting Attorney General Jeff Sessions’ credibility, but it has not undermined his efforts to take the U.S. Justice Department back in time.\n\nThe time Sessions wants to go back to features an unforgiving system of mass incarceration that disproportionately targets people of color in a legal structure too often stacked against them.',
            author: 'James Braxton Peterson',
            url: 'https://www.nbcnews.com/think/opinion/jeff-sessions-slowly-surely-undoing-america-s-criminal-justice-progress-ncna823126',
            date: new Date('2017/11/23 04:22:00'),
            read: false
          }
        ],
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
        ],
        impactList: [
          {
            type: 'call',
            total: 123,
            lastTitle: 'Rep. Terri Sewell',
            lastDate: new Date()
          },
          {
            type: 'event',
            total: 22,
            lastTitle: 'Birmingham Indivisible',
            lastDate: new Date()
          },
          {
            type: 'sign-petition',
            total: 38,
            lastTitle: 'Sec. of State Merrill',
            lastDate: new Date()
          }
        ],
        impactDetails: [
          {
            title: 'Rep. Terri Sewell',
            date: new Date('2017/12/15 12:00:00')
          },
          {
            title: 'Sec. of State John Merrill',
            date: new Date('2017/11/30 12:00:00')
          },
          {
            title: 'Rep. Mo Brooks',
            date: new Date('2017/11/14 12:00:00')
          },
          {
            title: 'Rep. Mo Brooks',
            date: new Date('2017/11/11 12:00:00')
          },
          {
            title: 'Sen. Luther Strange',
            date: new Date('2017/11/03 12:00:00')
          }
        ]
      }
    }
  }
})
