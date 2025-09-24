import React from 'react';
import Slider from './Slider';

export default {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    images: { control: 'array' },
  },
};

const sampleImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
];

const Template = (args) => <Slider {...args} />;

export const Default = Template.bind({});
Default.args = {
  images: sampleImages,
};
