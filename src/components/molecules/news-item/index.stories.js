import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Comp from '.'
import README from './README.md'

const stories = storiesOf('Molecules | News Item', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => ({
  components: { Comp },
  template: `<sw-news-item
    :article="article"
    :style="{ width: '360px', margin: '0 auto', textAlign: 'left', display: 'block' }"
  />`,
  data () {
    return {
      article: {
        image: 'https://media1.s-nbcnews.com/j/newscms/2017_49/2250146/171205-doug-jones-se-222p_e55db1a47ae3d878ce063a92009786c5.focal-760x380.jpg',
        title: 'African-Americans Propel Jones To Alabama Win',
        slug: 'african-americans-propel-jones-to-win',
        source: 'npm.org',
        summary: 'When Sen.-elect Doug Jones, D-Ala., addressed his cheering supporters Tuesday night in Birmingham, Ala., one of his first shout-outs went to his African-American supporters. As well it should have.',
        author: 'Brian Naylor',
        url: 'https://www.npr.org/2017/12/13/570531505/black-votes-matter-african-americans-propel-jones-to-alabama-win',
        date: new Date('2017/12/13 12:00:00'),
        read: false
      }
    }
  }
}))
