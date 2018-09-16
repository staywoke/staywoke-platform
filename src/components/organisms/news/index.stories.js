import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

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
        articles: [
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
        ]
      }
    }
  }
})
