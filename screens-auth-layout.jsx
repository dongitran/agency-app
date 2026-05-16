function AuthShell({ brand, onBack, title = '', children, action }) {
  const b = getBrand(brand);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F6F8FC', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="anim-slide-in">
      <div style={{ position: 'absolute', inset: '0 0 auto 0', height: 220, background: `linear-gradient(155deg, ${b.soft} 0%, #FFFFFF 62%, #F8FAFC 100%)` }} />
      <ScreenHeader title={title} onBack={onBack} transparent/>
      <div style={{ position: 'relative', flex: 1, overflow: 'auto', padding: '0 18px 112px' }} className="scroll-area">
        {children}
      </div>
      {action}
    </div>
  );
}

function AuthHero({ brand, eyebrow, title, subtitle, trailing }) {
  const b = getBrand(brand);
  return (
    <div style={{ padding: '6px 4px 18px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 15, background: '#fff', border: `1px solid ${b.solid}18`, boxShadow: '0 10px 24px -18px rgba(15,23,42,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: b.solid, flexShrink: 0 }}>
        <ContactIcon mode="phone"/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: b.solid, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.4 }}>{eyebrow}</div>
        <div style={{ fontSize: 28, fontWeight: 850, color: '#0F172A', letterSpacing: -0.6, lineHeight: 1.12, marginTop: 5, textWrap: 'balance' }}>{title}</div>
        <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.55, marginTop: 8 }}>{subtitle}</div>
      </div>
      {trailing}
    </div>
  );
}

function AuthPanel({ children, style = {} }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E8EEF6', borderRadius: 24, padding: 18, boxShadow: '0 20px 48px -34px rgba(15,23,42,0.48)', ...style }}>
      {children}
    </div>
  );
}

function AuthProgress({ step, total, brand }) {
  const b = getBrand(brand);
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: b.solid }}>Bước {step}/{total}</div>
        <div style={{ fontSize: 12, color: '#64748B', fontWeight: 650 }}>Tài khoản Agency</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${total}, 1fr)`, gap: 6 }}>
        {Array.from({ length: total }, (_, index) => (
          <div key={index} style={{ height: 5, borderRadius: 999, background: index < step ? `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})` : '#E2E8F0' }} />
        ))}
      </div>
    </div>
  );
}

function AuthFieldLabel({ children, right }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
      <span>{children}</span>
      {right}
    </div>
  );
}

function AuthSocialButtons() {
  const socials = [
    { n: 'Zalo', c: '#0068FF', icon: 'Z' },
    { n: 'Google', c: '#EA4335', icon: 'G' },
    { n: 'Apple', c: '#0F172A', icon: 'A' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {socials.map((s) => (
        <button key={s.n} type="button" className="tap" style={{ height: 44, borderRadius: 14, border: '1px solid #E2E8F0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#0F172A', fontSize: 12, fontWeight: 750 }}>
          <span style={{ width: 20, height: 20, borderRadius: 7, background: s.c, color: '#fff', fontSize: 11, fontWeight: 850, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</span>
          {s.n}
        </button>
      ))}
    </div>
  );
}

function AuthDivider({ label = 'Hoặc' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0' }}>
      <div style={{ flex: 1, height: 1, background: '#E2E8F0' }}/>
      <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 750, textTransform: 'uppercase', letterSpacing: 0.3 }}>{label}</div>
      <div style={{ flex: 1, height: 1, background: '#E2E8F0' }}/>
    </div>
  );
}

function AuthNote({ brand, icon, title, body }) {
  const b = getBrand(brand);
  return (
    <div style={{ marginTop: 14, padding: 14, borderRadius: 18, background: b.soft, border: `1px solid ${b.solid}18`, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <div style={{ width: 30, height: 30, borderRadius: 10, background: '#fff', color: b.solid, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>{title}</div>
        <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5, marginTop: 3 }}>{body}</div>
      </div>
    </div>
  );
}

Object.assign(window, { AuthShell, AuthHero, AuthPanel, AuthProgress, AuthFieldLabel, AuthSocialButtons, AuthDivider, AuthNote });
