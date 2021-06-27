import React from 'react';
import { IconButtonWrapper } from './IconButton.styled.jsx';

const IconButon = ({children, ...rest}) => {
  return (
    <IconButtonWrapper {...rest}>
      {children}
    </IconButtonWrapper>
  )
}

export default IconButon
