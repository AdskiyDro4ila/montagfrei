import { FAQ_LANGUAGES, type FaqLang } from '../../pages/faq/translations'

interface FaqLanguageSwitcherProps {
  lang: FaqLang
  onChange: (lang: FaqLang) => void
}

export function FaqLanguageSwitcher({ lang, onChange }: FaqLanguageSwitcherProps) {
  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label="Sprache wählen"
    >
      {FAQ_LANGUAGES.map(({ code, flag, label }) => {
        const active = code === lang
        return (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            aria-label={label}
            aria-pressed={active}
            title={label}
            className={`
              flex h-7 w-7 items-center justify-center rounded-sm
              text-[13px] leading-none transition-all duration-200
              ${active
                ? 'bg-black/5 opacity-100'
                : 'opacity-35 hover:bg-black/[0.03] hover:opacity-70'
              }
            `}
          >
            <span aria-hidden="true">{flag}</span>
          </button>
        )
      })}
    </div>
  )
}
