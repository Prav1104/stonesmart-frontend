import React from "react"
import "./Card.css"

export function Card({ children }) {
  return <div className="card">{children}</div>
}

export function CardHeader({ title, actions }) {
  return (
    <div className="card__header">
      <h3 className="card__header-title">{title}</h3>
      <div className="card__header-actions">{actions}</div>
    </div>
  )
}

export function CardContent({ children }) {
  return <div className="card__content">{children}</div>
}
