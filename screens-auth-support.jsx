function ForgotPasswordScreen({ nav, brand }) {
  const b = getBrand(brand);
  const forgot = useForgotPasswordState(nav);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column' }} className="anim-slide-in">
      <ScreenHeader title="" onBack={() => forgot.step > 0 ? forgot.setStep(forgot.step - 1) : nav.pop()} transparent/>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 110px' }} className="scroll-area">
        {forgot.step < 3 && <div style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: -0.6, lineHeight: 1.15 }}>{forgot.title}</div>}
        <ForgotPasswordStepContent brand={brand} b={b} {...forgot}/>
      </div>
      <ActionBar><PrimaryButton fullWidth onClick={forgot.next} brand={brand}>{forgot.action}</PrimaryButton></ActionBar>
    </div>
  );
}

function useForgotPasswordState(nav) {
  const [step, setStep] = React.useState(0);
  const [contactMode, setContactMode] = React.useState('phone');
  const [contact, setContact] = React.useState('');
  const [otp, setOtp] = React.useState(['', '', '', '']);
  const [pw, setPw] = React.useState('');
  const [confirmPw, setConfirmPw] = React.useState('');
  const [err, setErr] = React.useState({});

  const resetContactMode = (mode) => {
    setContactMode(mode);
    setContact('');
    setErr({});
  };

  const next = () => {
    const e = getForgotPasswordErrors({ step, contact, contactMode, otp, pw, confirmPw });
    setErr(e);
    if (Object.keys(e).length) return;
    setErr({});
    if (step < 3) setStep(step + 1);
    else nav.replace('login');
  };

  const contactText = normalizeContact(contact) || (contactMode === 'email' ? 'email của bạn' : 'số điện thoại của bạn');
  const title = step === 0 ? 'Quên mật khẩu?' : step === 1 ? 'Xác minh OTP' : step === 2 ? 'Tạo mật khẩu mới' : 'Đổi mật khẩu thành công';
  const action = step === 0 ? 'Gửi mã OTP' : step === 1 ? 'Xác nhận OTP' : step === 2 ? 'Đặt lại mật khẩu' : 'Đăng nhập';

  return { step, setStep, contactMode, contact, setContact, resetContactMode, otp, setOtp, pw, setPw, confirmPw, setConfirmPw, err, next, contactText, title, action };
}

function getForgotPasswordErrors({ step, contact, contactMode, otp, pw, confirmPw }) {
  const e = {};
  if (step === 0 && !isValidContact(contact, contactMode)) e.contact = contactError(contactMode);
  if (step === 1 && otp.join('').length < 4) e.otp = 'Vui lòng nhập đủ mã OTP';
  if (step === 2 && !/^\d{6,}$/.test(pw)) e.pw = 'Mật khẩu số tối thiểu 6 chữ số';
  if (step === 2 && confirmPw !== pw) e.confirmPw = 'Mật khẩu nhập lại chưa khớp';
  return e;
}

function ForgotPasswordStepContent(props) {
  if (props.step === 0) return <ForgotContactStep {...props}/>;
  if (props.step === 1) return <ForgotOtpStep {...props}/>;
  if (props.step === 2) return <ForgotPasswordFields {...props}/>;
  return <ForgotSuccessStep {...props}/>;
}

function ForgotContactStep({ brand, contactMode, contact, setContact, resetContactMode, err }) {
  const isEmail = contactMode === 'email';
  return (
    <div className="anim-fade">
      <div style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>Nhập thông tin tài khoản để nhận mã xác thực đặt lại mật khẩu.</div>
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <ContactModeToggle mode={contactMode} onChange={resetContactMode} brand={brand}/>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{contactModeLabel(contactMode)}</div>
          <Input value={contact} onChange={setContact} type={isEmail ? 'email' : 'tel'} inputMode={isEmail ? 'email' : 'tel'} icon={<ContactIcon mode={contactMode}/>} placeholder={contactModeLabel(contactMode)} error={err.contact} autoComplete={isEmail ? 'email' : 'tel'} autoCapitalize="none" autoCorrect="off"/>
        </div>
      </div>
    </div>
  );
}

function ForgotOtpStep({ b, contactText, otp, setOtp, brand, err }) {
  return (
    <div className="anim-fade">
      <div style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>Mã đặt lại mật khẩu đã được gửi tới <strong style={{ color: '#0F172A' }}>{contactText}</strong></div>
      <OtpBoxes otp={otp} setOtp={setOtp} brand={brand}/>
      {err.otp && <div style={{ textAlign: 'center', fontSize: 12, color: '#EF4444', marginTop: 10 }}>{err.otp}</div>}
      <div style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: '#64748B' }}>
        Không nhận được mã? <span style={{ color: b.solid, fontWeight: 700 }} className="tap" onClick={() => setOtp(['1','2','3','4'])}>Gửi lại (00:42)</span>
      </div>
    </div>
  );
}

function ForgotPasswordFields({ pw, setPw, confirmPw, setConfirmPw, err }) {
  return (
    <div className="anim-fade">
      <div style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>Mật khẩu mới chỉ gồm chữ số để đăng nhập nhanh trên điện thoại.</div>
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Input value={pw} onChange={(v) => setPw(v.replace(/\D/g,'').slice(0, 8))} type="password" icon={<Ic.Lock s={18}/>} placeholder="Mật khẩu 6 số" error={err.pw} inputMode="numeric" pattern="[0-9]*" autoComplete="new-password"/>
        <Input value={confirmPw} onChange={(v) => setConfirmPw(v.replace(/\D/g,'').slice(0, 8))} type="password" icon={<Ic.Lock s={18}/>} placeholder="Nhập lại 6 số" error={err.confirmPw} inputMode="numeric" pattern="[0-9]*" autoComplete="new-password"/>
      </div>
    </div>
  );
}

function ForgotSuccessStep({ b, title }) {
  return (
    <div className="anim-fade" style={{ paddingTop: 30, textAlign: 'center' }}>
      <div className="anim-scale" style={{ width: 96, height: 96, borderRadius: 32, background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 16px 40px -10px ${b.grad[0]}80` }}>
        <Ic.Check s={48} c="#fff" w={3.5}/>
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', letterSpacing: -0.5, marginTop: 24, lineHeight: 1.2 }}>{title}</div>
      <div style={{ fontSize: 14, color: '#64748B', marginTop: 10, padding: '0 20px' }}>Bạn có thể đăng nhập lại bằng mật khẩu mới.</div>
    </div>
  );
}

function OtpBoxes({ otp, setOtp, brand }) {
  const b = getBrand(brand);
  return (
    <div style={{ marginTop: 32, display: 'flex', gap: 10, justifyContent: 'center' }}>
      {[0,1,2,3].map((i) => (
        <input key={i} maxLength={1} value={otp[i]} autoFocus={i===0} inputMode="numeric" pattern="[0-9]*"
          onChange={(e) => {
            const nextOtp = [...otp]; nextOtp[i] = e.target.value.replace(/\D/g,''); setOtp(nextOtp);
            if (e.target.value && e.target.nextSibling) e.target.nextSibling.focus();
          }}
          style={{ width: 64, height: 72, borderRadius: 16, border: `2px solid ${otp[i] ? b.solid : '#E2E8F0'}`, textAlign: 'center', fontSize: 28, fontWeight: 800, color: '#0F172A', background: '#F8FAFC', outline: 'none' }}/>
      ))}
    </div>
  );
}

function LegalScreen({ nav, brand, type = 'terms' }) {
  const b = getBrand(brand);
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Chính sách bảo mật' : 'Điều khoản sử dụng';
  const sections = isPrivacy ? privacySections : termsSections;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column' }} className="anim-slide-in">
      <ScreenHeader title={title} onBack={() => nav.pop()}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '18px 18px 110px' }} className="scroll-area">
        <Card style={{ padding: 18 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', letterSpacing: -0.5 }}>{title}</div>
          <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5, marginTop: 8 }}>Cập nhật 16/05/2026 · Áp dụng cho trải nghiệm Agency App prototype.</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button className="tap" onClick={() => nav.replace('legal', { type: 'terms' })} style={{ flex: 1, height: 38, borderRadius: 12, border: 'none', background: !isPrivacy ? b.solid : '#F1F5F9', color: !isPrivacy ? '#fff' : '#475569', fontSize: 13, fontWeight: 700 }}>Điều khoản</button>
            <button className="tap" onClick={() => nav.replace('legal', { type: 'privacy' })} style={{ flex: 1, height: 38, borderRadius: 12, border: 'none', background: isPrivacy ? b.solid : '#F1F5F9', color: isPrivacy ? '#fff' : '#475569', fontSize: 13, fontWeight: 700 }}>Bảo mật</button>
          </div>
        </Card>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sections.map((section, index) => (
            <Card key={section.title} style={{ padding: 16 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 9, background: b.soft, color: b.solid, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{index + 1}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>{section.title}</div>
                  <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.6, marginTop: 6 }}>{section.body}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const termsSections = [
  { title: 'Tài khoản và xác thực', body: 'Người dùng chịu trách nhiệm về thông tin đăng ký, bảo mật mật khẩu và các thao tác phát sinh từ tài khoản của mình.' },
  { title: 'Đơn hàng và thanh toán', body: 'Giá, phí, ưu đãi và trạng thái đơn hàng được hiển thị tại thời điểm giao dịch. Các bước xác nhận thanh toán cần được hoàn tất theo hướng dẫn trong ứng dụng.' },
  { title: 'Chương trình đại lý', body: 'Hoa hồng, cấp bậc và quyền lợi đại lý phụ thuộc vào gói tham gia, điều kiện vận hành và chính sách được công bố trong từng thời kỳ.' },
  { title: 'Giới hạn sử dụng', body: 'Không sử dụng nền tảng để gian lận đơn hàng, spam giới thiệu, giả mạo thông tin hoặc vi phạm quyền lợi của khách hàng và đối tác.' },
];

const privacySections = [
  { title: 'Dữ liệu thu thập', body: 'Agency có thể thu thập số điện thoại, email, thông tin đơn hàng, địa chỉ giao hàng và dữ liệu cần thiết để vận hành tài khoản.' },
  { title: 'Mục đích sử dụng', body: 'Dữ liệu được dùng để xác thực, xử lý đơn hàng, tính hoa hồng, hỗ trợ khách hàng và cải thiện trải nghiệm sản phẩm.' },
  { title: 'Bảo vệ thông tin', body: 'Thông tin cá nhân cần được lưu trữ, phân quyền và truy cập theo nguyên tắc tối thiểu cần thiết khi triển khai hệ thống thật.' },
  { title: 'Quyền của người dùng', body: 'Người dùng có thể yêu cầu cập nhật, kiểm tra hoặc xóa dữ liệu theo chính sách vận hành và quy định pháp luật áp dụng.' },
];

Object.assign(window, { ForgotPasswordScreen, LegalScreen });
