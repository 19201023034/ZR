import s from './DocPage.module.css';

/** Shared shell for the text documents (legal, policies, info pages). */
export default function DocPage({ label, title, updated, lead, notice, children }) {
  return (
    <>
      <section className={'section ' + s.head}>
        <span className="section-label enter-fade d1">{label}</span>
        <h1 className={'display ' + s.title + ' enter-mask d2'}>{title}</h1>
        {lead && <p className={s.lead + ' enter d3'}>{lead}</p>}
        {updated && (
          <span className={s.updated + ' mono enter-fade d4'}>Ostatnia aktualizacja: {updated}</span>
        )}
      </section>

      {notice && (
        <div className={s.notice}>
          <strong className={s.noticeTitle + ' mono'}>Do weryfikacji prawnej</strong>
          <p className={s.noticeText}>{notice}</p>
        </div>
      )}

      <section className={'section ' + s.body}>
        <div className={s.prose}>{children}</div>
      </section>
    </>
  );
}
