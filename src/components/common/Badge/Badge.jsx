import React from "react"
import "./Badge.css"

export function Badge({ children, variant = "secondary" }) {
  return <span className={`badge badge--${variant}`}>{children}</span>
}
