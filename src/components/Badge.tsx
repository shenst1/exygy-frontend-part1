import "./Badge.scss"
import React from "react"
export interface BadgeProps {
  children: React.ReactNode
  variation?: string
}
export const Badge = ({ children, variation = "default" }: BadgeProps) => {
  const CLASS_NAMES: { [key: string]: string } = {
    default: "",
    callout: "badge-callout",
  }

  return <div className={`badge ${CLASS_NAMES[variation]}`}>{children}</div>
}
