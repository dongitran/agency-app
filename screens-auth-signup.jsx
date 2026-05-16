function SignupScreen({ nav, onLogin, brand }) {
  const [step, setStep] = React.useState(0);
  const [contactMode, setContactMode] = React.useState('phone');
  const [data, setData] = React.useState({ contact: '', pw: '', confirmPw: '', acceptedTerms: false, otp: ['', '', '', ''] });
  const [err, setErr] = React.useState({});

  const changeContactMode = (mode) => {
    setContactMode(mode);
    setData((current) => ({...current, contact: ''}));
    setErr({});
  };

  const next = () => {
    const e = getSignupErrors({ step, data, contactMode });
    setErr(e);
    if (Object.keys(e).length) return;
    setErr({});
    if (step < 3) setStep(step + 1);
    else onLogin();
  };

  return (
    <AuthShell brand={brand} title="Tạo tài khoản" onBack={() => step > 0 ? setStep(step - 1) : nav.pop()} action={<ActionBar><PrimaryButton fullWidth onClick={next} brand={brand}>{signupActionLabel(step)}</PrimaryButton></ActionBar>}>
      <SignupStepContent brand={brand} nav={nav} step={step} data={data} setData={setData} err={err} contactMode={contactMode} changeContactMode={changeContactMode}/>
    </AuthShell>
  );
}

function getSignupErrors({ step, data, contactMode }) {
  const e = {};
  if (step === 0 && !isValidContact(data.contact, contactMode)) e.contact = contactError(contactMode);
  if (step === 0 && !data.acceptedTerms) e.terms = 'Vui lòng đồng ý điều khoản để tiếp tục';
  if (step === 1 && data.otp.join('').length < 4) e.otp = 'Vui lòng nhập đủ mã OTP';
  if (step === 2 && !/^\d{6}$/.test(data.pw)) e.pw = 'Mật khẩu gồm 6 chữ số';
  if (step === 2 && data.confirmPw !== data.pw) e.confirmPw = 'Mật khẩu nhập lại chưa khớp';
  return e;
}

function signupActionLabel(step) {
  if (step === 0) return 'Gửi mã OTP';
  if (step === 1) return 'Xác nhận OTP';
  if (step === 2) return 'Tạo tài khoản';
  return 'Vào ứng dụng';
}

function SignupStepContent(props) {
  if (props.step === 0) return <SignupContactStep {...props}/>;
  if (props.step === 1) return <SignupOtpStep {...props}/>;
  if (props.step === 2) return <SignupPasswordStep {...props}/>;
  return <SignupSuccessStep {...props}/>;
}

function SignupContactStep({ brand, nav, data, setData, err, contactMode, changeContactMode }) {
  const b = getBrand(brand);
  return (
    <div className="anim-fade">
      <div style={{ height: 8 }}/>
      <AuthProgress step={1} total={4} brand={brand}/>
      <AuthPanel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ContactModeToggle mode={contactMode} onChange={changeContactMode} brand={brand}/>
          <div>
            <AuthFieldLabel>{contactModeLabel(contactMode)}</AuthFieldLabel>
            <Input aria-label={contactModeLabel(contactMode)} name="signup-contact" value={data.contact} onChange={(contact) => setData({...data, contact})} type={contactMode === 'email' ? 'email' : 'tel'} inputMode={contactMode === 'email' ? 'email' : 'tel'} icon={<ContactIcon mode={contactMode}/>} placeholder={contactModeLabel(contactMode)} error={err.contact} autoComplete={contactMode === 'email' ? 'email' : 'tel'} autoCapitalize="none" autoCorrect="off" spellCheck={false}/>
          </div>
        </div>
        <button type="button" role="checkbox" aria-checked={data.acceptedTerms} onClick={() => setData({...data, acceptedTerms: !data.acceptedTerms})} className="tap" style={{ width: '100%', marginTop: 16, padding: 14, background: data.acceptedTerms ? `${b.solid}0D` : '#F8FAFC', borderRadius: 16, border: err.terms ? '1.5px solid #DC2626' : `1px solid ${data.acceptedTerms ? `${b.solid}26` : '#E2E8F0'}`, display: 'flex', gap: 10, textAlign: 'left' }}>
          <span style={{ width: 20, height: 20, borderRadius: 7, border: `2px solid ${data.acceptedTerms ? b.solid : '#CBD5E1'}`, background: data.acceptedTerms ? b.solid : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{data.acceptedTerms && <Ic.Check s={12} c="#fff" w={3}/>}</span>
          <span style={{ fontSize: 12, color: '#475569', lineHeight: 1.55 }}>Tôi đồng ý với <span className="tap" onClick={(e) => { e.stopPropagation(); nav.push('legal', { type: 'terms' }); }} style={{ color: b.solid, fontWeight: 750 }}>Điều khoản sử dụng</span> và <span className="tap" onClick={(e) => { e.stopPropagation(); nav.push('legal', { type: 'privacy' }); }} style={{ color: b.solid, fontWeight: 750 }}>Chính sách bảo mật</span> của Agency.</span>
        </button>
        {err.terms && <div style={{ fontSize: 11, color: '#DC2626', marginTop: 6, marginLeft: 4 }}>{err.terms}</div>}
      </AuthPanel>
    </div>
  );
}

function SignupOtpStep({ brand, data, setData, err, contactMode }) {
  const contactLabel = normalizeContact(data.contact) || (contactMode === 'email' ? 'email của bạn' : 'số điện thoại của bạn');
  return (
    <div className="anim-fade">
      <AuthHero brand={brand} title="Nhập mã OTP" subtitle={<span>Mã xác thực đã được gửi tới <strong style={{ color: '#0F172A' }}>{contactLabel}</strong>.</span>}/>
      <AuthProgress step={2} total={4} brand={brand}/>
      <AuthPanel style={{ textAlign: 'center' }}>
        <OtpInputs data={data} setData={setData} brand={brand}/>
        {err.otp && <div style={{ fontSize: 12, color: '#EF4444', marginTop: 10 }}>{err.otp}</div>}
        <div style={{ marginTop: 22, fontSize: 13, color: '#64748B' }}>Không nhận được mã? <span style={{ color: getBrand(brand).solid, fontWeight: 800 }} className="tap" onClick={() => setData({...data, otp: ['1','2','3','4']})}>Gửi lại (00:42)</span></div>
      </AuthPanel>
    </div>
  );
}

function OtpInputs({ data, setData, brand }) {
  const b = getBrand(brand);
  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      {[0,1,2,3].map((i) => (
        <input key={i} aria-label={`Mã OTP số ${i + 1}`} name={`signup-otp-${i + 1}`} maxLength={1} value={data.otp[i]} autoFocus={i===0} inputMode="numeric" pattern="[0-9]*" onChange={(e) => { const o = [...data.otp]; o[i] = e.target.value.replace(/\D/g,''); setData({...data, otp: o}); if (e.target.value && e.target.nextSibling) e.target.nextSibling.focus(); }} style={{ width: 58, height: 66, borderRadius: 18, border: `2px solid ${data.otp[i] ? b.solid : '#E2E8F0'}`, textAlign: 'center', fontSize: 26, fontWeight: 850, color: '#0F172A', background: '#F8FAFC', outline: 'none' }}/>
      ))}
    </div>
  );
}

function SignupPasswordStep({ brand, data, setData, err }) {
  return (
    <div className="anim-fade">
      <AuthHero brand={brand} eyebrow="Bảo mật" title="Tạo mật khẩu" subtitle="Dùng mật khẩu số để đăng nhập nhanh trên điện thoại."/>
      <AuthProgress step={3} total={4} brand={brand}/>
      <AuthPanel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div><AuthFieldLabel>Mật khẩu</AuthFieldLabel><Input aria-label="Mật khẩu" name="signup-password" value={data.pw} onChange={(pw) => setData({...data, pw: pw.replace(/\D/g,'').slice(0, 6)})} type="password" icon={<Ic.Lock s={18}/>} placeholder="Mật khẩu 6 số" error={err.pw} inputMode="numeric" pattern="[0-9]*" maxLength={6} autoComplete="new-password" spellCheck={false}/></div>
          <div><AuthFieldLabel>Nhập lại mật khẩu</AuthFieldLabel><Input aria-label="Nhập lại mật khẩu" name="signup-confirm-password" value={data.confirmPw} onChange={(confirmPw) => setData({...data, confirmPw: confirmPw.replace(/\D/g,'').slice(0, 6)})} type="password" icon={<Ic.Lock s={18}/>} placeholder="Nhập lại 6 số" error={err.confirmPw} inputMode="numeric" pattern="[0-9]*" maxLength={6} autoComplete="new-password" spellCheck={false}/></div>
        </div>
      </AuthPanel>
    </div>
  );
}

function SignupSuccessStep({ brand }) {
  const b = getBrand(brand);
  return (
    <div className="anim-fade" style={{ paddingTop: 12, textAlign: 'center' }}>
      <AuthProgress step={4} total={4} brand={brand}/>
      <div className="anim-scale" style={{ width: 104, height: 104, borderRadius: 34, margin: '34px auto 0', background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 18px 44px -14px ${b.grad[0]}99` }}>
        <Ic.Check s={50} c="#fff" w={3.5}/>
      </div>
      <div style={{ fontSize: 27, fontWeight: 850, color: '#0F172A', letterSpacing: -0.5, marginTop: 24, lineHeight: 1.16 }}>Tạo tài khoản<br/>thành công</div>
      <div style={{ fontSize: 14, color: '#64748B', marginTop: 10, padding: '0 20px', lineHeight: 1.55 }}>Tài khoản đã sẵn sàng để khám phá SIM, khóa học và chương trình đại lý.</div>
      <AuthNote brand={brand} icon={<Ic.Gift s={16}/>} title="Ưu đãi người dùng mới" body="Giảm 50.000đ cho đơn SIM đầu tiên và mở quyền lưu thông tin tư vấn."/>
    </div>
  );
}

Object.assign(window, { SignupScreen });
