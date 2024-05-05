import React from 'react';
import withAuthProtection from '../components/Common/withAuthProtection';

function Chat() {
  return <div>chat</div>;
}

export default withAuthProtection(Chat);
