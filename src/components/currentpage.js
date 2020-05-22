import React from 'react';

const Page = ({ location }) => {
  const url = location.href ? location.href : '';

  return (
    <input type="text" readOnly="readonly" value={url} />
  );
};

export default Page;