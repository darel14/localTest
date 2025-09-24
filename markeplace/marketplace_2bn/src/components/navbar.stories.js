import React from 'react';
import Navbar from './navbar';

export default {
  title: 'Components/Navbar',
  component: Navbar,
  argTypes: {
    cartCount: { control: 'number' },
  },
};

const Template = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  cartCount: 3,
};
