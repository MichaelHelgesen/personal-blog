import React from 'react';

const Foo = () => {
  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    `${url}`
  );
};

export default Foo;

/*
const Page = ({ location }) => {
  const url = location.href ? location.href : '';

  return (
    <input type="text" readOnly="readonly" value={url} />
  );
};

export default Page;*/