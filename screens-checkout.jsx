// screens-checkout.jsx — Cart, QR checkout, success

function CartScreen({ nav, brand, cart, setCart, showToast }) {
  const b = getBrand(brand);
  const subtotal = cart.reduce((s, it) => s + it.price * (it.qty||1), 0);
  const discount = subtotal > 500000 ? 50000 : 0;
  const total = subtotal - discount;

  const updateQty = (id, delta) => {
    setCart(cart.map(it => it.id === id ? {...it, qty: Math.max(1, (it.qty||1) + delta)} : it).filter(it => it.qty > 0));
  };
  const remove = (id) => setCart(cart.filter(it => it.id !== id));

  if (cart.length === 0) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column' }} className="anim-slide-in">
        <ScreenHeader title="Giỏ hàng" onBack={() => nav.pop()}/>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
          <div style={{ width: 100, height: 100, borderRadius: 32, background: b.soft, color: b.solid, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ic.Cart s={48} c={b.solid}/>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginTop: 18 }}>Giỏ hàng trống</div>
          <div style={{ fontSize: 13, color: '#64748B', marginTop: 6, maxWidth: 240 }}>Khám phá SIM số đẹp và khóa học để bắt đầu mua sắm.</div>
          <PrimaryButton onClick={() => nav.pop()} brand={brand} style={{ marginTop: 22 }}>Tiếp tục mua sắm</PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 100 }} className="anim-slide-in">
      <ScreenHeader title="Giỏ hàng" subtitle={`${cart.length} sản phẩm`} onBack={() => nav.pop()}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cart.map((it) => (
            <Card key={it.id + (it.type||'')} style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: 12, background: `linear-gradient(135deg, ${it.color||it.cover||b.solid}, ${(it.color||it.cover||b.solid)}aa)`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {it.type === 'sim' ? <Ic.Sim s={26} c="#fff"/> : <Ic.Play s={22} c="#fff"/>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{it.name}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{it.number || it.mentor}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: b.solid }}>{vnd(it.price)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: '#F1F5F9', borderRadius: 10, padding: 2 }}>
                    <button onClick={() => it.qty === 1 ? remove(it.id) : updateQty(it.id, -1)} className="tap" style={{ width: 26, height: 26, border: 'none', background: 'transparent', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Minus s={14}/></button>
                    <div style={{ width: 24, textAlign: 'center', fontSize: 13, fontWeight: 700 }}>{it.qty||1}</div>
                    <button onClick={() => updateQty(it.id, 1)} className="tap" style={{ width: 26, height: 26, border: 'none', background: 'transparent', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Plus s={14}/></button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* voucher */}
        <Card style={{ marginTop: 14, padding: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Gift s={20} c="#B45309"/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Mã giảm giá</div>
            <div style={{ fontSize: 11, color: '#64748B' }}>Bạn có 2 voucher khả dụng</div>
          </div>
          <Ic.Chevron s={16} c="#64748B"/>
        </Card>

        {/* summary */}
        <Card style={{ marginTop: 10, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 10 }}>Tóm tắt đơn hàng</div>
          {[
            { l: 'Tạm tính', v: vnd(subtotal) },
            { l: 'Giảm giá', v: discount ? `-${vnd(discount)}` : 'Chưa có' },
            { l: 'Phí vận chuyển', v: 'Miễn phí' },
          ].map((r) => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
              <span style={{ color: '#64748B' }}>{r.l}</span>
              <span style={{ color: '#0F172A', fontWeight: 600 }}>{r.v}</span>
            </div>
          ))}
          <div style={{ height: 1, background: '#E2E8F0', margin: '8px 0' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Tổng cộng</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: b.solid, letterSpacing: -0.4 }}>{vnd(total)}</span>
          </div>
        </Card>
      </div>

      <ActionBar>
        <div style={{ flex: 0 }}>
          <div style={{ fontSize: 11, color: '#64748B' }}>Tổng</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: b.solid }}>{vnd(total)}</div>
        </div>
        <PrimaryButton fullWidth onClick={() => nav.push('checkout', { total })} brand={brand}>Thanh toán</PrimaryButton>
      </ActionBar>
    </div>
  );
}

function CheckoutQRScreen({ nav, total, brand, onComplete }) {
  const b = getBrand(brand);
  const [countdown, setCountdown] = React.useState(900); // 15min
  const [status, setStatus] = React.useState('waiting'); // waiting | success
  const orderId = React.useMemo(() => 'SP' + Math.random().toString().slice(2, 10), []);

  React.useEffect(() => {
    if (status !== 'waiting') return;
    const t = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 0), 1000);
    return () => clearInterval(t);
  }, [status]);

  // Auto-confirm after 8s for demo
  React.useEffect(() => {
    const t = setTimeout(() => setStatus('success'), 8000);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(() => onComplete(orderId), 2400);
      return () => clearTimeout(t);
    }
  }, [status]);

  const mm = String(Math.floor(countdown/60)).padStart(2, '0');
  const ss = String(countdown%60).padStart(2, '0');

  if (status === 'success') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }} className="anim-fade">
        <div className="anim-scale" style={{
          width: 110, height: 110, borderRadius: 36,
          background: 'linear-gradient(135deg, #10B981, #059669)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 16px 40px -10px #10B98180',
        }}>
          <Ic.Check s={56} c="#fff" w={3.5}/>
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', letterSpacing: -0.5, marginTop: 28, textAlign: 'center' }}>Thanh toán thành công!</div>
        <div style={{ fontSize: 14, color: '#64748B', marginTop: 8, textAlign: 'center', maxWidth: 280, lineHeight: 1.5 }}>
          Đơn hàng <strong style={{ color: '#0F172A' }}>{orderId}</strong> đang được Sales đối soát. Bạn sẽ nhận thông báo khi hoàn tất.
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column' }} className="anim-slide-in">
      <ScreenHeader title="Thanh toán QR" subtitle={`Đơn ${orderId}`} onBack={() => nav.pop()}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        {/* timer */}
        <Card style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 10, background: '#FEF3C7', border: '1px solid #FDE68A' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F59E0B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Clock s={20} c="#fff"/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#92400E', fontWeight: 600 }}>Vui lòng thanh toán trong</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#92400E', letterSpacing: -0.3, fontVariantNumeric: 'tabular-nums' }}>{mm}:{ss}</div>
          </div>
        </Card>

        {/* QR */}
        <Card style={{ marginTop: 14, padding: 22, textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>QUÉT MÃ ĐỂ THANH TOÁN</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: b.solid, letterSpacing: -0.6, marginTop: 8 }}>{vnd(total)}</div>

          {/* QR pattern */}
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
            <div style={{ padding: 14, background: '#fff', borderRadius: 18, border: '2px solid #0F172A', position: 'relative' }}>
              <FakeQR/>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 42, height: 42, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #0F172A' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: b.solid }}>SP+</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18, padding: 12, background: '#F8FAFC', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 11, color: '#64748B' }}>Vietcombank · CT SimPlus VN</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', fontVariantNumeric: 'tabular-nums' }}>0123 4567 8900</div>
            </div>
            <button className="tap" style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '8px 12px', borderRadius: 10, border: 'none', background: b.solid, color: '#fff', fontSize: 12, fontWeight: 700 }}>
              <Ic.Copy s={14} c="#fff"/>Copy
            </button>
          </div>

          <div style={{ marginTop: 12, padding: 12, background: b.soft, borderRadius: 12, fontSize: 11, color: b.text, textAlign: 'left' }}>
            <strong>Nội dung CK:</strong> <span style={{ fontFamily: 'ui-monospace, monospace' }}>{orderId}</span>
          </div>
        </Card>

        <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center', padding: '0 4px' }}>
          <div className="spin" style={{ width: 14, height: 14, border: `2px solid ${b.solid}44`, borderTopColor: b.solid, borderRadius: '50%' }}/>
          <div style={{ fontSize: 12, color: '#64748B' }}>Đang chờ chuyển khoản… (demo tự xác nhận sau 8s)</div>
        </div>

        <button className="tap" style={{ marginTop: 18, width: '100%', height: 46, borderRadius: 14, background: 'transparent', border: '1.5px dashed #CBD5E1', color: '#475569', fontSize: 13, fontWeight: 600 }}>
          Tải ảnh chứng từ chuyển khoản
        </button>
      </div>
    </div>
  );
}

function FakeQR() {
  // Generate deterministic 25x25 pseudo-random pattern
  const size = 25;
  const cells = [];
  const seed = 17;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const isFinder =
        (x < 7 && y < 7) || (x >= size-7 && y < 7) || (x < 7 && y >= size-7);
      const onFinder = isFinder && (
        ((x === 0 || x === 6 || y === 0 || y === 6) && (x < 7 && y < 7)) ||
        ((x === size-7 || x === size-1 || y === 0 || y === 6) && (x >= size-7 && y < 7)) ||
        ((x === 0 || x === 6 || y === size-7 || y === size-1) && (x < 7 && y >= size-7)) ||
        ((x >= 2 && x <= 4 && y >= 2 && y <= 4) && (x < 7 && y < 7)) ||
        ((x >= size-5 && x <= size-3 && y >= 2 && y <= 4)) ||
        ((x >= 2 && x <= 4 && y >= size-5 && y <= size-3))
      );
      const on = onFinder || (!isFinder && ((x * 31 + y * 17 + seed) % 7 < 3));
      if (on) cells.push(<rect key={`${x},${y}`} x={x*7} y={y*7} width={7} height={7} fill="#0F172A"/>);
    }
  }
  return (
    <svg width="180" height="180" viewBox={`0 0 ${size*7} ${size*7}`}>
      {cells}
    </svg>
  );
}

Object.assign(window, { CartScreen, CheckoutQRScreen });
