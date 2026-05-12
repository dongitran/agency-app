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
            { l: 'Hồ sơ cá nhân', i: <Ic.User s={20}/>, c: '#3B82F6' },
            { l: 'Địa chỉ giao SIM', i: <Ic.Doc s={20}/>, c: '#10B981' },
            { l: 'Phương thức thanh toán', i: <Ic.Wallet s={20}/>, c: '#F59E0B' },
            { l: 'Đổi mật khẩu', i: <Ic.Lock s={20}/>, c: '#8B5CF6' },
          ].map((r, i, arr) => (
            <div key={r.l} className="tap" style={{ padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < arr.length-1 ? '1px solid #F1F5F9' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: r.c+'18', color: r.c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.i}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{r.l}</div>
              <Ic.Chevron s={14} c="#94A3B8"/>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ padding: '18px 18px 0' }}>
        <SectionHead title="Đại lý"/>
        <Card style={{ overflow: 'hidden' }}>
          {[
            { l: user.isAgent ? 'Dashboard đại lý' : 'Đăng ký làm đại lý', i: <Ic.Crown s={20}/>, c: '#F59E0B', to: user.isAgent ? 'agent-dashboard' : 'agent-packages' },
            { l: 'Link giới thiệu của tôi', i: <Ic.Share s={20}/>, c: '#0EA5E9', to: 'agent-referral' },
            { l: 'Team & cây đại lý', i: <Ic.Users s={20}/>, c: '#10B981', to: 'agent-team' },
            { l: 'Yêu cầu rút tiền', i: <Ic.Trend s={20}/>, c: '#EC4899', to: 'wallet' },
          ].map((r, i, arr) => (
            <div key={r.l} onClick={() => nav.push(r.to)} className="tap" style={{ padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < arr.length-1 ? '1px solid #F1F5F9' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: r.c+'18', color: r.c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.i}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{r.l}</div>
              <Ic.Chevron s={14} c="#94A3B8"/>
            </div>
          ))}
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

Object.assign(window, { ProfileScreen });
