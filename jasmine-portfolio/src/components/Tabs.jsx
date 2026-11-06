export default function Tabs({ items, value, onChange }) {
  return (
    <div className="tabs" role="group">
      {items.map(([key, label]) => (
        <button key={key} className="tab" aria-pressed={value === key} onClick={() => onChange(key)}>
          {label}
        </button>
      ))}
    </div>
  )
}
