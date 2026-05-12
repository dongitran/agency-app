// screens-agent.jsx — Agent packages, dashboard, team, wallet, referral

const AGENT_PACKAGES = [
  { id: 'bronze', name: 'Đại lý Đồng', price: 990000, period: '12 tháng', commission: { f1: 15, f2: 5, f3: 2 }, color: '#B45309', gradFrom: '#F59E0B', gradTo: '#B45309', perks: ['Link giới thiệu riêng', 'Hoa hồng F1 15%', 'Báo cáo cơ bản', 'Hỗ trợ Zalo nhóm'] },
  { id: 'silver', name: 'Đại lý Bạc', price: 1990000, period: '12 tháng', commission: { f1: 20, f2: 8, f3: 3 }, color: '#475569', gradFrom: '#94A3B8', gradTo: '#475569', perks: ['Tất cả gói Đồng', 'Hoa hồng F1 20% · F2 8%', 'Báo cáo chi tiết', 'Khóa học cơ bản miễn phí', 'Quản lý team đến cấp F3'], featured: true },
  { id: 'gold', name: 'Đại lý Vàng', price: 4990000, period: '12 tháng', commission: { f1: 25, f2: 10, f3: 5 }, color: '#B45309', gradFrom: '#FBBF24', gradTo: '#D97706', perks: ['Tất cả gói Bạc', 'Hoa hồng F1 25% · F2 10% · F3 5%', 'Mentor 1-1 hàng tháng', 'Tất cả khóa học miễn phí', 'Co-branding marketing'] },
];

function AgentPackagesScreen({ nav, brand, user, setUser, showToast }) {
  const b = getBrand(brand);
  const [picked, setPicked] = React.useState(user.isAgent ? null : 'silver');

  const confirm = () => {
    if (!picked) return;
    const pkg = AGENT_PACKAGES.find(p => p.id === picked);
    nav.push('checkout', { total: pkg.price, afterSuccess: () => {
      setUser({ ...user, isAgent: true, agentTier: pkg.name.split(' ')[1] });
      nav.replace('agent-dashboard');
    }});
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 100 }} className="anim-slide-in">
      <ScreenHeader title="Gói đại lý" subtitle="Chọn gói phù hợp để bắt đầu" onBack={() => nav.pop()}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        {/* benefits */}
        <Card style={{ padding: 16, background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Ic.Crown s={22} c="#fff"/>
            <div style={{ fontSize: 15, fontWeight: 800 }}>Tại sao làm đại lý SimPlus?</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
            {[
              { l: 'F1', v: '25%' },
              { l: 'F2', v: '10%' },
              { l: 'F3', v: '5%' },
              { l: 'Hạn mức rút', v: '50tr/tháng' },
            ].map((s) => (
              <div key={s.l} style={{ padding: 10, background: 'rgba(255,255,255,0.15)', borderRadius: 10, backdropFilter: 'blur(8px)' }}>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{s.l}</div>
                <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.3 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
          {AGENT_PACKAGES.map((p) => (
            <Card key={p.id} onClick={() => setPicked(p.id)} style={{ overflow: 'hidden', border: picked === p.id ? `2.5px solid ${b.solid}` : '2.5px solid transparent', cursor: 'pointer' }}>
              <div style={{ padding: 16, background: `linear-gradient(120deg, ${p.gradFrom}, ${p.gradTo})`, color: '#fff', position: 'relative' }}>
                {p.featured && <Badge color="amber" style={{ position: 'absolute', top: 12, right: 12 }}>⭐ Phổ biến</Badge>}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Ic.Crown s={22} c="#fff"/>
                  <div style={{ fontSize: 17, fontWeight: 800 }}>{p.name}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
                  <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.6 }}>{vnd(p.price)}</span>
                  <span style={{ fontSize: 12, opacity: 0.85 }}>/ {p.period}</span>
                </div>
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  {Object.entries(p.commission).map(([k, v]) => (
                    <div key={k} style={{ flex: 1, padding: '6px 8px', borderRadius: 8, background: b.soft, textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: b.text, fontWeight: 700 }}>{k.toUpperCase()}</div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: b.solid }}>{v}%</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {p.perks.map((perk) => (
                    <div key={perk} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 6, background: b.soft, color: b.solid, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}><Ic.Check s={12} c={b.solid} w={2.4}/></div>
                      <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.45 }}>{perk}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, padding: '10px 12px', background: picked === p.id ? b.solid : '#F1F5F9', color: picked === p.id ? '#fff' : '#475569', borderRadius: 12, fontSize: 13, fontWeight: 700, textAlign: 'center', transition: 'all .15s' }}>
                  {picked === p.id ? '✓ Đã chọn' : 'Chọn gói này'}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <ActionBar>
        <PrimaryButton fullWidth onClick={confirm} disabled={!picked} brand={brand}>
          {picked ? `Đăng ký · ${vnd(AGENT_PACKAGES.find(p => p.id === picked).price)}` : 'Chọn một gói'}
        </PrimaryButton>
      </ActionBar>
    </div>
  );
}

function AgentDashboardScreen({ nav, brand, user, agentLayout }) {
  const b = getBrand(brand);
  const [range, setRange] = React.useState('30d');
  const monthly = 12480000, pending = 3220000, paid = 89400000;
  const sparkData = [3, 4.5, 4, 6, 5.5, 7, 8, 7.5, 9, 8, 10, 12];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', overflow: 'auto', paddingBottom: 100 }} className="scroll-area anim-fade">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5 }}><IOSStatusBar dark={true}/></div>

      <div className="screen-hero" style={{ background: `linear-gradient(165deg, ${b.grad[0]}, ${b.grad[1]})`, padding: '60px 18px 80px', color: '#fff', borderRadius: '0 0 28px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 600 }}>DASHBOARD ĐẠI LÝ</div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, marginTop: 2 }}>Xin chào, {user.name.split(' ').slice(-1)[0]}</div>
            <div style={{ marginTop: 8 }}><Badge color="amber">⭐ Cấp {user.agentTier} · F1 20%</Badge></div>
          </div>
          <button onClick={() => nav.push('agent-referral')} className="tap" style={{...btnGlass, background: 'rgba(255,255,255,0.2)'}}><Ic.Share s={18} c="#fff"/></button>
        </div>

        <div style={{ marginTop: 22, position: 'relative' }}>
          <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 600 }}>HOA HỒNG THÁNG NÀY</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>{vnd(monthly)}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#A7F3D0', display: 'inline-flex', alignItems: 'center', gap: 2 }}><Ic.ArrowUp s={11} c="#A7F3D0"/>+24%</span>
          </div>
        </div>
      </div>

      {/* range tabs */}
      <div style={{ padding: '0 18px', marginTop: -50, position: 'relative' }}>
        <Card style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Doanh thu hoa hồng</div>
            <div style={{ display: 'flex', gap: 0, background: '#F1F5F9', borderRadius: 9, padding: 2 }}>
              {['7d','30d','90d'].map(r => (
                <button key={r} onClick={() => setRange(r)} className="tap" style={{ padding: '4px 10px', border: 'none', background: range===r ? '#fff' : 'transparent', color: range===r ? '#0F172A' : '#64748B', borderRadius: 7, fontSize: 11, fontWeight: 700 }}>{r}</button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Spark data={sparkData} color={b.solid} width={332} height={70}/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
            <div style={{ padding: 12, borderRadius: 12, background: '#F0FDF4' }}>
              <div style={{ fontSize: 11, color: '#15803D', fontWeight: 700 }}>Đã thanh toán</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginTop: 2, letterSpacing: -0.3 }}>{vnd(paid)}</div>
            </div>
            <div style={{ padding: 12, borderRadius: 12, background: '#FEF3C7' }}>
              <div style={{ fontSize: 11, color: '#92400E', fontWeight: 700 }}>Chờ duyệt</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginTop: 2, letterSpacing: -0.3 }}>{vnd(pending)}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* F1 F2 F3 commission breakdown */}
      <div style={{ padding: '14px 18px 0' }}>
        <SectionHead title="Hoa hồng theo cấp"/>
        <Card style={{ padding: 16 }}>
          {[
            { l: 'F1 (Trực tiếp)', n: 12, r: 20, amt: 7440000, c: '#10B981' },
            { l: 'F2 (Cấp 2)',     n: 14, r: 8,  amt: 3290000, c: '#3B82F6' },
            { l: 'F3 (Cấp 3)',     n: 6,  r: 3,  amt: 1750000, c: '#8B5CF6' },
          ].map((row, i, arr) => (
            <div key={row.l}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: row.c+'18', color: row.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>{row.l.split(' ')[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{row.l}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{row.n} thành viên · {row.r}% hoa hồng</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', letterSpacing: -0.3 }}>{vnd(row.amt)}</div>
                </div>
              </div>
              {i < arr.length-1 && <div style={{ height: 1, background: '#F1F5F9' }}/>}
            </div>
          ))}
        </Card>
      </div>

      {agentLayout === 'stats' && (
        <div style={{ padding: '14px 18px 0' }}>
          <SectionHead title="Hiệu suất"/>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { l: 'Click link', v: '1.2K', d: '+12%', c: '#3B82F6' },
              { l: 'Đăng ký mới', v: '48', d: '+8%', c: '#10B981' },
              { l: 'Đơn hợp lệ', v: '32', d: '+18%', c: '#F59E0B' },
              { l: 'Tỷ lệ chốt', v: '24%', d: '+3%', c: '#8B5CF6' },
            ].map((s) => (
              <Card key={s.l} style={{ padding: 14 }}>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>{s.l}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', letterSpacing: -0.4, marginTop: 2 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: s.c, fontWeight: 700, marginTop: 4 }}>↑ {s.d}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* quick actions */}
      <div style={{ padding: '14px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Card onClick={() => nav.push('agent-team')} style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#DBEAFE', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Users s={20} c="#1D4ED8"/></div>
          <div><div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Quản lý team</div><div style={{ fontSize: 11, color: '#64748B' }}>32 thành viên</div></div>
        </Card>
        <Card onClick={() => nav.push('wallet')} style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Wallet s={20} c="#B45309"/></div>
          <div><div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Rút tiền</div><div style={{ fontSize: 11, color: '#64748B' }}>Khả dụng {vndShort(monthly)}</div></div>
        </Card>
      </div>

      {/* Recent commissions */}
      <div style={{ padding: '14px 18px 0' }}>
        <SectionHead title="Hoa hồng gần đây" action="Xem tất cả"/>
        <Card style={{ overflow: 'hidden' }}>
          {[
            { n: 'Lê Văn Bình', t: 'F1', p: 'SIM 5G Pro', a: 59800, d: '2 giờ trước' },
            { n: 'Nguyễn Mai', t: 'F1', p: 'Khóa học Bestseller', a: 259800, d: '5 giờ trước' },
            { n: 'Trần Hùng', t: 'F2', p: 'SIM Số đẹp', a: 47920, d: 'Hôm qua' },
            { n: 'Phạm Anh', t: 'F3', p: 'Gói đại lý Đồng', a: 19800, d: '2 ngày' },
          ].map((c, i, arr) => (
            <div key={i} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: i < arr.length-1 ? '1px solid #F1F5F9' : 'none' }}>
              <Avatar name={c.n} size={36}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{c.n}</span>
                  <Badge color={c.t === 'F1' ? 'green' : c.t === 'F2' ? 'blue' : 'purple'}>{c.t}</Badge>
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{c.p} · {c.d}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#10B981' }}>+{vnd(c.a)}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function AgentTeamScreen({ nav, brand }) {
  const b = getBrand(brand);
  const [level, setLevel] = React.useState('F1');
  const team = {
    F1: [
      { n: 'Lê Văn Bình', joined: '12/03', sales: 12, comm: 1840000, tier: 'Bạc' },
      { n: 'Nguyễn Mai', joined: '28/02', sales: 24, comm: 3920000, tier: 'Vàng' },
      { n: 'Trần Hùng', joined: '15/02', sales: 8, comm: 1100000, tier: 'Đồng' },
      { n: 'Đỗ Quốc', joined: '02/02', sales: 18, comm: 2890000, tier: 'Bạc' },
      { n: 'Vũ Hà', joined: '20/01', sales: 6, comm: 740000, tier: 'Đồng' },
    ],
    F2: [
      { n: 'Phạm Tuấn', joined: '08/03', sales: 5, comm: 380000, tier: 'Đồng', via: 'Lê Văn Bình' },
      { n: 'Hoàng My', joined: '14/02', sales: 11, comm: 920000, tier: 'Bạc', via: 'Nguyễn Mai' },
      { n: 'Bùi Đức', joined: '30/01', sales: 7, comm: 540000, tier: 'Đồng', via: 'Đỗ Quốc' },
    ],
    F3: [
      { n: 'Lý Hồng', joined: '20/03', sales: 3, comm: 95000, tier: 'Đồng', via: 'Phạm Tuấn' },
      { n: 'Ngô Khôi', joined: '12/03', sales: 4, comm: 145000, tier: 'Đồng', via: 'Hoàng My' },
    ],
  };
  const list = team[level];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 100 }} className="anim-slide-in">
      <ScreenHeader title="Team đại lý" subtitle="32 thành viên · 3 cấp" onBack={() => nav.pop()}/>

      {/* tree visualization */}
      <div style={{ padding: '14px 18px 0' }}>
        <Card style={{ padding: 18, background: `linear-gradient(135deg, ${b.grad[0]}10, ${b.grad[1]}10)` }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ padding: '6px 12px', borderRadius: 999, background: '#fff', border: `2px solid ${b.solid}`, fontSize: 12, fontWeight: 800, color: b.solid }}>Bạn (F0)</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 14, position: 'relative' }}>
            <svg viewBox="0 0 300 30" style={{ position: 'absolute', top: -10, left: 0, right: 0, width: '100%', height: 30, pointerEvents: 'none' }}>
              <path d="M150 0 L60 30 M150 0 L150 30 M150 0 L240 30" stroke="#CBD5E1" strokeWidth="1.5" fill="none"/>
            </svg>
            {[
              { l: 'F1', n: 12, c: '#10B981' },
              { l: 'F2', n: 14, c: '#3B82F6' },
              { l: 'F3', n: 6, c: '#8B5CF6' },
            ].map((x) => (
              <div key={x.l} onClick={() => setLevel(x.l)} className="tap" style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: x.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, border: level === x.l ? '3px solid #0F172A' : '3px solid transparent', margin: '0 auto', transition: 'border .15s' }}>{x.n}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', marginTop: 5 }}>{x.l}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '14px 18px 6px', overflowX: 'auto', flexShrink: 0 }} className="scroll-area">
        {['F1', 'F2', 'F3'].map(f => <Chip key={f} active={f===level} onClick={() => setLevel(f)} brand={brand}>Cấp {f} ({team[f].length})</Chip>)}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 18px 30px' }} className="scroll-area">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.map((m, i) => (
            <Card key={i} style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <Avatar name={m.n} size={44}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{m.n}</span>
                  <Badge color={m.tier === 'Vàng' ? 'amber' : m.tier === 'Bạc' ? 'slate' : 'red'}>{m.tier}</Badge>
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 3 }}>
                  Tham gia {m.joined}{m.via ? ` · qua ${m.via}` : ''}
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{m.sales} đơn · Hoa hồng: <strong style={{ color: '#10B981' }}>{vnd(m.comm)}</strong></div>
              </div>
              <Ic.Chevron s={14} c="#94A3B8"/>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentReferralScreen({ nav, brand, user, showToast }) {
  const b = getBrand(brand);
  const link = 'simplus.vn/r/' + user.refCode;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column' }} className="anim-slide-in">
      <ScreenHeader title="Link giới thiệu" onBack={() => nav.pop()}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        <Card style={{ padding: 22, textAlign: 'center', background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, color: '#fff' }}>
          <div style={{ fontSize: 13, opacity: 0.85, fontWeight: 600 }}>MÃ GIỚI THIỆU CỦA BẠN</div>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 2, marginTop: 6, fontFamily: 'ui-monospace, monospace' }}>{user.refCode}</div>
          <div style={{ marginTop: 14, padding: '8px 14px', background: 'rgba(255,255,255,0.18)', borderRadius: 12, fontSize: 13, fontWeight: 600 }}>{link}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={() => showToast('Đã sao chép link')} className="tap" style={{ flex: 1, height: 44, borderRadius: 12, border: 'none', background: '#fff', color: b.solid, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Ic.Copy s={16} c={b.solid}/>Sao chép</button>
            <button onClick={() => showToast('Đã mở chia sẻ')} className="tap" style={{ flex: 1, height: 44, borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Ic.Share s={16} c="#fff"/>Chia sẻ</button>
          </div>
        </Card>

        <SectionHead title="Hiệu quả link"/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[{l:'Lượt click',v:'1.2K',c:'#3B82F6'},{l:'Đăng ký',v:'48',c:'#10B981'},{l:'Mua hàng',v:'32',c:'#F59E0B'}].map(s => (
            <Card key={s.l} style={{ padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.c, letterSpacing: -0.3 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{s.l}</div>
            </Card>
          ))}
        </div>

        <SectionHead title="Chia sẻ qua kênh"/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
          {[{l:'Zalo',c:'#0068FF',i:'Z'},{l:'Facebook',c:'#1877F2',i:'f'},{l:'Tiktok',c:'#000',i:'T'},{l:'SMS',c:'#10B981',i:'✉'}].map(x => (
            <button key={x.l} className="tap" style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 6 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: x.c, color: '#fff', fontWeight: 800, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{x.i}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#0F172A' }}>{x.l}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function WalletScreen({ nav, brand, user, showToast }) {
  const b = getBrand(brand);
  const [amount, setAmount] = React.useState('');
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const tx = [
    { t: 'Hoa hồng F1 · Nguyễn Mai', amt: 259800, in: true, d: '12/05 09:24' },
    { t: 'Rút tiền · Vietcombank', amt: 5000000, in: false, d: '08/05 14:22', s: 'Đã duyệt' },
    { t: 'Hoa hồng F2 · Phạm Tuấn', amt: 47920, in: true, d: '06/05 11:08' },
    { t: 'Yêu cầu rút tiền', amt: 3000000, in: false, d: '02/05 16:40', s: 'Chờ duyệt' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 100 }} className="anim-slide-in">
      <ScreenHeader title="Ví đại lý" onBack={() => nav.pop()}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        <Card style={{ padding: 18, background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, color: '#fff' }}>
          <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 600 }}>SỐ DƯ KHẢ DỤNG</div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.6, marginTop: 4 }}>{vnd(user.balance)}</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 14, fontSize: 12 }}>
            <div><span style={{ opacity: 0.75 }}>Chờ duyệt</span><div style={{ fontWeight: 700, marginTop: 2 }}>{vnd(3220000)}</div></div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.25)' }}/>
            <div><span style={{ opacity: 0.75 }}>Đã rút (T5)</span><div style={{ fontWeight: 700, marginTop: 2 }}>{vnd(5000000)}</div></div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={() => setSheetOpen(true)} className="tap" style={{ flex: 1, height: 44, borderRadius: 12, border: 'none', background: '#fff', color: b.solid, fontSize: 13, fontWeight: 700 }}>Rút tiền</button>
            <button className="tap" style={{ flex: 1, height: 44, borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 13, fontWeight: 700 }}>Lịch sử</button>
          </div>
        </Card>

        <SectionHead title="Lịch sử giao dịch"/>
        <Card style={{ overflow: 'hidden' }}>
          {tx.map((t, i) => (
            <div key={i} style={{ padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center', borderBottom: i < tx.length-1 ? '1px solid #F1F5F9' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: t.in ? '#DCFCE7' : '#FEF3C7', color: t.in ? '#15803D' : '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.in ? <Ic.ArrowUp s={16} w={2.4}/> : <Ic.Wallet s={18}/>}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{t.t}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{t.d}{t.s ? ` · ${t.s}` : ''}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: t.in ? '#10B981' : '#0F172A' }}>{t.in ? '+' : '-'}{vnd(t.amt)}</div>
            </div>
          ))}
        </Card>
      </div>

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Yêu cầu rút tiền">
        <div style={{ padding: '6px 20px 20px' }}>
          <div style={{ fontSize: 13, color: '#64748B', marginBottom: 12 }}>Khả dụng: <strong style={{ color: '#0F172A' }}>{vnd(user.balance)}</strong> · Tối thiểu 200.000đ</div>
          <Input value={amount} onChange={setAmount} placeholder="Nhập số tiền" icon={<Ic.Wallet s={18}/>}/>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {[500000, 1000000, 3000000, 5000000].map(v => (
              <Chip key={v} active={false} onClick={() => setAmount(String(v))} brand={brand}>{vndShort(v)}</Chip>
            ))}
          </div>
          <Card style={{ marginTop: 14, padding: 12, display: 'flex', gap: 10, alignItems: 'center', background: '#F8FAFC' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: b.solid, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>VCB</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Vietcombank</div>
              <div style={{ fontSize: 11, color: '#64748B' }}>•••• 4789 · {user.name}</div>
            </div>
            <Ic.Chevron s={14} c="#94A3B8"/>
          </Card>
          <PrimaryButton fullWidth brand={brand} style={{ marginTop: 16 }} onClick={() => { setSheetOpen(false); showToast('Yêu cầu rút tiền đã gửi'); }}>Gửi yêu cầu</PrimaryButton>
        </div>
      </Sheet>
    </div>
  );
}

Object.assign(window, { AgentPackagesScreen, AgentDashboardScreen, AgentTeamScreen, AgentReferralScreen, WalletScreen, AGENT_PACKAGES });
