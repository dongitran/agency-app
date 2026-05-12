// screens-home.jsx — Home tab with hero variants + featured

const MOCK_SIMS = [
  { id: 's1', name: 'Lộc Phát Tam Hoa', carrier: 'Viettel', number: '0868 86 86 86', price: 5990000, oldPrice: 7990000, data: '120GB/tháng', call: 'Miễn phí nội mạng', tag: 'Lộc phát', color: '#16A34A', img: 'V', element: 'Hỏa', sum: 68, meaning: 'Lộc về dồi dào, công danh hanh thông' },
  { id: 's2', name: 'Thần Tài Đại Cát', carrier: 'MobiFone', number: '0979 39 39 79', price: 12990000, data: 'Không giới hạn', call: 'Không giới hạn', tag: 'Thần tài', color: '#7C3AED', img: 'M', element: 'Kim', sum: 70, meaning: 'Thần tài độ mệnh, làm ăn phát đạt' },
  { id: 's3', name: 'Phát Lộc Ngũ Quý', carrier: 'Viettel', number: '0988 88 88 88', price: 89990000, data: 'Không giới hạn', call: 'Không giới hạn', tag: 'Ngũ quý', color: '#DC2626', img: 'V', element: 'Hỏa', sum: 65, meaning: 'Đại phát đại quý, sự nghiệp viên mãn' },
  { id: 's4', name: 'Bình An Hợp Mệnh', carrier: 'Vinaphone', number: '0911 26 36 86', price: 2990000, oldPrice: 3990000, data: '90GB/tháng', call: 'Miễn phí mọi mạng', tag: 'Hợp mệnh', color: '#0EA5E9', img: 'V', element: 'Thủy', sum: 50, meaning: 'An khang thịnh vượng, gia đạo bình yên' },
  { id: 's5', name: 'Tài Lộc Tứ Quý', carrier: 'MobiFone', number: '0903 6668 6668', price: 8990000, data: '120GB/tháng', call: 'Miễn phí', tag: 'Tứ quý', color: '#F59E0B', img: 'M', element: 'Thổ', sum: 62, meaning: 'Lộc đến nhà, công việc thuận buồm' },
  { id: 's6', name: 'Quý Nhân Tam Hoa', carrier: 'Vinaphone', number: '0916 79 79 79', price: 4990000, oldPrice: 6990000, data: 'Không giới hạn', call: 'Miễn phí', tag: 'Tam hoa', color: '#10B981', img: 'V', element: 'Mộc', sum: 67, meaning: 'Quý nhân phù trợ, đường tài lộc rộng mở' },
];

const MOCK_COURSES = [
  { id: 'c1', name: 'Phong thủy số học cơ bản', mentor: 'Master Nguyễn Hoàng', price: 499000, oldPrice: 799000, rating: 4.9, students: 2840, duration: '14 giờ', lessons: 42, level: 'Nhập môn', cover: '#DC2626', topic: 'Phong thủy' },
  { id: 'c2', name: 'Tư vấn SIM hợp tuổi · hợp mệnh', mentor: 'Master Trần Mai Linh', price: 1299000, rating: 4.8, students: 1568, duration: '20 giờ', lessons: 58, level: 'Nâng cao', cover: '#7C3AED', topic: 'Phong thủy' },
  { id: 'c3', name: 'Tư duy thịnh vượng & năng lượng tích cực', mentor: 'Coach Lê Quang Vũ', price: 599000, oldPrice: 899000, rating: 4.9, students: 4103, duration: '10 giờ', lessons: 24, level: 'Cơ bản', cover: '#EC4899', topic: 'Tư duy' },
  { id: 'c4', name: 'Tư duy phục vụ khách hàng đẳng cấp', mentor: 'Coach Phạm Đức Anh', price: 399000, rating: 4.7, students: 1823, duration: '8 giờ', lessons: 18, level: 'Cơ bản', cover: '#F59E0B', topic: 'Tư duy' },
  { id: 'c5', name: 'Khởi nghiệp kinh doanh SIM phong thủy', mentor: 'Nguyễn Thành Đạt', price: 999000, oldPrice: 1499000, rating: 4.8, students: 1245, duration: '16 giờ', lessons: 48, level: 'Trung cấp', cover: '#0EA5E9', topic: 'Kinh doanh' },
  { id: 'c6', name: 'Xây hệ thống đại lý F1·F2·F3', mentor: 'Trần Hoàng Việt', price: 1499000, rating: 4.9, students: 568, duration: '20 giờ', lessons: 52, level: 'Nâng cao', cover: '#16A34A', topic: 'Kinh doanh' },
];

function HomeScreen({ nav, user, brand, homeHero, addToCart, cartCount }) {
  const b = getBrand(brand);
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 11) return 'Chào buổi sáng';
    if (h < 14) return 'Chào buổi trưa';
    if (h < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  })();

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', overflow: 'auto', paddingBottom: 100 }} className="scroll-area anim-fade">
      {/* iOS status bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 8 }}>
        <IOSStatusBar dark={homeHero !== 'minimal'}/>
      </div>

      {/* Hero variants */}
      {homeHero === 'gradient' && (
        <div className="screen-hero" style={{
          position: 'relative',
          background: `linear-gradient(160deg, ${b.grad[0]} 0%, ${b.grad[1]} 100%)`,
          color: '#fff', padding: '64px 18px 26px', borderRadius: '0 0 28px 28px',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }}/>
          <div style={{ position: 'absolute', bottom: -50, left: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={user.name} size={42}/>
              <div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>{greeting} 👋</div>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.2 }}>{user.name}</div>
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

          {/* wallet pill */}
          <div onClick={() => nav.push('wallet')} className="tap" style={{
            marginTop: 22, padding: 16, borderRadius: 20,
            background: 'rgba(255,255,255,0.16)',
            border: '1px solid rgba(255,255,255,0.22)',
            backdropFilter: 'blur(14px)', position: 'relative',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ic.Wallet s={22} c="#fff"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, opacity: 0.8, fontWeight: 600 }}>Số dư ví & hoa hồng tháng này</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
                <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>{vnd(user.balance)}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#A7F3D0', display: 'inline-flex', alignItems: 'center', gap: 2 }}><Ic.ArrowUp s={10} c="#A7F3D0"/>+24%</span>
              </div>
            </div>
            <Ic.Chevron s={16} c="#fff"/>
          </div>
        </div>
      )}

      {homeHero === 'stats' && (
        <div className="screen-hero" style={{ padding: '64px 18px 16px', background: '#fff', borderRadius: '0 0 28px 28px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={user.name} size={42}/>
              <div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{greeting} 👋</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{user.name}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="tap" style={{...btnGlass, background: '#F1F5F9', position: 'relative'}}><Ic.Bell s={20} c="#0F172A"/></button>
              <button className="tap" style={{...btnGlass, background: '#F1F5F9', position: 'relative'}} onClick={() => nav.push('cart')}>
                <Ic.Cart s={20} c="#0F172A"/>
                {cartCount > 0 && <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16, borderRadius: 8, background: '#EF4444', color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{cartCount}</span>}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 18 }}>
            <div style={{ padding: 14, borderRadius: 16, background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, color: '#fff' }}>
              <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 600 }}>Hoa hồng tháng</div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.4, marginTop: 4 }}>{vnd(user.balance)}</div>
              <Spark data={[3,4,3.5,5,4,6,7]} color="#fff" width={90} height={28}/>
            </div>
            <div style={{ padding: 14, borderRadius: 16, background: '#F1F5F9' }}>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Team & đơn tháng</div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.4, color: '#0F172A', marginTop: 4 }}>32 <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>thành viên</span></div>
              <div style={{ fontSize: 12, color: '#15803D', fontWeight: 700, marginTop: 6 }}>+58 đơn hợp lệ</div>
            </div>
          </div>
        </div>
      )}

      {homeHero === 'minimal' && (
        <div className="screen-hero" style={{ padding: '60px 18px 12px', background: '#F4F6FB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{greeting},</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', letterSpacing: -0.6 }}>{user.name.split(' ').slice(-1)[0]}.</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="tap" style={{...btnGlass, background: '#fff'}}><Ic.Bell s={20} c="#0F172A"/></button>
              <button className="tap" style={{...btnGlass, background: '#fff', position: 'relative'}} onClick={() => nav.push('cart')}>
                <Ic.Cart s={20} c="#0F172A"/>
                {cartCount > 0 && <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16, borderRadius: 8, background: b.solid, color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div style={{ padding: '16px 18px 4px' }}>
        <div onClick={() => nav.push('search')} className="tap" style={{
          height: 48, padding: '0 16px', background: '#fff',
          borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12,
          border: '1px solid #E2E8F0', color: '#94A3B8',
        }}>
          <Ic.Search s={20} c="#94A3B8"/>
          <span style={{ fontSize: 14 }}>Tìm SIM hợp tuổi · mệnh · tổng nút…</span>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '14px 18px 4px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          { icon: <Ic.Sim s={22}/>, label: 'Mua SIM', c: '#3B82F6', to: 'sim-list' },
          { icon: <Ic.Book s={22}/>, label: 'Khóa học', c: '#8B5CF6', to: 'course-list' },
          { icon: <Ic.Agent s={22}/>, label: 'Đại lý', c: '#10B981', to: 'agent-packages' },
          { icon: <Ic.Wallet s={22}/>, label: 'Nạp/Rút', c: '#F59E0B', to: 'wallet' },
        ].map((a) => (
          <button key={a.label} onClick={() => nav.push(a.to)} className="tap" style={{
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

      {/* Promo banner */}
      <div style={{ padding: '16px 18px 6px' }}>
        <div onClick={() => nav.push('agent-packages')} className="tap" style={{
          padding: 18, borderRadius: 20, position: 'relative', overflow: 'hidden',
          background: `linear-gradient(110deg, #0F172A 0%, #1E293B 100%)`,
          color: '#fff',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 140, height: 140, borderRadius: '50%', background: `${b.solid}30`, filter: 'blur(20px)' }}/>
          <Badge color="amber" style={{ position: 'relative' }}>🔥 GIẢM 30%</Badge>
          <div style={{ fontSize: 18, fontWeight: 800, marginTop: 8, letterSpacing: -0.3, lineHeight: 1.25, position: 'relative' }}>Trở thành đại lý<br/>F1 — kiếm 25% hoa hồng</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, position: 'relative' }}>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Xem 3 gói đại lý</span>
            <Ic.Chevron s={14} c="#fff"/>
          </div>
        </div>
      </div>

      {/* SIM section */}
      <div style={{ marginTop: 14 }}>
        <SectionHead title="SIM nổi bật" action="Xem tất cả" onAction={() => nav.push('sim-list')}/>
        <div style={{ display: 'flex', gap: 12, padding: '0 18px 4px', overflowX: 'auto', scrollbarWidth: 'none' }} className="scroll-area">
          {MOCK_SIMS.slice(0,3).map((s) => (
            <div key={s.id} onClick={() => nav.push('sim-detail', { item: s })} className="tap" style={{ width: 200, flexShrink: 0 }}>
              <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: 110, background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`, color: '#fff', padding: 14, position: 'relative' }}>
                  <Badge color="amber" style={{ position: 'absolute', top: 10, right: 10 }}>{s.tag}</Badge>
                  <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 700, letterSpacing: 1 }}>{s.carrier.toUpperCase()}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, marginTop: 16, letterSpacing: -0.3 }}>{s.number}</div>
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{s.data}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: b.solid }}>{vnd(s.price)}</span>
                    {s.oldPrice && <span style={{ fontSize: 11, color: '#94A3B8', textDecoration: 'line-through' }}>{vnd(s.oldPrice)}</span>}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Courses section */}
      <div style={{ marginTop: 18 }}>
        <SectionHead title="Khóa học bán chạy" action="Xem tất cả" onAction={() => nav.push('course-list')}/>
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MOCK_COURSES.slice(0,2).map((c) => (
            <Card key={c.id} onClick={() => nav.push('course-detail', { item: c })} style={{ padding: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{
                width: 84, height: 84, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, ${c.cover}, ${c.cover}88)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', position: 'relative',
              }}>
                <Ic.Play s={26} c="#fff"/>
                <div style={{ position: 'absolute', bottom: 6, left: 6, padding: '2px 6px', background: 'rgba(0,0,0,0.4)', borderRadius: 5, fontSize: 9, fontWeight: 700 }}>{c.duration}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Badge color="purple">{c.level}</Badge>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginTop: 4, lineHeight: 1.3 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>{c.mentor} · {c.lessons} bài</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 11, color: '#64748B' }}>
                    <Ic.Star s={12} f="#F59E0B"/><strong style={{ color: '#0F172A' }}>{c.rating}</strong><span>· {c.students.toLocaleString()}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: b.solid }}>{vnd(c.price)}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Agent quick CTA */}
      <div style={{ padding: '16px 18px 0' }}>
        <Card style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center', background: b.soft, border: `1px solid ${b.solid}20` }} onClick={() => user.isAgent ? nav.push('agent-dashboard') : nav.push('agent-packages')}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ic.Crown s={22} c="#fff"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{user.isAgent ? 'Vào dashboard đại lý' : 'Trở thành đại lý SimPlus'}</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{user.isAgent ? `Cấp ${user.agentTier} · ${user.team} thành viên team` : 'Nhận hoa hồng F1·F2·F3 đến 25%'}</div>
          </div>
          <Ic.Chevron s={16} c={b.solid}/>
        </Card>
      </div>
    </div>
  );
}

const btnGlass = {
  width: 38, height: 38, borderRadius: 12,
  background: 'rgba(255,255,255,0.2)',
  border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
  position: 'relative',
};
const dotPing = {
  position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4,
  background: '#EF4444', border: '1.5px solid #fff', animation: 'pulse 1.6s infinite',
};

Object.assign(window, { HomeScreen, MOCK_SIMS, MOCK_COURSES });
