import s from './DocPage.module.css';

/** Shared shell for the text documents (legal, policies, info pages). */
export default function DocPage({ label, title, updated, lead, notice, t, plOnly, children }) {
  return (
    <>
      <section className={'section ' + s.head}>
        <span className="section-label enter-fade d1">{label}</span>
        <h1 className={'display ' + s.title + ' enter-mask d2'}>{title}</h1>
        {lead && <p className={s.lead + ' enter d3'}>{lead}</p>}
        {updated && (
          <span className={s.updated + ' mono enter-fade d4'}>{t.updated} {updated}</span>
        )}
      </section>

      {/* Legal text is not machine-translated: for an English reader we say plainly
          that the Polish wording is the one that counts. */}
      {plOnly && t.plBinding && (
        <div className={s.notice}>
          <strong className={s.noticeTitle + ' mono'}>{t.plBindingTitle}</strong>
          <p className={s.noticeText}>{t.plBinding}</p>
        </div>
      )}

      {notice && (
        <div className={s.notice}>
          <strong className={s.noticeTitle + ' mono'}>{t.legalReview}</strong>
          <p className={s.noticeText}>{notice}</p>
        </div>
      )}

      <section className={'section ' + s.body}>
        <div className={s.prose}>{children}</div>
      </section>
    </>
  );
}
