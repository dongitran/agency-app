// screens-experts.jsx — Experts list + detail/booking screens
// Consultations are treated as a product: each expert has packages with
// price/commission and bookable time slots.

function ExpertsListScreen({ nav, brand, user }) {
  const b = getBrand(brand);
  const experts = window.MOCK_EXPERTS || [];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', overflow: 'auto', paddingBottom: 100 }} className="scroll-area anim-slide-in">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 8 }}>
        <IOSStatusBar dark={true}/>
      </div>
      <div className="screen-hero" style={{
        background: `linear-gradient(160deg, ${b.grad[0]}, ${b.grad[1]})`,
        padding: '64px 18px 24px', color: '#fff', borderRadius: '0 0 28px 28px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }}/>
        <div style={{ position: 'relative', display: 'flex', gap: 10, alignItems: 'center', marginTop: 4 }}>
          <button onClick={() => nav.pop()} className="tap" style={{...btnGlass, background: 'rgba(255,255,255,0.2)'}}><Ic.Back s={20} c="#fff"/></button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>Hỏi chuyên gia</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>{experts.length} chuyên gia · phong thủy · tử vi · coaching</div>
          </div>
        </div>

        {/* Glass info tile */}
        <div style={{ position: 'relative', marginTop: 18, padding: 14, borderRadius: 16, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(12px)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontSize: 28 }}>🛡️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: -0.2 }}>Tư vấn 15 phút · từ 179.000đ</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>Master uy tín · hoàn tiền nếu không hài lòng</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {experts.map((e) => {
          const cheapestPkg = (e.packages || []).reduce((min, p) => !min || p.price < min.price ? p : min, null);
          return (
            <Card key={e.id} style={{ padding: 14, display: 'flex', gap: 14, alignItems: 'flex-start' }} onClick={() => nav.push('expert-detail', { item: e })}>
              <Avatar name={e.name} size={56} color={e.color}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14.5, fontWeight: 800, color: '#0F172A' }}>{e.name}</span>
                </div>
                <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>{e.title}</div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 11, color: '#64748B', marginTop: 6 }}>
                  <Ic.Star s={12} f="#F59E0B"/><strong style={{ color: '#0F172A' }}>{e.rating}</strong>
                  <span>· {e.reviews.toLocaleString()} đánh giá · {e.exp} kinh nghiệm</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                  {(e.specialties || []).slice(0, 3).map((s) => (
                    <span key={s} style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 999, background: '#F1F5F9', color: '#475569' }}>{s}</span>
                  ))}
                </div>
                {cheapestPkg && (
                  <div style={{ marginTop: 10, padding: '6px 10px', borderRadius: 8, background: '#FEF3C7', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 10, color: '#92400E', fontWeight: 700 }}>Từ</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#92400E' }}>{vnd(cheapestPkg.price)}</span>
                    <span style={{ fontSize: 10, color: '#92400E', opacity: 0.75 }}>· {cheapestPkg.duration}</span>
                  </div>
                )}
              </div>
              <Ic.Chevron s={16} c="#94A3B8"/>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ExpertDetailScreen({ nav, brand, user, item: expert, addToCart, showToast }) {
  const b = getBrand(brand);
  if (!expert) {
    return (
      <div style={{ padding: 24 }}>
        <button onClick={() => nav.pop()}>← Back</button>
        <div>Không tìm thấy chuyên gia.</div>
      </div>
    );
  }

  const [pkgIdx, setPkgIdx] = React.useState(0);
  const [slotIdx, setSlotIdx] = React.useState(0);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const pkg = expert.packages[pkgIdx];
  const slot = expert.slots[slotIdx];

  const onConfirm = () => {
    setConfirmOpen(false);
    showToast && showToast(`Đã đặt lịch với ${expert.name} · ${slot}`);
    setTimeout(() => nav.pop(), 200);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', overflow: 'auto', paddingBottom: 110 }} className="scroll-area anim-slide-in">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 8 }}>
        <IOSStatusBar dark={true}/>
      </div>
      {/* Hero */}
      <div className="screen-hero" style={{
        background: `linear-gradient(160deg, ${expert.color}, ${expert.color}aa)`,
        padding: '64px 18px 22px', color: '#fff', borderRadius: '0 0 28px 28px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }}/>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <button onClick={() => nav.pop()} className="tap" style={{...btnGlass, background: 'rgba(255,255,255,0.2)'}}><Ic.Back s={20} c="#fff"/></button>
          <button className="tap" style={{...btnGlass, background: 'rgba(255,255,255,0.2)'}}><Ic.Share s={18} c="#fff"/></button>
        </div>

        <div style={{ position: 'relative', display: 'flex', gap: 14, alignItems: 'center', marginTop: 14 }}>
          <Avatar name={expert.name} size={72} color="rgba(255,255,255,0.95)"/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>{expert.name}</div>
            <div style={{ fontSize: 12, opacity: 0.92, marginTop: 3 }}>{expert.title}</div>
            <div style={{ display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.22)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <Ic.Star s={10} f="#FBBF24"/>{expert.rating} ({expert.reviews.toLocaleString()})
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.22)' }}>{expert.exp}</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.22)' }}>{expert.cases} ca</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div style={{ padding: '16px 18px 0' }}>
        <Card style={{ padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', letterSpacing: 0.4, marginBottom: 6 }}>GIỚI THIỆU</div>
          <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.55 }}>{expert.bio}</div>
        </Card>
      </div>

      {/* Specialties */}
      <div style={{ padding: '12px 18px 0' }}>
        <Card style={{ padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', letterSpacing: 0.4, marginBottom: 10 }}>CHUYÊN MÔN</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {expert.specialties.map((s) => (
              <span key={s} style={{ fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 999, background: `${expert.color}15`, color: expert.color }}>{s}</span>
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
            <Ic.Mail s={12} c="#94A3B8"/>
            <span>Ngôn ngữ: {expert.languages.join(' · ')}</span>
          </div>
        </Card>
      </div>

      {/* Packages */}
      <div style={{ padding: '12px 18px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', letterSpacing: 0.4, marginBottom: 10, paddingLeft: 4 }}>CHỌN GÓI TƯ VẤN</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {expert.packages.map((p, i) => {
            const active = pkgIdx === i;
            const comm = user?.isAgent && p.commission ? Math.round(p.price * p.commission / 100) : 0;
            return (
              <Card key={p.id} onClick={() => setPkgIdx(i)} style={{
                padding: 14,
                border: active ? `2px solid ${expert.color}` : '1px solid transparent',
                background: active ? `${expert.color}08` : '#fff',
                position: 'relative',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{p.name}</span>
                      {p.tag && <span style={{
                        fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4,
                        background: p.tag === 'Bán chạy' ? '#FEF3C7' : '#F3E8FF',
                        color:      p.tag === 'Bán chạy' ? '#92400E' : '#6B21A8',
                        letterSpacing: 0.3,
                      }}>{p.tag}</span>}
                    </div>
                    <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 4 }}>{p.duration}</div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{p.format}</div>
                    {comm > 0 && (
                      <div style={{ marginTop: 6, padding: '3px 8px', borderRadius: 6, background: '#ECFDF5', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Ic.Wallet s={10} c="#059669"/>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#059669' }}>Bạn nhận ~{vnd(comm)}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', letterSpacing: -0.3 }}>
                      {vnd(p.price)}
                    </div>
                  </div>
                </div>
                {active && (
                  <div style={{ position: 'absolute', top: 10, right: 10, width: 18, height: 18, borderRadius: 999, background: expert.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Ic.Check s={11} c="#fff" w={3}/>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <div style={{ padding: '14px 18px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', letterSpacing: 0.4, marginBottom: 10, paddingLeft: 4 }}>CHỌN LỊCH TRỐNG</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {expert.slots.map((s, i) => {
            const active = slotIdx === i;
            return (
              <button key={s} onClick={() => setSlotIdx(i)} className="tap" style={{
                padding: '8px 12px', borderRadius: 12,
                background: active ? expert.color : '#fff',
                color: active ? '#fff' : '#0F172A',
                border: active ? `2px solid ${expert.color}` : '1px solid #E2E8F0',
                fontSize: 12, fontWeight: 700,
              }}>{s}</button>
            );
          })}
        </div>
      </div>

      {/* Action bar */}
      <ActionBar>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: '#64748B', fontWeight: 700, letterSpacing: 0.3 }}>{slot.toUpperCase()}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginTop: 1 }}>
            {vnd(pkg.price)}
          </div>
        </div>
        <PrimaryButton brand={brand} onClick={() => setConfirmOpen(true)} style={{ minWidth: 150 }}>
          Đặt lịch
        </PrimaryButton>
      </ActionBar>

      <Sheet open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Xác nhận lịch hẹn" maxHeight="70%" bottomOffset={88}>
        <div style={{ padding: '0 4px' }}>
          <Card style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar name={expert.name} size={44} color={expert.color}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>{expert.name}</div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{expert.title}</div>
            </div>
          </Card>

          <div style={{ marginTop: 14, padding: 14, borderRadius: 14, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <Row label="Gói tư vấn" value={pkg.name}/>
            <Row label="Thời lượng" value={pkg.duration}/>
            <Row label="Thời gian" value={slot}/>
            <Row label="Hình thức" value={pkg.format}/>
            <div style={{ height: 1, background: '#E2E8F0', margin: '10px 0' }}/>
            <Row label="Phí" value={vnd(pkg.price)} bold/>
          </div>

          <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: '#FFFBEB', border: '1px solid #FDE68A', display: 'flex', gap: 10 }}>
            <span style={{ fontSize: 18 }}>📲</span>
            <div style={{ fontSize: 11.5, color: '#92400E', lineHeight: 1.5 }}>
              Tin nhắn xác nhận và link Zalo/Meet sẽ được gửi đến số <strong>{user.phone}</strong> ngay khi xác nhận.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <GhostButton brand={brand} fullWidth onClick={() => setConfirmOpen(false)}>Huỷ</GhostButton>
            <PrimaryButton brand={brand} fullWidth onClick={onConfirm}>Thanh toán & xác nhận</PrimaryButton>
          </div>
        </div>
      </Sheet>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
      <span style={{ fontSize: 12, color: '#64748B' }}>{label}</span>
      <span style={{ fontSize: bold ? 14 : 12.5, fontWeight: bold ? 800 : 600, color: '#0F172A' }}>{value}</span>
    </div>
  );
}

Object.assign(window, { ExpertsListScreen, ExpertDetailScreen });
