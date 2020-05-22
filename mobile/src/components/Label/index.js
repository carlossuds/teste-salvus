import React from 'react';

import {Text} from './styles';

function Label({title, style}) {
  return <Text style={style}>{title}</Text>;
}

export default Label;
