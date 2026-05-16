function LoginScreen({ nav, onLogin, brand }) {
  const b = getBrand(brand);
  const [step, setStep] = React.useState(0);
  const [contactMode, setContactMode] = React.useState('phone');
  const [contact, setContact] = React.useState('0912 345 678');
  const [pw, setPw] = React.useState('123456');
  const [showPw, setShowPw] = React.useState(false);
  const [err, setErr] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const loginContactLabel = normalizeContact(contact) || (contactMode === 'email' ? 'email của bạn' : 'số điện thoại của bạn');

  const changeContactMode = (mode) => {
    setContactMode(mode);
    setContact('');
    setErr({});
  };

  const continueToPassword = () => {
    const e = {};
    if (!isValidContact(contact, contactMode)) e.contact = contactError(contactMode);
    setErr(e);
    if (Object.keys(e).length) return;
    setErr({});
    setStep(1);
  };

  const submitPassword = () => {
    const e = {};
    if (!/^\d{6,}$/.test(pw)) e.pw = 'Mật khẩu số tối thiểu 6 chữ số';
    setErr(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 700);
  };

  return (
    <AuthShell brand={brand} title="Đăng nhập" onBack={() => step > 0 ? setStep(0) : nav.pop()}>
      {step === 0 ? (
        <LoginContactStep
          brand={brand}
          contactMode={contactMode}
          contact={contact}
          err={err}
          changeContactMode={changeContactMode}
          setContact={setContact}
          continueToPassword={continueToPassword}
          nav={nav}
        />
      ) : (
        <LoginPasswordStep
          brand={brand}
          b={b}
          loginContactLabel={loginContactLabel}
          pw={pw}
          setPw={setPw}
          showPw={showPw}
          setShowPw={setShowPw}
          err={err}
          loading={loading}
          submitPassword={submitPassword}
          nav={nav}
        />
      )}
    </AuthShell>
  );
}

function LoginContactStep({ brand, contactMode, contact, err, changeContactMode, setContact, continueToPassword, nav }) {
  return (
    <div className="anim-fade">
      <div style={{ padding: '8px 4px 16px' }}>
        <div style={{ fontSize: 27, fontWeight: 850, color: '#0F172A', letterSpacing: -0.55, lineHeight: 1.15 }}>Chào mừng trở lại</div>
      </div>
      <AuthPanel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ContactModeToggle mode={contactMode} onChange={changeContactMode} brand={brand}/>
          <div>
            <AuthFieldLabel>{contactModeLabel(contactMode)}</AuthFieldLabel>
            <Input aria-label={contactModeLabel(contactMode)} name="login-contact" value={contact} onChange={setContact} type={contactMode === 'email' ? 'email' : 'tel'} inputMode={contactMode === 'email' ? 'email' : 'tel'} icon={<ContactIcon mode={contactMode}/>} placeholder={contactModeLabel(contactMode)} error={err.contact} autoComplete={contactMode === 'email' ? 'email' : 'tel'} autoCapitalize="none" autoCorrect="off" spellCheck={false}/>
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <PrimaryButton fullWidth onClick={continueToPassword} brand={brand}>Tiếp tục</PrimaryButton>
        </div>
        <AuthDivider/>
        <AuthSocialButtons/>
      </AuthPanel>
      <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#64748B' }}>
        Chưa có tài khoản? <span className="tap" onClick={() => nav.replace('signup')} style={{ color: getBrand(brand).solid, fontWeight: 800 }}>Đăng ký ngay</span>
      </div>
    </div>
  );
}

function LoginPasswordStep({ brand, b, loginContactLabel, pw, setPw, showPw, setShowPw, err, loading, submitPassword, nav }) {
  return (
    <div className="anim-fade">
      <div style={{ padding: '8px 4px 16px' }}>
        <div style={{ fontSize: 27, fontWeight: 850, color: '#0F172A', letterSpacing: -0.55, lineHeight: 1.15 }}>Nhập mật khẩu</div>
        <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.55, marginTop: 8 }}>Đăng nhập với <strong style={{ color: '#0F172A' }}>{loginContactLabel}</strong>.</div>
      </div>
      <AuthPanel>
        <div>
          <AuthFieldLabel right={<span style={{ color: b.solid, fontWeight: 750, fontSize: 12 }} className="tap" onClick={() => nav.push('forgot-password')}>Quên mật khẩu?</span>}>Mật khẩu</AuthFieldLabel>
          <Input aria-label="Mật khẩu" name="login-password" value={pw} onChange={(v) => setPw(v.replace(/\D/g,'').slice(0, 8))} type={showPw ? 'text' : 'password'} icon={<Ic.Lock s={18}/>} error={err.pw} placeholder="Mật khẩu 6 số" inputMode="numeric" pattern="[0-9]*" autoComplete="current-password" spellCheck={false} suffix={<button aria-label={showPw ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} type="button" onClick={() => setShowPw(!showPw)} style={{ background: 'none', border: 'none', color: '#94A3B8', padding: 4 }}><Ic.Eye s={18}/></button>}/>
        </div>
        <div style={{ marginTop: 18 }}>
          <PrimaryButton fullWidth onClick={submitPassword} disabled={loading} brand={brand}>
            {loading ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span className="spin" style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%' }}/>Đang đăng nhập…</span> : 'Đăng nhập'}
          </PrimaryButton>
        </div>
      </AuthPanel>
      <AuthNote brand={brand} icon={<Ic.Check s={16}/>} title="Phiên đăng nhập an toàn" body="Mã OTP chỉ dùng khi tạo tài khoản hoặc đặt lại mật khẩu."/>
    </div>
  );
}

Object.assign(window, { LoginScreen });
