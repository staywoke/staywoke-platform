import VueInfoAddon from 'storybook-addon-vue-info'
import Centered from '@storybook/addon-centered'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withMarkdownNotes } from '@storybook/addon-notes'

import Component from '.'
import README from './README.md'

const stories = storiesOf('Organisms | News', module)

stories.addDecorator(VueInfoAddon)
stories.addDecorator(Centered)
stories.addDecorator((story, context) => withMarkdownNotes(README)(story)(context))

stories.add('Component', () => {
  return {
    components: { Component },
    template: `<sw-news :articles="[
      {
        image: 'https://media1.s-nbcnews.com/j/newscms/2017_49/2250146/171205-doug-jones-se-222p_e55db1a47ae3d878ce063a92009786c5.focal-760x380.jpg',
        title: 'Doug Jones owes his victory to Alabamas black voters',
        source: 'aol.com',
        date: new Date()
      },
      {
        image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-646441108-1-1488344229.jpg?crop=0.928xw:0.619xh;0.00161xw,0.133xh&resize=768:*',
        title: 'GOP plans to sell welfare cuts by vilifying black and brown communities',
        source: 'Huffington Post',
        date: new Date()
      },
      {
        image: 'https://img.huffingtonpost.com/asset/5b2bfe0f2200006503eec344.jpeg?ops=scalefit_720_noupscale',
        title: 'Jeff Sessions is slowly bu surely undoing Americas criminal justice progress',
        source: 'NBC News',
        date: new Date()
      }
    ]" :style="{ width: '360px', margin: '0 auto' }" />`,
    methods: {}
  }
})
