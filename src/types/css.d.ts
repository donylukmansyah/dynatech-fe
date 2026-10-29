import 'react'

// Allow CSS custom properties in inline style objects.
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}
