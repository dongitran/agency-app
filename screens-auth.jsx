// screens-auth.jsx — Welcome, Login, Signup

function WelcomeScreen({ nav, brand }) {
  const b = getBrand(brand);
  return (
    <div style={{ position: 'absolute', inset: 0, color: '#fff', overflow: 'hidden' }} className="anim-fade">
      {/* gradient bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(160deg, ${b.grad[0]} 0%, ${b.grad[1]} 65%, ${b.accent2} 110%)`,
      }} />
      {/* decorative blobs */}
      <div style={{ position: 'absolute', top: -40, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', filter: 'blur(8px)' }} />
      <div style={{ position: 'absolute', bottom: 200, left: -80, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

      {/* status bar (white) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5 }}>
        <IOSStatusBar dark={true} />
      </div>

      {/* content */}
      <div className="screen-hero" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '80px 28px 30px' }}>
        {/* logo mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(20px)',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="#fff" strokeWidth="2"/>
              <circle cx="12" cy="14" r="2.5" fill="#fff"/>
              <path d="M12 9v2M12 17v2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Agency</div>
        </div>

        {/* phone preview mock */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 240, padding: '20px 18px', borderRadius: 24,
            background: 'rgba(255,255,255,0.16)',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            transform: 'rotate(-4deg)',
          }}>
            <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600 }}>Hoa hồng tháng này</div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.8, marginTop: 4 }}>12.480.000đ</div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 6, fontSize: 11, fontWeight: 700, color: '#A7F3D0' }}>
              <Ic.ArrowUp s={11} c="#A7F3D0"/> +24% so với tháng trước
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
              {[0.4, 0.6, 0.5, 0.85, 0.7, 1, 0.9].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: 36 * h, alignSelf: 'flex-end',
                  background: 'rgba(255,255,255,0.5)', borderRadius: 3,
                }}/>
              ))}
            </div>
          </div>
          <div style={{
            position: 'absolute', top: 30, right: -10, padding: '10px 14px',
            borderRadius: 14, background: '#fff', color: b.solid,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)', transform: 'rotate(6deg)',
            display: 'flex', gap: 8, alignItems: 'center',
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: b.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: b.solid }}>
              <Ic.Sim s={18} c={b.solid}/>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Đơn mới</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>SIM 5G · 299k</div>
            </div>
          </div>
        </div>

        {/* copy */}
        <div style={{ paddingBottom: 20 }}>
          <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.8 }}>
            SIM phong thủy.<br/>Số hợp tuổi.<br/>Lộc cả đời.
          </div>
          <div style={{ fontSize: 14, opacity: 0.85, marginTop: 12, lineHeight: 1.55 }}>
            Chọn SIM theo tuổi · mệnh · tổng nút. Học phong thủy số, tư duy & kinh doanh để xây team đại lý F1·F2·F3.
          </div>
        </div>

        {/* buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => nav.push('signup')} className="tap" style={{
            height: 54, borderRadius: 16, border: 'none',
            background: '#fff', color: b.solid,
            fontSize: 16, fontWeight: 700, letterSpacing: -0.2,
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
          }}>Bắt đầu — đăng ký miễn phí</button>
          <button onClick={() => nav.push('login')} className="tap" style={{
            height: 54, borderRadius: 16,
            background: 'rgba(255,255,255,0.18)',
            border: '1.5px solid rgba(255,255,255,0.32)',
            color: '#fff', fontSize: 15, fontWeight: 600,
            backdropFilter: 'blur(12px)',
          }}>Tôi đã có tài khoản</button>
        </div>
      </div>
    </div>
  );
}

const compactPhone = (value) => value.replace(/\s/g, '');
const normalizeContact = (value) => value.trim();
const isEmailContact = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeContact(value));
const isPhoneContact = (value) => /^0\d{9,10}$/.test(compactPhone(value));
const isValidContact = (value, mode) => mode === 'email' ? isEmailContact(value) : isPhoneContact(value);
const contactModeLabel = (mode) => mode === 'email' ? 'Email' : 'Số điện thoại';
const contactError = (mode) => mode === 'email' ? 'Email không hợp lệ' : 'Số điện thoại không hợp lệ';

function ContactModeToggle({ mode, onChange, brand }) {
  const b = getBrand(brand);
  const items = [
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'email', label: 'Email' },
  ];
  return (
    <div role="tablist" aria-label="Chọn phương thức xác thực" style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4,
      padding: 4, borderRadius: 14, background: '#F1F5F9',
    }}>
      {items.map((item) => {
        const active = mode === item.key;
        return (
          <button key={item.key} type="button" role="tab" aria-selected={active} onClick={() => onChange(item.key)} className="tap" style={{
            height: 38, border: 'none', borderRadius: 11,
            background: active ? '#fff' : 'transparent',
            color: active ? b.solid : '#64748B',
            fontSize: 13, fontWeight: 700,
            boxShadow: active ? '0 4px 14px rgba(15,23,42,0.08)' : 'none',
          }}>{item.label}</button>
        );
      })}
    </div>
  );
}

function LoginScreen({ nav, onLogin, brand }) {
  const b = getBrand(brand);
  const [contactMode, setContactMode] = React.useState('phone');
  const [contact, setContact] = React.useState('0912 345 678');
  const [pw, setPw] = React.useState('123456');
  const [showPw, setShowPw] = React.useState(false);
  const [err, setErr] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const changeContactMode = (mode) => {
    setContactMode(mode);
    setContact('');
    setErr({});
  };

  const submit = () => {
    const e = {};
    if (!isValidContact(contact, contactMode)) e.contact = contactError(contactMode);
    if (!/^\d{6,}$/.test(pw)) e.pw = 'Mật khẩu số tối thiểu 6 chữ số';
    setErr(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 700);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column' }} className="anim-slide-in">
      <ScreenHeader title="" onBack={() => nav.pop()} transparent/>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 30px' }} className="scroll-area">
        <div style={{ fontSize: 30, fontWeight: 800, color: '#0F172A', letterSpacing: -0.8, lineHeight: 1.15 }}>Chào mừng<br/>trở lại 👋</div>
        <div style={{ fontSize: 14, color: '#64748B', marginTop: 8 }}>Đăng nhập để tiếp tục quản lý đơn hàng và hoa hồng đại lý.</div>

        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ContactModeToggle mode={contactMode} onChange={changeContactMode} brand={brand}/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', marginBottom: 8 }}>{contactModeLabel(contactMode)}</div>
            <Input value={contact} onChange={setContact} type={contactMode === 'email' ? 'email' : 'tel'} inputMode={contactMode === 'email' ? 'email' : 'tel'} icon={contactMode === 'email' ? <Ic.Mail s={18}/> : <Ic.Phone s={18}/>} placeholder={contactModeLabel(contactMode)} error={err.contact} autoComplete={contactMode === 'email' ? 'email' : 'tel'} autoCapitalize="none" autoCorrect="off"/>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>Mật khẩu</span>
              <span style={{ color: b.solid, fontWeight: 600, fontSize: 12 }} className="tap">Quên mật khẩu?</span>
            </div>
            <Input value={pw} onChange={(v) => setPw(v.replace(/\D/g,'').slice(0, 8))} type={showPw ? 'text' : 'password'} icon={<Ic.Lock s={18}/>} error={err.pw}
              placeholder="Mật khẩu 6 số" inputMode="numeric" pattern="[0-9]*" autoComplete="current-password"
              suffix={<button onClick={() => setShowPw(!showPw)} style={{ background: 'none', border: 'none', color: '#94A3B8', padding: 4 }}><Ic.Eye s={18}/></button>}/>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <PrimaryButton fullWidth onClick={submit} disabled={loading} brand={brand}>
            {loading ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span className="spin" style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%' }}/>Đang đăng nhập…</span> : 'Đăng nhập'}
          </PrimaryButton>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#E2E8F0' }}/>
          <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>HOẶC</div>
          <div style={{ flex: 1, height: 1, background: '#E2E8F0' }}/>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { n: 'Zalo', c: '#0068FF', icon: 'Z' },
            { n: 'Google', c: '#EA4335', icon: 'G' },
            { n: 'Apple', c: '#000', icon: '' },
          ].map((s) => (
            <button key={s.n} className="tap" style={{
              flex: 1, height: 50, borderRadius: 14, border: '1.5px solid #E2E8F0',
              background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              color: '#0F172A', fontSize: 14, fontWeight: 600,
            }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: s.c, color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
              {s.n}
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: '#64748B' }}>
          Chưa có tài khoản? <span className="tap" onClick={() => nav.replace('signup')} style={{ color: b.solid, fontWeight: 700 }}>Đăng ký ngay</span>
        </div>
      </div>
    </div>
  );
}

function SignupScreen({ nav, onLogin, brand }) {
  const b = getBrand(brand);
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
    const e = {};
    if (step === 0) {
      if (!isValidContact(data.contact, contactMode)) e.contact = contactError(contactMode);
      if (!data.acceptedTerms) e.terms = 'Vui lòng đồng ý điều khoản để tiếp tục';
    }
    if (step === 1 && data.otp.join('').length < 4) e.otp = 'Vui lòng nhập đủ mã OTP';
    if (step === 2) {
      if (!/^\d{6,}$/.test(data.pw)) e.pw = 'Mật khẩu số tối thiểu 6 chữ số';
      if (data.confirmPw !== data.pw) e.confirmPw = 'Mật khẩu nhập lại chưa khớp';
    }
    setErr(e);
    if (Object.keys(e).length) return;
    setErr({});
    if (step < 3) setStep(step + 1);
    else onLogin();
  };

  const otpContactLabel = normalizeContact(data.contact) || (contactMode === 'email' ? 'email của bạn' : 'số điện thoại của bạn');

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column' }} className="anim-slide-in">
      <ScreenHeader title="" onBack={() => step > 0 ? setStep(step - 1) : nav.pop()} transparent/>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 110px' }} className="scroll-area">
        {/* progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
          {[0,1,2,3].map((i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? b.solid : '#E2E8F0', transition: 'background .2s' }}/>
          ))}
        </div>

        {step === 0 && (
          <div className="anim-fade">
            <div style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: -0.6, lineHeight: 1.15 }}>Tạo tài khoản<br/>Agency</div>
            <div style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>Bước 1/4 · Xác thực số điện thoại hoặc email</div>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ContactModeToggle mode={contactMode} onChange={changeContactMode} brand={brand}/>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{contactModeLabel(contactMode)}</div>
                <Input value={data.contact} onChange={(v) => setData({...data, contact: v})} type={contactMode === 'email' ? 'email' : 'tel'} inputMode={contactMode === 'email' ? 'email' : 'tel'} icon={contactMode === 'email' ? <Ic.Mail s={18}/> : <Ic.Phone s={18}/>} placeholder={contactModeLabel(contactMode)} error={err.contact} autoComplete={contactMode === 'email' ? 'email' : 'tel'} autoCapitalize="none" autoCorrect="off"/>
              </div>
            </div>

            <button type="button" role="checkbox" aria-checked={data.acceptedTerms} onClick={() => setData({...data, acceptedTerms: !data.acceptedTerms})} className="tap" style={{ width: '100%', marginTop: 20, padding: 14, background: '#F8FAFC', borderRadius: 14, border: err.terms ? '1.5px solid #DC2626' : 'none', display: 'flex', gap: 10, textAlign: 'left' }}>
              <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${data.acceptedTerms ? b.solid : '#E2E8F0'}`, background: data.acceptedTerms ? b.solid : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {data.acceptedTerms && <Ic.Check s={12} c="#fff" w={3}/>}
              </div>
              <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                Tôi đồng ý với <span style={{ color: b.solid, fontWeight: 600 }}>Điều khoản sử dụng</span> và <span style={{ color: b.solid, fontWeight: 600 }}>Chính sách bảo mật</span> của Agency.
              </div>
            </button>
            {err.terms && <div style={{ fontSize: 11, color: '#DC2626', marginTop: 6, marginLeft: 4 }}>{err.terms}</div>}
          </div>
        )}

        {step === 1 && (
          <div className="anim-fade">
            <div style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: -0.6, lineHeight: 1.15 }}>Xác minh OTP</div>
            <div style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>Mã đã được gửi tới <strong style={{ color: '#0F172A' }}>{otpContactLabel}</strong></div>

            <div style={{ marginTop: 32, display: 'flex', gap: 10, justifyContent: 'center' }}>
              {[0,1,2,3].map((i) => (
                <input key={i} maxLength={1} value={data.otp[i]} autoFocus={i===0} inputMode="numeric" pattern="[0-9]*"
                  onChange={(e) => {
                    const o = [...data.otp]; o[i] = e.target.value.replace(/\D/g,''); setData({...data, otp: o});
                    if (e.target.value && e.target.nextSibling) e.target.nextSibling.focus();
                  }}
                  style={{
                    width: 64, height: 72, borderRadius: 16,
                    border: `2px solid ${data.otp[i] ? b.solid : '#E2E8F0'}`,
                    textAlign: 'center', fontSize: 28, fontWeight: 800,
                    color: '#0F172A', background: '#F8FAFC', outline: 'none',
                  }}/>
              ))}
            </div>
            {err.otp && <div style={{ textAlign: 'center', fontSize: 12, color: '#EF4444', marginTop: 10 }}>{err.otp}</div>}

            <div style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: '#64748B' }}>
              Không nhận được mã? <span style={{ color: b.solid, fontWeight: 700 }} className="tap" onClick={() => setData({...data, otp: ['1','2','3','4']})}>Gửi lại (00:42)</span>
            </div>
            <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: '#94A3B8' }}>Demo: bấm "Gửi lại" để tự điền mã</div>
          </div>
        )}

        {step === 2 && (
          <div className="anim-fade">
            <div style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: -0.6, lineHeight: 1.15 }}>Tạo mật khẩu</div>
            <div style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>Bước 3/4 · Mật khẩu số dùng để đăng nhập nhanh trên điện thoại.</div>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Mật khẩu số</div>
                <Input value={data.pw} onChange={(v) => setData({...data, pw: v.replace(/\D/g,'').slice(0, 8)})} type="password" icon={<Ic.Lock s={18}/>} placeholder="Mật khẩu 6 số" error={err.pw} inputMode="numeric" pattern="[0-9]*" autoComplete="new-password"/>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Nhập lại mật khẩu</div>
                <Input value={data.confirmPw} onChange={(v) => setData({...data, confirmPw: v.replace(/\D/g,'').slice(0, 8)})} type="password" icon={<Ic.Lock s={18}/>} placeholder="Nhập lại 6 số" error={err.confirmPw} inputMode="numeric" pattern="[0-9]*" autoComplete="new-password"/>
              </div>
            </div>

            <Card style={{ marginTop: 18, padding: 14, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>Mật khẩu chỉ gồm chữ số để thao tác nhanh trên mobile. Khi triển khai thật, bước này cần thêm chính sách bảo mật và khóa thử sai.</div>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="anim-fade" style={{ paddingTop: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="anim-scale" style={{
                width: 96, height: 96, borderRadius: 32,
                background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 16px 40px -10px ${b.grad[0]}80`,
              }}>
                <Ic.Check s={48} c="#fff" w={3.5}/>
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', letterSpacing: -0.5, textAlign: 'center', marginTop: 24, lineHeight: 1.2 }}>Tạo tài khoản<br/>thành công!</div>
            <div style={{ fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 10, padding: '0 20px' }}>
              Tài khoản đã sẵn sàng. Khám phá SIM, khóa học và nâng cấp lên đại lý để nhận hoa hồng.
            </div>

            <Card style={{ marginTop: 28, padding: 18, background: b.soft, border: `1px solid ${b.solid}20` }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: b.solid, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Ic.Gift s={20} c="#fff"/>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Ưu đãi người dùng mới</div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 4, lineHeight: 1.5 }}>Giảm <strong>50.000đ</strong> cho đơn SIM đầu tiên và mã khóa học miễn phí.</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <ActionBar>
        <PrimaryButton fullWidth onClick={next} brand={brand}>
          {step === 0 ? 'Gửi mã OTP' : step === 1 ? 'Xác nhận OTP' : step === 2 ? 'Tạo tài khoản' : 'Vào ứng dụng'}
        </PrimaryButton>
      </ActionBar>
    </div>
  );
}

Object.assign(window, { WelcomeScreen, LoginScreen, SignupScreen });
