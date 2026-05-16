// screens-auth.jsx — welcome and shared auth helpers

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

Object.assign(window, { WelcomeScreen, ContactModeToggle, compactPhone, normalizeContact, isValidContact, contactModeLabel, contactError });
