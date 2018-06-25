import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withMarkdownNotes } from '@storybook/addon-notes'

import NewsArticle from '.'
import README from './README.md'

const stories = storiesOf('Molecules | News Article', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => ({
  components: { NewsArticle },
  template: `<sw-news-article
    :article="{
      image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-646441108-1-1488344229.jpg?crop=0.928xw:0.619xh;0.00161xw,0.133xh&resize=768:*',
      title: 'GOP plans to sell welfare cuts by vilifying black and brown communities',
      source: 'Huffington Post',
      date: new Date()
    }"
    :style="{ width: '360px', margin: '0 auto' }"
  />`,
  methods: {}
}))
