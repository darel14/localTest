import React from 'react';
import Sidebar from './Sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  argTypes: {
    open: { control: 'boolean' },
  },
};

const Template = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
};
