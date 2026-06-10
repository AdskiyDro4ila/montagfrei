import { Link, useSearchParams } from 'react-router-dom'
import { FaqLanguageSwitcher } from '../components/legal/FaqLanguageSwitcher'
import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'
import { faqTranslations, parseFaqLang, type FaqLang } from './faq/translations'

const EMAIL = 'kontakt@montagfrei.com'

export function FaqPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const lang = parseFaqLang(searchParams.get('lang'))
  const content = faqTranslations[lang]

  function setLang(next: FaqLang) {
    if (next === 'de') {
      searchParams.delete('lang')
    } else {
      searchParams.set('lang', next)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const contactSection = content.sections[content.sections.length - 1]

  return (
    <LegalLayout
      title={content.title}
      headerAction={<FaqLanguageSwitcher lang={lang} onChange={setLang} />}
    >
      <p className="text-black/50">{content.intro}</p>

      {content.sections.slice(0, -1).map((section) => (
        <LegalSection key={section.title} title={section.title}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </LegalSection>
      ))}

      <LegalSection title={contactSection.title}>
        <p>
          <a href={`mailto:${EMAIL}`} className="text-black underline underline-offset-2">
            {EMAIL}
          </a>
        </p>
        <p>
          {content.contact.legalNote}{' '}
          <Link to="/impressum" className="text-black underline underline-offset-2">
            {content.contact.imprint}
          </Link>
          ,{' '}
          <Link to="/agb" className="text-black underline underline-offset-2">
            {content.contact.terms}
          </Link>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
