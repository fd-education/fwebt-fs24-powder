import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Background = (props: Props) => {
  return (
  <div className={`h-dvh w-dvw bg-powder-hills-light dark:bg-powder-hills-dark bg-cover`}>
    {props.children}
  </div>
  )
}