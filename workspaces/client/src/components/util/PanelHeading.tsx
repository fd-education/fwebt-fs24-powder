import React from 'react';

type PanelHeadingProps = {
  text: string
}

export const PanelHeading = ({text}: PanelHeadingProps) => {
  return (
    <h3 className={`font-blocked text-3xl text-primary-dark dark:text-primary-light`}>{text}</h3>
  )
}