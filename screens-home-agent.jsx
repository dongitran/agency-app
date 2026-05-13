// screens-home-agent.jsx — Home tab variant for agent users
// Performance-focused: stats hero, commission-sortable products, team activity, next-tier CTA

const TIER_NEXT = {
  'Bạc':       { next: 'Vàng',    needOrders: 8,  needTeam: 50,  commission: '22%' },
  'Vàng':      { next: 'Kim cương', needOrders: 20, needTeam: 100, commission: '25%' },
  'Kim cương': { next: null,      needOrders: 0,  needTeam: 0,   commission: '25%' },
};

const MOCK_TEAM_FEED = [
  { who: 'Trần Mai Linh',  tier: 'F1', action: 'vừa chốt đơn', detail: 'SIM Lộc Phát · 5.9tr', ago: '12 phút', earned: 1080000, avatar: 'TM', color: '#EC4899' },
  { who: 'Phạm Văn Đức',   tier: 'F2', action: 'tham gia team', detail: 'Đại lý Bạc', ago: '1 giờ', earned: 0, avatar: 'PD', color: '#0EA5E9' },
  { who: 'Lê Quang Vũ',    tier: 'F1', action: 'vừa chốt đơn', detail: 'Combo SIM + Khóa · 7.4tr', ago: '3 giờ', earned: 1480000, avatar: 'LV', color: '#10B981' },
  { who: 'Nguyễn Hồng Anh', tier: 'F1', action: 'rút hoa hồng', detail: '3.2tr về ví Vietcombank', ago: '8 giờ', earned: 0, avatar: 'NA', color: '#F59E0B' },
];

const MOCK_BROADCAST = [
  { tag: 'Chính sách', tone: '#2563EB', title: 'Hoa hồng F2 tăng từ 6% lên 8% từ 01/06', date: '2 ngày trước' },
  { tag: 'Đào tạo',    tone: '#7C3AED', title: 'Lớp "Chốt đơn SIM phong thủy 30 phút" miễn phí cho đại lý Bạc+', date: '4 ngày trước' },
];

function HomeAgentScreen({ nav, user, brand, addToCart, cartCount }) {
  const b = getBrand(brand);
  const tier = user.agentTier || 'Bạc';
  const nextTier = TIER_NEXT[tier] || TIER_NEXT['Bạc'];

  // Mock current month progress
  const monthOrders = 12;
  const teamSize = 32;
  const teamOrders24h = 8;
  const newMembers7d = 3;
  const myRank = 42;
  const rankTotal = 1248;

  const progressOrders = nextTier.next ? Math.min(1, monthOrders / (monthOrders + nextTier.needOrders)) : 1;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 11) return 'Chào buổi sáng';
    if (h < 14) return 'Chào buổi trưa';
    if (h < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  })();

  // SIM dễ chốt: sort by commission %
  const hotSims = [...(window.MOCK_SIMS || [])].sort((a, b) => (b.commission || 0) - (a.commission || 0)).slice(0, 4);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', overflow: 'auto', paddingBottom: 100 }} className="scroll-area anim-fade">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 8 }}>
        <IOSStatusBar dark={true}/>
      </div>

      {/* Performance hero */}
      <div className="screen-hero" style={{
        position: 'relative',
        background: `linear-gradient(160deg, ${b.grad[0]} 0%, ${b.grad[1]} 100%)`,
        color: '#fff', padding: '64px 18px 22px', borderRadius: '0 0 28px 28px',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -50, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }}/>
        <div style={{ position: 'absolute', bottom: -60, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name={user.name} size={42}/>
            <div>
              <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 600, letterSpacing: 0.4 }}>{greeting.toUpperCase()} 👋</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>{user.name}</span>
                <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 999, background: 'rgba(255,255,255,0.22)', letterSpacing: 0.3 }}>{tier.toUpperCase()}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="tap" style={btnGlass}><Ic.Bell s={20} c="#fff"/><span style={dotPing}/></button>
            <button className="tap" style={btnGlass} onClick={() => nav.push('cart')}>
              <Ic.Cart s={20} c="#fff"/>
              {cartCount > 0 && <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16, borderRadius: 8, background: '#EF4444', color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Main stat: this-month commission */}
        <div style={{ marginTop: 22, position: 'relative' }}>
          <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 700, letterSpacing: 0.4 }}>HOA HỒNG THÁNG 5</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.8 }}>{vnd(user.balance)}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#A7F3D0', display: 'inline-flex', alignItems: 'center', gap: 2 }}>
              <Ic.ArrowUp s={11} c="#A7F3D0"/>+24% vs T4
            </span>
          </div>
        </div>

        {/* Mini stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 14, position: 'relative' }}>
          {[
            { l: 'Đơn tháng', v: monthOrders, sub: '+3 hôm nay' },
            { l: 'Team', v: teamSize, sub: `+${newMembers7d} tuần này` },
            { l: 'BXH', v: `#${myRank}`, sub: `/ ${rankTotal.toLocaleString()}` },
          ].map((s) => (
            <div key={s.l} style={{ padding: '10px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: 10, opacity: 0.85, fontWeight: 700 }}>{s.l}</div>
              <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2, letterSpacing: -0.4 }}>{s.v}</div>
              <div style={{ fontSize: 9, opacity: 0.75, marginTop: 1 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Next-tier progress strip */}
        {nextTier.next && (
          <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 12, background: 'rgba(0,0,0,0.18)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontWeight: 700 }}>
              <span>🏆 Còn {nextTier.needOrders} đơn để lên <strong>{nextTier.next}</strong></span>
              <span style={{ opacity: 0.85 }}>Hoa hồng {nextTier.commission}</span>
            </div>
            <div style={{ height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.2)', overflow: 'hidden', marginTop: 8 }}>
              <div style={{ width: `${progressOrders * 100}%`, height: '100%', background: '#A7F3D0', borderRadius: 999 }}/>
            </div>
          </div>
        )}
      </div>

      {/* Agent quick actions */}
      <div style={{ padding: '16px 18px 4px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          { icon: <Ic.Cart s={22}/>,    label: 'Đặt đơn',    c: '#2563EB', go: () => nav.reset('products', { seg: 'sim' }) },
          { icon: <Ic.Sparkles s={22}/>, label: 'Mời người',  c: '#EC4899', go: () => nav.push('agent-referral') },
          { icon: <Ic.Book s={22}/>,    label: 'Vật liệu',   c: '#8B5CF6', go: () => nav.push('agent-history') },
          { icon: <Ic.Wallet s={22}/>,  label: 'Rút tiền',   c: '#10B981', go: () => nav.push('wallet') },
        ].map((a) => (
          <button key={a.label} onClick={a.go} className="tap" style={{
            background: 'none', border: 'none', padding: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 18,
              background: `${a.c}15`, color: a.c,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{a.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#0F172A' }}>{a.label}</div>
          </button>
        ))}
      </div>

      {/* Internal broadcast — replaces "Trở thành đại lý" promo for agents */}
      <div style={{ padding: '16px 18px 6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', letterSpacing: -0.2 }}>📣 Tin đại lý</div>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>{MOCK_BROADCAST.length} tin mới</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {MOCK_BROADCAST.map((m, i) => (
            <Card key={i} style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center' }} onClick={() => {}}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${m.tone}15`, color: m.tone, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: 11 }}>{m.tag.slice(0,2)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: m.tone, letterSpacing: 0.4 }}>{m.tag.toUpperCase()}</span>
                  <span style={{ fontSize: 10, color: '#94A3B8' }}>· {m.date}</span>
                </div>
                <div style={{ fontSize: 12.5, color: '#0F172A', fontWeight: 600, marginTop: 2, lineHeight: 1.3 }}>{m.title}</div>
              </div>
              <Ic.Chevron s={14} c="#94A3B8"/>
            </Card>
          ))}
        </div>
      </div>

      {/* SIM hot — dễ chốt, hoa hồng cao */}
      <div style={{ marginTop: 14 }}>
        <SectionHead title="SIM dễ chốt · hoa hồng cao" action="Xem tất cả" onAction={() => nav.reset('products', { seg: 'sim' })}/>
        <div style={{ display: 'flex', gap: 12, padding: '0 18px 4px', overflowX: 'auto', scrollbarWidth: 'none' }} className="scroll-area">
          {hotSims.map((s) => {
            const comm = window.estCommission ? window.estCommission(s) : Math.round(s.price * (s.commission || 0) / 100);
            return (
              <div key={s.id} onClick={() => nav.push('sim-detail', { item: s })} className="tap" style={{ width: 210, flexShrink: 0 }}>
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ height: 100, background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`, color: '#fff', padding: 12, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 8, right: 8, padding: '3px 8px', background: 'rgba(0,0,0,0.32)', borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: 0.3 }}>+{s.commission}% HH</div>
                    <div style={{ fontSize: 10, opacity: 0.85, fontWeight: 700, letterSpacing: 1 }}>{s.carrier.toUpperCase()}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, marginTop: 14, letterSpacing: -0.3 }}>{s.number}</div>
                  </div>
                  <div style={{ padding: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{s.name}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{vnd(s.price)}</span>
                    </div>
                    <div style={{ marginTop: 6, padding: '5px 8px', borderRadius: 8, background: '#10B98115', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Ic.Wallet s={11} c="#10B981"/>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>Bạn nhận ~{vnd(comm)}</span>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team activity */}
      <div style={{ marginTop: 18 }}>
        <SectionHead title="Hoạt động team" action="Xem team" onAction={() => nav.push('agent-team')}/>
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Card style={{ padding: 12, display: 'flex', gap: 10, alignItems: 'center', background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: '#10B981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ic.Cart s={20} c="#fff"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>{teamOrders24h} đơn trong 24h</div>
              <div style={{ fontSize: 11, color: '#047857', marginTop: 1 }}>Hoa hồng F2 ước ~{vnd(teamOrders24h * 280000)}</div>
            </div>
            <Ic.Chevron s={14} c="#065F46"/>
          </Card>

          {MOCK_TEAM_FEED.slice(0, 3).map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 4px', alignItems: 'center' }}>
              <Avatar name={f.who} size={34} color={f.color}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: '#0F172A' }}>
                  <strong style={{ fontWeight: 700 }}>{f.who}</strong>
                  <span style={{ fontSize: 9, fontWeight: 800, padding: '1px 5px', borderRadius: 4, background: '#E0E7FF', color: '#3730A3', marginLeft: 6, letterSpacing: 0.3 }}>{f.tier}</span>
                  <span style={{ color: '#64748B' }}> {f.action}</span>
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{f.detail} · {f.ago}</div>
              </div>
              {f.earned > 0 && <div style={{ fontSize: 11, fontWeight: 800, color: '#10B981' }}>+{vndShort(f.earned)}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Training */}
      <div style={{ marginTop: 18 }}>
        <SectionHead title="Đào tạo đại lý mới" action="Xem tất cả" onAction={() => nav.reset('products', { seg: 'course' })}/>
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(window.MOCK_COURSES || []).filter(c => c.topic === 'Kinh doanh').slice(0, 2).map((c) => (
            <Card key={c.id} onClick={() => nav.push('course-detail', { item: c })} style={{ padding: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{
                width: 76, height: 76, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, ${c.cover}, ${c.cover}88)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', position: 'relative',
              }}>
                <Ic.Play s={24} c="#fff"/>
                <div style={{ position: 'absolute', top: 6, left: 6, padding: '2px 6px', background: 'rgba(0,0,0,0.4)', borderRadius: 5, fontSize: 9, fontWeight: 700 }}>FREE đại lý</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Badge color="green">{c.level}</Badge>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A', marginTop: 4, lineHeight: 1.3 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>{c.mentor} · {c.lessons} bài · {c.duration}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 11, color: '#64748B' }}>
                  <Ic.Star s={12} f="#F59E0B"/><strong style={{ color: '#0F172A' }}>{c.rating}</strong><span>· {c.students.toLocaleString()} đại lý đã học</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Next-tier upgrade CTA */}
      {nextTier.next && (
        <div style={{ padding: '18px 18px 0' }}>
          <Card style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center', background: `linear-gradient(110deg, ${b.grad[0]} 0%, ${b.grad[1]} 100%)`, color: '#fff' }} onClick={() => nav.push('agent-dashboard')}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ic.Crown s={24} c="#fff"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>Mục tiêu: Đại lý {nextTier.next}</div>
              <div style={{ fontSize: 11, opacity: 0.9, marginTop: 2 }}>Còn {nextTier.needOrders} đơn · Hoa hồng tăng lên {nextTier.commission}</div>
            </div>
            <Ic.Chevron s={16} c="#fff"/>
          </Card>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { HomeAgentScreen });
