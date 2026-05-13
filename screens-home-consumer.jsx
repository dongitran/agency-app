// screens-home-consumer.jsx — Home tab variant for normal (non-agent) users
// Discovery-focused: warm personalized hero, find-a-SIM tools, social proof, upgrade CTA

const MOCK_TESTIMONIALS = [
  { who: 'Chị Mai · Hà Nội', age: 'Bính Tý 1996', star: 5, text: 'Đổi sang SIM Lộc Phát của bên này được 3 tháng — công việc kinh doanh thuận lợi hơn hẳn, đặc biệt khách hàng tin tưởng hơn.', sim: 'SIM Lộc Phát Tam Hoa', avatar: 'CM', color: '#EC4899' },
  { who: 'Anh Hoàng · TP.HCM', age: 'Quý Hợi 1983', star: 5, text: 'Master tư vấn rất kỹ, chọn SIM hợp mệnh Kim cho mình. Đeo vòng tỳ hưu cùng SIM Thần Tài, thấy tinh thần thoải mái.', sim: 'SIM Thần Tài Đại Cát', avatar: 'AH', color: '#0EA5E9' },
];

const MOCK_EXPERTS = [
  { name: 'Master Nguyễn Hoàng', title: 'Chuyên gia phong thủy số học', exp: '18 năm', cases: '5.2K', avatar: 'NH', color: '#DC2626', free: true },
  { name: 'Master Trần Mai Linh', title: 'Tư vấn SIM hợp tuổi · mệnh', exp: '12 năm', cases: '3.8K', avatar: 'TL', color: '#7C3AED', free: true },
];

// derive mệnh/element from phone (mock — real app would use birthday)
function inferUserElement(user) {
  if (user.element) return user.element;
  const sum = window.calcTongNut ? window.calcTongNut(user.phone) : 0;
  // tổng nút → ngũ hành mock
  const map = { 1: 'Thủy', 2: 'Thổ', 3: 'Mộc', 4: 'Mộc', 5: 'Thổ', 6: 'Kim', 7: 'Kim', 8: 'Thổ', 9: 'Hỏa' };
  return map[sum] || 'Hỏa';
}

const ELEMENT_COLOR = { Hỏa: '#DC2626', Thủy: '#0EA5E9', Mộc: '#10B981', Kim: '#F59E0B', Thổ: '#A16207' };

// Auto-rotating promo carousel.
// Pauses for 6s after any user interaction (tap dot, swipe, tap slide) so the
// content doesn't slide away while they're reading or about to tap CTA.
function PromoCarousel({ slides, brand }) {
  const b = getBrand(brand);
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const touchStart = React.useRef(null);
  const resumeTimer = React.useRef(null);

  const n = slides.length;
  const pauseBriefly = () => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 6000);
  };

  React.useEffect(() => {
    if (paused || n <= 1) return undefined;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 4500);
    return () => clearInterval(t);
  }, [paused, n]);

  React.useEffect(() => () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); }, []);

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(dx) > 40) {
      setIdx((i) => (dx < 0 ? (i + 1) % n : (i - 1 + n) % n));
      pauseBriefly();
    }
  };

  return (
    <div style={{ padding: '16px 18px 6px' }}>
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ position: 'relative', overflow: 'hidden', borderRadius: 20 }}
      >
        <div style={{
          display: 'flex',
          transition: 'transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1)',
          transform: `translateX(-${idx * 100}%)`,
          willChange: 'transform',
        }}>
          {slides.map((s, i) => (
            <div key={i} onClick={s.onClick} className="tap" style={{
              flex: '0 0 100%',
              padding: 18, position: 'relative', overflow: 'hidden',
              background: s.bg, color: '#fff', minHeight: 122,
              borderRadius: 20,
            }}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', filter: 'blur(20px)' }}/>
              <div style={{ position: 'absolute', bottom: -16, right: 14, fontSize: 56, opacity: 0.16, lineHeight: 1 }}>{s.icon}</div>
              <Badge color="amber" style={{ position: 'relative' }}>{s.tag}</Badge>
              <div style={{ fontSize: 17, fontWeight: 800, marginTop: 8, letterSpacing: -0.3, lineHeight: 1.25, position: 'relative' }}>{s.title}</div>
              {s.subtitle && <div style={{ fontSize: 12.5, opacity: 0.9, fontWeight: 500, marginTop: 3, position: 'relative' }}>{s.subtitle}</div>}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, position: 'relative' }}>
                <span style={{ fontSize: 11.5, opacity: 0.95, fontWeight: 700 }}>{s.cta}</span>
                <Ic.Chevron s={13} c="#fff"/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {n > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 10 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); pauseBriefly(); }}
              className="tap"
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === idx ? 20 : 6, height: 6, borderRadius: 3,
                background: i === idx ? b.solid : '#CBD5E1',
                border: 'none', padding: 0,
                transition: 'width 0.3s cubic-bezier(0.2, 0.7, 0.2, 1), background 0.2s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function HomeConsumerScreen({ nav, user, brand, addToCart, cartCount }) {
  const b = getBrand(brand);
  const element = inferUserElement(user);
  const elemColor = ELEMENT_COLOR[element] || b.solid;
  const firstName = (user.name || '').split(' ').slice(-1)[0];

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 11) return 'Chào buổi sáng';
    if (h < 14) return 'Chào buổi trưa';
    if (h < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  })();

  // SIM hợp mệnh bạn
  const matchedSims = (window.MOCK_SIMS || [])
    .filter(s => (s.compatibleElements || []).includes(element))
    .slice(0, 4);
  const fallbackSims = (window.MOCK_SIMS || []).slice(0, 4);
  const personalizedSims = matchedSims.length > 0 ? matchedSims : fallbackSims;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', overflow: 'auto', paddingBottom: 100 }} className="scroll-area anim-fade">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 8 }}>
        <IOSStatusBar dark={true}/>
      </div>

      {/* Warm personalized hero */}
      <div className="screen-hero" style={{
        position: 'relative',
        background: `linear-gradient(160deg, ${b.grad[0]} 0%, ${b.grad[1]} 100%)`,
        color: '#fff', padding: '64px 18px 22px', borderRadius: '0 0 28px 28px',
        overflow: 'hidden',
      }}>
        {/* decorative orbs */}
        <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }}/>
        <div style={{ position: 'absolute', bottom: -70, left: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
        {/* big yin yang faint */}
        <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 90, opacity: 0.06, lineHeight: 1 }}>☯</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name={user.name} size={42}/>
            <div>
              <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 500 }}>{greeting},</div>
              <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.2 }}>{firstName} 🌿</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="tap" style={btnGlass}><Ic.Bell s={20} c="#fff"/></button>
            <button className="tap" style={btnGlass} onClick={() => nav.push('cart')}>
              <Ic.Cart s={20} c="#fff"/>
              {cartCount > 0 && <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16, borderRadius: 8, background: '#EF4444', color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Personalized tile: mệnh/tuổi suggestion */}
        <div onClick={() => nav.reset('tuvi')} className="tap" style={{
          marginTop: 22, padding: 16, borderRadius: 20,
          background: 'rgba(255,255,255,0.16)',
          border: '1px solid rgba(255,255,255,0.22)',
          backdropFilter: 'blur(14px)', position: 'relative',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>✨</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 600 }}>Gợi ý cho bạn · mệnh {element}</div>
            <div style={{ fontSize: 16, fontWeight: 800, marginTop: 2, letterSpacing: -0.3 }}>{matchedSims.length} SIM hợp mệnh đã chờ sẵn</div>
          </div>
          <Ic.Chevron s={16} c="#fff"/>
        </div>
      </div>

      {/* Search bar — consumer phrasing */}
      <div style={{ padding: '16px 18px 4px' }}>
        <div onClick={() => nav.push('search')} className="tap" style={{
          height: 48, padding: '0 16px', background: '#fff',
          borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12,
          border: '1px solid #E2E8F0', color: '#94A3B8',
        }}>
          <Ic.Search s={20} c="#94A3B8"/>
          <span style={{ fontSize: 14 }}>Tìm SIM theo tuổi, ngày sinh, tổng nút…</span>
        </div>
      </div>

      {/* Consumer quick actions */}
      <div style={{ padding: '14px 18px 4px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          { icon: <Ic.Sim s={22}/>,      label: 'SIM hợp mệnh', c: elemColor, go: () => nav.reset('products', { seg: 'sim', filter: { element } }) },
          { icon: <Ic.Sparkles s={22}/>, label: 'Tử vi',        c: '#8B5CF6', go: () => nav.reset('tuvi') },
          { icon: <Ic.User s={22}/>,     label: 'Tư vấn 1-1',  c: '#EC4899', go: () => nav.push('agent-referral') },
          { icon: <Ic.Book s={22}/>,     label: 'Khóa học',     c: '#0EA5E9', go: () => nav.reset('products', { seg: 'course' }) },
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

      {/* Promo carousel — auto-rotate, swipe + dot nav */}
      <PromoCarousel
        brand={brand}
        slides={[
          { tag: '🔥 ƯU ĐÃI', icon: '🎁', title: 'Combo SIM + Khóa Phong Thủy', subtitle: 'Tặng Vòng Đá · giảm 30%', cta: 'Còn 4 ngày · Đặt ngay', bg: 'linear-gradient(110deg, #831843 0%, #BE185D 100%)', onClick: () => nav.reset('products', { seg: 'sim' }) },
          { tag: '🎯 SIM HOT',  icon: '💰', title: 'SIM Thần Tài 79·79·79', subtitle: 'Tặng kèm 12 tháng data 5G',     cta: 'Xem chi tiết',           bg: 'linear-gradient(110deg, #064E3B 0%, #059669 100%)', onClick: () => nav.reset('products', { seg: 'sim' }) },
          { tag: '👨‍🏫 FREE',     icon: '🔮', title: 'Tư vấn 1-1 với Master',     subtitle: 'Chọn SIM hợp tuổi · mệnh', cta: 'Đặt lịch miễn phí',      bg: 'linear-gradient(110deg, #1E3A8A 0%, #3B82F6 100%)', onClick: () => nav.push('agent-referral') },
          { tag: '🎓 KHÓA HỌC', icon: '📚', title: 'Phong thủy số học cơ bản',   subtitle: 'Giảm 40% · học trọn đời',  cta: 'Đăng ký ngay',           bg: 'linear-gradient(110deg, #4C1D95 0%, #7C3AED 100%)', onClick: () => nav.reset('products', { seg: 'course' }) },
          { tag: '✨ MỚI',       icon: '📿', title: 'Vòng đá Thạch Anh Hồng',    subtitle: 'Mua kèm SIM · bói duyên miễn phí', cta: 'Khám phá',     bg: 'linear-gradient(110deg, #9F1239 0%, #F43F5E 100%)', onClick: () => nav.reset('products', { seg: 'accessory' }) },
        ]}
      />

      {/* SIM hợp mệnh — personalized */}
      <div style={{ marginTop: 14 }}>
        <SectionHead title={`SIM hợp mệnh ${element} của bạn`} action="Xem tất cả" onAction={() => nav.reset('products', { seg: 'sim', filter: { element } })}/>
        <div style={{ display: 'flex', gap: 12, padding: '0 18px 4px', overflowX: 'auto', scrollbarWidth: 'none' }} className="scroll-area">
          {personalizedSims.map((s) => (
            <div key={s.id} onClick={() => nav.push('sim-detail', { item: s })} className="tap" style={{ width: 210, flexShrink: 0 }}>
              <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: 110, background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`, color: '#fff', padding: 14, position: 'relative' }}>
                  <Badge color="amber" style={{ position: 'absolute', top: 10, right: 10 }}>{s.tag}</Badge>
                  <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 700, letterSpacing: 1 }}>{s.carrier.toUpperCase()}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, marginTop: 16, letterSpacing: -0.3 }}>{s.number}</div>
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Mệnh {s.element} · Tổng {s.sum}</div>
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

      {/* Free expert consult */}
      <div style={{ marginTop: 18 }}>
        <SectionHead title="Tư vấn 1-1 miễn phí" action="Xem chuyên gia" onAction={() => nav.push('agent-referral')}/>
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MOCK_EXPERTS.map((e, i) => (
            <Card key={i} style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center' }} onClick={() => nav.push('agent-referral')}>
              <Avatar name={e.name} size={48} color={e.color}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A' }}>{e.name}</span>
                  {e.free && <span style={{ fontSize: 9, fontWeight: 800, padding: '1px 5px', borderRadius: 4, background: '#DCFCE7', color: '#166534', letterSpacing: 0.3 }}>FREE</span>}
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{e.title}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{e.exp} kinh nghiệm · {e.cases} ca tư vấn</div>
              </div>
              <PrimaryButton size="sm" brand={brand} style={{ padding: '6px 12px', fontSize: 12 }}>Đặt lịch</PrimaryButton>
            </Card>
          ))}
        </div>
      </div>

      {/* Courses for beginners */}
      <div style={{ marginTop: 18 }}>
        <SectionHead title="Khóa học cho người mới" action="Xem tất cả" onAction={() => nav.reset('products', { seg: 'course' })}/>
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(window.MOCK_COURSES || []).filter(c => c.level === 'Nhập môn' || c.level === 'Cơ bản').slice(0, 2).map((c) => (
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

      {/* Social proof — testimonials */}
      <div style={{ marginTop: 18 }}>
        <SectionHead title="Khách kể chuyện thật"/>
        <div style={{ display: 'flex', gap: 12, padding: '0 18px 4px', overflowX: 'auto', scrollbarWidth: 'none' }} className="scroll-area">
          {MOCK_TESTIMONIALS.map((t, i) => (
            <Card key={i} style={{ padding: 14, width: 280, flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Avatar name={t.who} size={36} color={t.color}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>{t.who}</div>
                  <div style={{ fontSize: 10, color: '#64748B' }}>{t.age}</div>
                </div>
                <div style={{ display: 'flex', gap: 1 }}>
                  {Array.from({ length: t.star }).map((_, j) => <Ic.Star key={j} s={11} f="#F59E0B"/>)}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: '#334155', marginTop: 10, lineHeight: 1.5 }}>"{t.text}"</div>
              <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 8, background: '#F8FAFC', fontSize: 11, color: '#64748B', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Ic.Sim s={11} c="#64748B"/>
                <span>Đã mua: <strong style={{ color: '#0F172A' }}>{t.sim}</strong></span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Upgrade CTA — soft sell into agent program */}
      <div style={{ padding: '18px 18px 0' }}>
        <Card style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center', background: b.soft, border: `1px solid ${b.solid}20` }} onClick={() => nav.push('agent-packages')}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ic.Crown s={22} c="#fff"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Có người hỏi mua SIM của bạn?</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>Trở thành đại lý SimPlus · Nhận hoa hồng đến 25%</div>
          </div>
          <Ic.Chevron s={16} c={b.solid}/>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { HomeConsumerScreen });
