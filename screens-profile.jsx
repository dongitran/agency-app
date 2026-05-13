// screens-profile.jsx

function ProfileScreen({ nav, user, brand, onLogout }) {
  const b = getBrand(brand);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', overflow: 'auto', paddingBottom: 100 }} className="scroll-area anim-fade">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5 }}><IOSStatusBar dark={true}/></div>
      <div className="screen-hero" style={{ background: `linear-gradient(160deg, ${b.grad[0]}, ${b.grad[1]})`, padding: '64px 18px 80px', color: '#fff', borderRadius: '0 0 28px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4 }}>Tài khoản</div>
          <button className="tap" style={{...btnGlass, background: 'rgba(255,255,255,0.2)'}}><Ic.Settings s={18} c="#fff"/></button>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 22, position: 'relative' }}>
          <Avatar name={user.name} size={64}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.3 }}>{user.name}</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>{user.phone} · {user.email}</div>
            <div style={{ marginTop: 6 }}><Badge color="amber">{user.isAgent ? `Đại lý ${user.agentTier}` : 'Người dùng'}</Badge></div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 18px', marginTop: -50, position: 'relative' }}>
        <Card style={{ padding: 14, display: 'flex' }}>
          {[
            { l: 'Số dư ví', v: vnd(user.balance), c: b.solid },
            { l: 'Đơn hàng', v: '14', c: '#10B981' },
            { l: 'Voucher', v: '3', c: '#F59E0B' },
          ].map((s, i, arr) => (
            <React.Fragment key={s.l}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: s.c, letterSpacing: -0.3 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{s.l}</div>
              </div>
              {i < arr.length - 1 && <div style={{ width: 1, background: '#E2E8F0' }}/>}
            </React.Fragment>
          ))}
        </Card>
      </div>

      <div style={{ padding: '18px 18px 0' }}>
        <SectionHead title="Quản lý"/>
        <Card style={{ overflow: 'hidden' }}>
          {[
            { l: 'Hồ sơ cá nhân',         sub: `${user.name} · ${user.email}`,  i: <Ic.User s={22}/>,   c: '#3B82F6', to: 'profile-edit' },
            { l: 'Hợp đồng đã ký',       sub: '2 hợp đồng · Đang hiệu lực',      i: <Ic.Doc s={22}/>,    c: '#059669', to: 'contracts' },
            { l: 'Địa chỉ giao hàng',     sub: '3 địa chỉ · Mặc định: Nhà',     i: <Ic.Sim s={22}/>,    c: '#10B981', to: 'addresses' },
            { l: 'Phương thức thanh toán', sub: 'Vietcombank · ••••4789',        i: <Ic.Wallet s={22}/>, c: '#F59E0B', to: 'payment-methods' },
            { l: 'Đổi mật khẩu',          sub: 'Đã đổi 14 ngày trước',          i: <Ic.Lock s={22}/>,   c: '#8B5CF6', to: 'change-password' },
          ].map((r, i, arr) => <MenuRow key={r.l} row={r} last={i === arr.length-1} onClick={() => nav.push(r.to)}/>)}
        </Card>
      </div>

      <div style={{ padding: '18px 18px 0' }}>
        <SectionHead title="Đại lý"/>
        <Card style={{ overflow: 'hidden' }}>
          {[
            user.isAgent
              ? { l: 'Dashboard đại lý',     sub: `Cấp ${user.agentTier} · F1 20% · F2 8%`, i: <Ic.Crown s={22}/>, c: '#F59E0B', to: 'agent-dashboard', badge: { l: 'Active', color: 'green' } }
              : { l: 'Đăng ký làm đại lý',   sub: 'Nhận hoa hồng F1·F2·F3 đến 25%',         i: <Ic.Crown s={22}/>, c: '#F59E0B', to: 'agent-packages', badge: { l: 'Mới', color: 'red' } },
            { l: 'Link giới thiệu của tôi',  sub: `simplus.vn/r/${user.refCode}`,            i: <Ic.Share s={22}/>, c: '#0EA5E9', to: 'agent-referral' },
            { l: 'Team & cây đại lý',        sub: '32 thành viên · 3 cấp',                   i: <Ic.Users s={22}/>, c: '#10B981', to: 'agent-team' },
            { l: 'Lịch sử mua gói đại lý',   sub: '2 giao dịch · 1 đang hiệu lực',           i: <Ic.Doc s={22}/>,   c: '#8B5CF6', to: 'agent-history' },
            { l: 'Yêu cầu rút tiền',         sub: `${vnd(user.balance)} khả dụng`,           i: <Ic.Trend s={22}/>, c: '#EC4899', to: 'wallet' },
          ].map((r, i, arr) => <MenuRow key={r.l} row={r} last={i === arr.length-1} onClick={() => nav.push(r.to)}/>)}
        </Card>
      </div>

      <div style={{ padding: '18px 18px 0' }}>
        <button onClick={onLogout} className="tap" style={{ width: '100%', padding: 14, borderRadius: 14, background: '#fff', border: '1.5px solid #FECACA', color: '#DC2626', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Ic.Logout s={18} c="#DC2626"/> Đăng xuất
        </button>
        <div style={{ textAlign: 'center', fontSize: 11, color: '#94A3B8', marginTop: 14 }}>SimPlus v1.0 · Build 2026.05.12</div>
      </div>
    </div>
  );
}

function MenuRow({ row, last, onClick }) {
  return (
    <div onClick={onClick} className="tap" style={{
      padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12,
      borderBottom: last ? 'none' : '1px solid #F1F5F9',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: `linear-gradient(135deg, ${row.c}22, ${row.c}12)`,
        color: row.c, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, position: 'relative',
        boxShadow: `inset 0 0 0 1px ${row.c}25`,
      }}>
        {row.i}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{row.l}</span>
          {row.badge && <Badge color={row.badge.color}>{row.badge.l}</Badge>}
        </div>
        {row.sub && (
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {row.sub}
          </div>
        )}
      </div>
      <Ic.Chevron s={14} c="#94A3B8"/>
    </div>
  );
}

// === Quản lý sub-screens ===

function PField({ label, required, children, hint }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
        {label}{required && <span style={{ color: '#DC2626' }}> *</span>}
      </div>
      {children}
      {hint && <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

function PInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      inputMode={type === 'number' ? 'numeric' : 'text'}
      style={{ width: '100%', height: 46, padding: '0 14px', borderRadius: 10, background: '#fff', border: '1.5px solid #E2E8F0', color: '#0F172A', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
    />
  );
}

// 1) Hồ sơ cá nhân
function ProfileEditScreen({ nav, brand, user, setUser, showToast }) {
  const b = getBrand(brand);
  const [data, setData] = React.useState({
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    birthDate: user.birthDate || '15/08/1990',
    gender: user.gender || 'male',
  });
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const valid = data.name.trim() && data.phone.trim() && data.email.trim();

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 100 }} className="anim-slide-in">
      <ScreenHeader title="Hồ sơ cá nhân" onBack={() => nav.pop()}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        <Card style={{ padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Avatar name={data.name || 'A'} size={84}/>
          <button onClick={() => showToast && showToast('Upload ảnh đại diện')} className="tap" style={{ padding: '6px 14px', borderRadius: 999, border: `1.5px solid ${b.solid}`, background: '#fff', color: b.solid, fontSize: 12, fontWeight: 700 }}>
            Đổi ảnh
          </button>
        </Card>

        <Card style={{ padding: 14 }}>
          <PField label="Họ và tên" required>
            <PInput value={data.name} onChange={(v) => set('name', v)} placeholder="Nguyễn Văn A"/>
          </PField>
          <PField label="Số điện thoại" required>
            <PInput value={data.phone} onChange={(v) => set('phone', v)} placeholder="09xx xxx xxx" type="tel"/>
          </PField>
          <PField label="Email" required>
            <PInput value={data.email} onChange={(v) => set('email', v)} placeholder="abc@gmail.com"/>
          </PField>
          <PField label="Ngày sinh">
            <PInput value={data.birthDate} onChange={(v) => set('birthDate', v)} placeholder="dd/mm/yyyy"/>
          </PField>
          <PField label="Giới tính">
            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 10, padding: 3 }}>
              {[{ k: 'male', l: '♂ Nam' }, { k: 'female', l: '♀ Nữ' }, { k: 'other', l: 'Khác' }].map(g => {
                const a = data.gender === g.k;
                return <button key={g.k} onClick={() => set('gender', g.k)} className="tap" style={{ flex: 1, height: 36, borderRadius: 8, border: 'none', background: a ? '#fff' : 'transparent', color: a ? b.solid : '#64748B', fontSize: 12, fontWeight: 700 }}>{g.l}</button>;
              })}
            </div>
          </PField>
        </Card>
      </div>
      <ActionBar>
        <PrimaryButton fullWidth brand={brand} disabled={!valid} onClick={() => { setUser({ ...user, ...data }); showToast && showToast('Đã cập nhật hồ sơ'); nav.pop(); }}>Lưu thay đổi</PrimaryButton>
      </ActionBar>
    </div>
  );
}

// 2) Sổ địa chỉ giao hàng
const MOCK_ADDRESSES = [
  { id: 'a1', name: 'Nguyễn Văn A', phone: '0901 234 567', address: 'Số 12 đường Lê Lợi, phường Bến Nghé, quận 1', city: 'TP. Hồ Chí Minh', isDefault: true, label: 'Nhà' },
  { id: 'a2', name: 'Nguyễn Văn A', phone: '0901 234 567', address: 'Tầng 8, tòa Bitexco, 2 Hải Triều, phường Bến Nghé, quận 1', city: 'TP. Hồ Chí Minh', isDefault: false, label: 'Công ty' },
  { id: 'a3', name: 'Trần Thị B (chị)', phone: '0987 654 321', address: '45 đường Trần Phú, phường Lộc Thọ', city: 'TP. Nha Trang', isDefault: false, label: 'Nhà chị' },
];

function AddressBookScreen({ nav, brand, showToast }) {
  const b = getBrand(brand);
  const [list, setList] = React.useState(MOCK_ADDRESSES);
  const setDefault = (id) => setList(list.map(a => ({ ...a, isDefault: a.id === id })));
  const remove = (id) => setList(list.filter(a => a.id !== id));

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 100 }} className="anim-slide-in">
      <ScreenHeader title="Địa chỉ giao hàng" subtitle={`${list.length} địa chỉ đã lưu`} onBack={() => nav.pop()}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.map((a) => (
            <Card key={a.id} style={{ padding: 14, border: a.isDefault ? `1.5px solid ${b.solid}` : '1.5px solid transparent' }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{a.name}</span>
                <span style={{ fontSize: 11, color: '#64748B' }}>·</span>
                <span style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>{a.phone}</span>
                {a.isDefault && <Badge color="green">Mặc định</Badge>}
                {a.label && <Badge color="slate">{a.label}</Badge>}
              </div>
              <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.5, marginBottom: 10 }}>
                {a.address}, {a.city}
              </div>
              <div style={{ display: 'flex', gap: 8, borderTop: '1px solid #F1F5F9', paddingTop: 10 }}>
                {!a.isDefault && (
                  <button onClick={() => { setDefault(a.id); showToast && showToast('Đã đặt làm địa chỉ mặc định'); }} className="tap" style={{ flex: 1, padding: '8px 10px', borderRadius: 9, background: b.soft, color: b.solid, border: 'none', fontSize: 12, fontWeight: 700 }}>Đặt mặc định</button>
                )}
                <button onClick={() => showToast && showToast('Chỉnh sửa địa chỉ')} className="tap" style={{ flex: 1, padding: '8px 10px', borderRadius: 9, background: '#F1F5F9', color: '#475569', border: 'none', fontSize: 12, fontWeight: 700 }}>Sửa</button>
                {!a.isDefault && (
                  <button onClick={() => { if (confirm('Xóa địa chỉ này?')) remove(a.id); }} className="tap" style={{ padding: '8px 12px', borderRadius: 9, background: '#FEE2E2', color: '#DC2626', border: 'none', fontSize: 12, fontWeight: 700 }}>Xóa</button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      <ActionBar>
        <PrimaryButton fullWidth brand={brand} onClick={() => showToast && showToast('Mở form thêm địa chỉ mới')}>
          <Ic.Plus s={18} c="#fff"/> Thêm địa chỉ mới
        </PrimaryButton>
      </ActionBar>
    </div>
  );
}

// 3) Phương thức thanh toán & nhận hoa hồng
const MOCK_PAYMENT_METHODS = [
  { id: 'pm1', type: 'bank', name: 'Vietcombank', number: '0123 4567 8900', holder: 'NGUYEN VAN A', isDefault: true, color: '#1B5E20' },
  { id: 'pm2', type: 'bank', name: 'Techcombank', number: '1903 9999 8888', holder: 'NGUYEN VAN A', isDefault: false, color: '#E53935' },
  { id: 'pm3', type: 'momo', name: 'Ví MoMo', number: '0901 234 567', holder: 'Nguyễn Văn A', isDefault: false, color: '#A50064' },
];

function PaymentMethodScreen({ nav, brand, showToast }) {
  const b = getBrand(brand);
  const [list, setList] = React.useState(MOCK_PAYMENT_METHODS);
  const setDefault = (id) => setList(list.map(m => ({ ...m, isDefault: m.id === id })));

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 100 }} className="anim-slide-in">
      <ScreenHeader title="Phương thức thanh toán" onBack={() => nav.pop()}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        <Card style={{ padding: 12, marginBottom: 14, background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <div style={{ fontSize: 12, color: '#1E40AF', lineHeight: 1.5 }}>
              Tài khoản mặc định sẽ là tài khoản nhận hoa hồng khi bạn yêu cầu rút tiền.
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.map((m) => (
            <Card key={m.id} style={{ overflow: 'hidden', border: m.isDefault ? `1.5px solid ${b.solid}` : '1.5px solid transparent' }}>
              <div style={{ padding: 14, background: `linear-gradient(120deg, ${m.color}, ${m.color}cc)`, color: '#fff', position: 'relative' }}>
                {m.isDefault && <Badge color="amber" style={{ position: 'absolute', top: 12, right: 12 }}>Mặc định</Badge>}
                <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 700, letterSpacing: 0.5 }}>{m.type === 'bank' ? 'NGÂN HÀNG' : m.type === 'momo' ? 'VÍ ĐIỆN TỬ' : 'THẺ'}</div>
                <div style={{ fontSize: 17, fontWeight: 800, marginTop: 4 }}>{m.name}</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginTop: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: 1 }}>{m.number}</div>
                <div style={{ fontSize: 11, opacity: 0.85, marginTop: 6 }}>{m.holder}</div>
              </div>
              <div style={{ padding: 10, display: 'flex', gap: 8 }}>
                {!m.isDefault && (
                  <button onClick={() => { setDefault(m.id); showToast && showToast(`Đã đặt ${m.name} làm mặc định`); }} className="tap" style={{ flex: 1, padding: '8px 10px', borderRadius: 9, background: b.soft, color: b.solid, border: 'none', fontSize: 12, fontWeight: 700 }}>Đặt mặc định</button>
                )}
                <button onClick={() => showToast && showToast('Chỉnh sửa thông tin')} className="tap" style={{ flex: 1, padding: '8px 10px', borderRadius: 9, background: '#F1F5F9', color: '#475569', border: 'none', fontSize: 12, fontWeight: 700 }}>Sửa</button>
                {!m.isDefault && (
                  <button onClick={() => showToast && showToast('Đã xóa')} className="tap" style={{ padding: '8px 12px', borderRadius: 9, background: '#FEE2E2', color: '#DC2626', border: 'none', fontSize: 12, fontWeight: 700 }}>Xóa</button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      <ActionBar>
        <PrimaryButton fullWidth brand={brand} onClick={() => showToast && showToast('Mở form thêm phương thức mới')}>
          <Ic.Plus s={18} c="#fff"/> Thêm phương thức
        </PrimaryButton>
      </ActionBar>
    </div>
  );
}

// 4) Đổi mật khẩu
function ChangePasswordScreen({ nav, brand, showToast }) {
  const b = getBrand(brand);
  const [data, setData] = React.useState({ old: '', neww: '', confirm: '' });
  const [show, setShow] = React.useState({ old: false, neww: false, confirm: false });
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggle = (k) => setShow((s) => ({ ...s, [k]: !s[k] }));

  const strength = (() => {
    const p = data.neww;
    if (p.length < 6) return { l: 'Yếu', c: '#DC2626', w: 33 };
    if (p.length < 10 || !/[A-Z]/.test(p) || !/\d/.test(p)) return { l: 'Trung bình', c: '#F59E0B', w: 66 };
    return { l: 'Mạnh', c: '#10B981', w: 100 };
  })();

  const matchError = data.confirm && data.neww !== data.confirm;
  const valid = data.old.length >= 6 && data.neww.length >= 6 && data.neww === data.confirm;

  const renderPwInput = (k, placeholder) => (
    <div style={{ position: 'relative' }}>
      <input
        value={data[k]}
        onChange={(e) => set(k, e.target.value)}
        placeholder={placeholder}
        type={show[k] ? 'text' : 'password'}
        style={{ width: '100%', height: 46, padding: '0 44px 0 14px', borderRadius: 10, background: '#fff', border: '1.5px solid #E2E8F0', color: '#0F172A', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
      />
      <button onClick={() => toggle(k)} className="tap" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 32, height: 32, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
        <Ic.Eye s={18}/>
      </button>
    </div>
  );

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 100 }} className="anim-slide-in">
      <ScreenHeader title="Đổi mật khẩu" onBack={() => nav.pop()}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        <Card style={{ padding: 14 }}>
          <PField label="Mật khẩu hiện tại" required>
            {renderPwInput('old', 'Nhập mật khẩu cũ')}
          </PField>
          <PField label="Mật khẩu mới" required hint="Tối thiểu 6 ký tự, nên có chữ hoa và số">
            {renderPwInput('neww', 'Nhập mật khẩu mới')}
            {data.neww && (
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 4, background: '#E2E8F0', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${strength.w}%`, height: '100%', background: strength.c, transition: 'width .25s' }}/>
                </div>
                <span style={{ fontSize: 11, color: strength.c, fontWeight: 700 }}>{strength.l}</span>
              </div>
            )}
          </PField>
          <PField label="Xác nhận mật khẩu mới" required>
            {renderPwInput('confirm', 'Nhập lại mật khẩu mới')}
            {matchError && <div style={{ fontSize: 11, color: '#DC2626', marginTop: 4 }}>Mật khẩu xác nhận không khớp</div>}
          </PField>
        </Card>

        <Card style={{ marginTop: 12, padding: 12, background: '#FEF3C7', border: '1px solid #FCD34D' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 16 }}>🔐</span>
            <div style={{ fontSize: 12, color: '#92400E', lineHeight: 1.5 }}>
              Sau khi đổi mật khẩu thành công, bạn sẽ được đăng xuất khỏi các thiết bị khác.
            </div>
          </div>
        </Card>
      </div>
      <ActionBar>
        <PrimaryButton fullWidth brand={brand} disabled={!valid} onClick={() => { showToast && showToast('Đã đổi mật khẩu'); nav.pop(); }}>Đổi mật khẩu</PrimaryButton>
      </ActionBar>
    </div>
  );
}

// 5) Hợp đồng đã ký
const MOCK_CONTRACTS = [
  { id: 'c1', title: 'Hợp đồng đại lý SimPlus', code: 'SP-2026-A102', date: '12/05/2026', status: 'Hiệu lực', type: 'Đại lý' },
  { id: 'c2', title: 'Thỏa thuận bảo mật thông tin (NDA)', code: 'NDA-2026-88', date: '10/05/2026', status: 'Đã ký', type: 'Pháp lý' },
];

function ContractsScreen({ nav, brand, showToast }) {
  const b = getBrand(brand);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 100 }} className="anim-slide-in">
      <ScreenHeader title="Hợp đồng đã ký" onBack={() => nav.pop()}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOCK_CONTRACTS.map((c) => (
            <Card key={c.id} style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Badge color={c.type === 'Đại lý' ? 'blue' : 'slate'}>{c.type}</Badge>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginTop: 8 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>Mã số: {c.code}</div>
                </div>
                <Badge color="green">{c.status}</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>Ngày ký: {c.date}</div>
                <button onClick={() => showToast && showToast('Đang tải tài liệu PDF...')} className="tap" style={{ padding: '8px 16px', borderRadius: 9, background: b.soft, color: b.solid, border: 'none', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Ic.Doc s={14}/> Xem PDF
                </button>
              </div>
            </Card>
          ))}
        </div>
        
        <div style={{ marginTop: 20, padding: 14, borderRadius: 12, background: '#F8FAFC', border: '1px dashed #CBD5E1', textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>📑</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Cần ký hợp đồng mới?</div>
          <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4, lineHeight: 1.5 }}>Các hợp đồng mới phát sinh từ việc nâng cấp đại lý sẽ được hiển thị tại đây sau khi bạn hoàn tất ký điện tử.</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProfileScreen, ProfileEditScreen, AddressBookScreen, PaymentMethodScreen, ChangePasswordScreen, ContractsScreen, MOCK_ADDRESSES, MOCK_PAYMENT_METHODS, MOCK_CONTRACTS });
