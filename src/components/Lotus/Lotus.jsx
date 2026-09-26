import styles from './Lotus.module.css'

export default function Lotus({ size = 48, className = '' }) {
  return (
    <div className={`${styles.wrapper} ${className}`} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        className={styles.lotus}
      >
        <ellipse cx="24" cy="28" rx="10" ry="18" fill="currentColor" opacity="0.15" />
        <ellipse cx="15" cy="26" rx="8" ry="16" fill="currentColor" opacity="0.2" transform="rotate(-25 15 26)" />
        <ellipse cx="33" cy="26" rx="8" ry="16" fill="currentColor" opacity="0.2" transform="rotate(25 33 26)" />
        <ellipse cx="10" cy="22" rx="6" ry="12" fill="currentColor" opacity="0.25" transform="rotate(-40 10 22)" />
        <ellipse cx="38" cy="22" rx="6" ry="12" fill="currentColor" opacity="0.25" transform="rotate(40 38 22)" />
        <circle cx="24" cy="16" r="4" fill="currentColor" opacity="0.3" />
      </svg>
    </div>
  )
}
