// screens-orders.jsx — Order history list + detail

const MOCK_ORDERS = [
  { id: 'SP12345678', date: '12/05/2026', items: [{ name: 'SIM Lộc Phát · 0868 86 86 86', type: 'sim', price: 5990000 }], total: 5990000, status: 'completed', tracking: { carrier: 'GHN Express', code: 'GHN9128347123', delivered: '14/05/2026 10:24' } },
  { id: 'SP12345677', date: '08/05/2026', items: [{ name: 'Tượng Tỳ Hưu Phong Thủy', type: 'accessory', price: 2490000 }], total: 2490000, status: 'shipped', tracking: { carrier: 'GHTK Tiêu chuẩn', code: 'GHTK00871234', step: 'delivering', eta: '14/05/2026' } },
  { id: 'SP12345676', date: '02/05/2026', items: [{ name: 'SIM Hợp Mệnh · 0911 26 36 86', type: 'sim', price: 2990000 }, { name: 'Khóa học · Phong thủy số học cơ bản', type: 'course', price: 499000 }], total: 3489000, status: 'waiting-payment' },
  { id: 'SP12345675', date: '28/04/2026', items: [{ name: 'Gói đại lý Bạc', type: 'agent', price: 1990000 }], total: 1990000, status: 'completed' },
  { id: 'SP12345674', date: '15/04/2026', items: [{ name: 'SIM Thần Tài · 0979 39 39 79', type: 'sim', price: 12990000 }], total: 12990000, status: 'cancelled' },
];

const STATUS = {
  'completed':       { c: 'green',  l: 'Hoàn tất' },
  'shipped':         { c: 'blue',   l: 'Đang giao' },
  'processing':      { c: 'blue',   l: 'Đang xử lý' },
  'waiting-payment': { c: 'amber',  l: 'Chờ thanh toán' },
  'cancelled':       { c: 'red',    l: 'Đã hủy' },
};

const TRACK_STEPS = [
  { id: 'ready_to_pick', l: 'Đã nhận đơn' },
  { id: 'picking',       l: 'Đang lấy hàng' },
  { id: 'transporting',  l: 'Đang vận chuyển' },
  { id: 'delivering',    l: 'Đang giao tới bạn' },
  { id: 'delivered',     l: 'Đã giao' },
];

function OrdersScreen({ nav, brand }) {
  const b = getBrand(brand);
  const [tab, setTab] = React.useState('all');
  const tabs = [
    { k: 'all', l: 'Tất cả' },
    { k: 'waiting-payment', l: 'Chờ TT' },
    { k: 'processing', l: 'Xử lý' },
    { k: 'completed', l: 'Hoàn tất' },
  ];
  const orders = tab === 'all' ? MOCK_ORDERS : MOCK_ORDERS.filter(o => o.status === tab);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 80 }} className="anim-fade">
      <div className="screen-hero" style={{
        background: `linear-gradient(160deg, ${b.grad[0]}, ${b.grad[1]})`,
        padding: '64px 18px 22px', color: '#fff', borderRadius: '0 0 28px 28px',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Đơn hàng</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>{MOCK_ORDERS.length} đơn · Lịch sử mua SIM & khóa học</div>
          </div>
          <button className="tap" style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ic.Search s={18} c="#fff"/>
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '12px 18px 6px', overflowX: 'auto', flexShrink: 0 }} className="scroll-area">
        {tabs.map(t => <Chip key={t.k} active={t.k===tab} onClick={() => setTab(t.k)} brand={brand}>{t.l}</Chip>)}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 18px 30px' }} className="scroll-area">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {orders.map((o) => {
            const st = STATUS[o.status];
            return (
              <Card key={o.id} onClick={() => nav.push('order-detail', { order: o })} style={{ padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>Mã đơn</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', fontFamily: 'ui-monospace, monospace' }}>{o.id}</div>
                  </div>
                  <Badge color={st.c}>{st.l}</Badge>
                </div>
                {o.items.map((it, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: it.type === 'sim' ? '#DBEAFE' : it.type === 'course' ? '#EDE9FE' : '#FEF3C7', color: it.type === 'sim' ? '#1D4ED8' : it.type === 'course' ? '#6D28D9' : '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {it.type === 'sim' ? <Ic.Sim s={18}/> : it.type === 'course' ? <Ic.Play s={16}/> : <Ic.Crown s={18}/>}
                    </div>
                    <div style={{ flex: 1, fontSize: 13, color: '#334155' }}>{it.name}</div>
                    <div style={{ fontSize: 12, color: '#0F172A', fontWeight: 600 }}>{vnd(it.price)}</div>
                  </div>
                ))}
                <div style={{ height: 1, background: '#F1F5F9', margin: '8px 0' }}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#64748B' }}>{o.date}</span>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#64748B' }}>Tổng</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: b.solid, letterSpacing: -0.3 }}>{vnd(o.total)}</span>
                  </div>
                </div>
                {o.status === 'waiting-payment' && (
                  <PrimaryButton fullWidth size="md" brand={brand} style={{ marginTop: 10 }} onClick={(e) => { e.stopPropagation(); nav.push('checkout', { total: o.total }); }}>
                    Thanh toán ngay
                  </PrimaryButton>
                )}

                {/* Tracking timeline */}
                {o.status === 'shipped' && o.tracking && (
                  <div style={{ marginTop: 12, padding: 12, background: '#EFF6FF', borderRadius: 12, border: '1px solid #BFDBFE' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 10, color: '#1E40AF', fontWeight: 800, letterSpacing: 0.3 }}>VẬN ĐƠN · {o.tracking.carrier}</div>
                        <div style={{ fontSize: 11, color: '#0F172A', fontWeight: 700, marginTop: 2, fontFamily: 'ui-monospace, monospace' }}>{o.tracking.code}</div>
                      </div>
                      {o.tracking.eta && <div style={{ fontSize: 11, color: '#1E40AF', fontWeight: 700 }}>ETA {o.tracking.eta}</div>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                      {TRACK_STEPS.slice(0, 4).map((s, i, arr) => {
                        const currentIdx = TRACK_STEPS.findIndex(x => x.id === o.tracking.step);
                        const done = i <= currentIdx;
                        const active = i === currentIdx;
                        return (
                          <React.Fragment key={s.id}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto' }}>
                              <div style={{ width: 22, height: 22, borderRadius: '50%', background: done ? '#1D4ED8' : '#E2E8F0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: active ? '0 0 0 4px rgba(29,78,216,0.2)' : 'none' }}>
                                {done && !active ? <Ic.Check s={12} c="#fff" w={2.6}/> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}/>}
                              </div>
                              <div style={{ fontSize: 8.5, color: done ? '#1E40AF' : '#94A3B8', marginTop: 4, textAlign: 'center', maxWidth: 60, lineHeight: 1.2, fontWeight: active ? 800 : 600 }}>{s.l}</div>
                            </div>
                            {i < arr.length - 1 && <div style={{ flex: 1, height: 2, background: i < currentIdx ? '#1D4ED8' : '#E2E8F0', marginTop: -22 }}/>}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Completed tracking summary */}
                {o.status === 'completed' && o.tracking && (
                  <div style={{ marginTop: 10, padding: '8px 12px', background: '#F0FDF4', borderRadius: 10, fontSize: 11, color: '#15803D', display: 'flex', gap: 6, alignItems: 'center' }}>
                    <Ic.Check s={14} c="#10B981"/>
                    Đã giao thành công {o.tracking.delivered} · {o.tracking.carrier}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OrdersScreen, MOCK_ORDERS });
