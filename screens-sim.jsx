// screens-sim.jsx — SIM detail (list moved into screens-products.jsx)

function SimDetailScreen({ nav, item, brand, addToCart, showToast }) {
  const b = getBrand(brand);
  const [tab, setTab] = React.useState('info');
  const [liked, setLiked] = React.useState(false);

  const handleAdd = () => { addToCart({ ...item, type: 'sim' }); showToast('Đã thêm vào giỏ'); };
  const handleBuy = () => { addToCart({ ...item, type: 'sim' }); nav.push('cart'); };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 90 }} className="anim-slide-in">
      <div style={{ flex: 1, overflow: 'auto' }} className="scroll-area">
        {/* hero */}
        <div className="screen-hero" style={{
          padding: '54px 20px 30px', position: 'relative',
          background: `linear-gradient(160deg, ${item.color}, ${item.color}cc)`,
          color: '#fff', borderRadius: '0 0 32px 32px',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
          <IOSStatusBar dark={true}/>
          <div style={{ position: 'absolute', top: 50, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => nav.pop()} className="tap" style={{...btnGlass, background: 'rgba(255,255,255,0.18)'}}><Ic.Back s={20} c="#fff"/></button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setLiked(!liked)} className="tap" style={{...btnGlass, background: 'rgba(255,255,255,0.18)'}}><Ic.Heart s={18} c="#fff" f={liked ? '#EF4444' : 'none'}/></button>
              <button className="tap" style={{...btnGlass, background: 'rgba(255,255,255,0.18)'}}><Ic.Share s={18} c="#fff"/></button>
            </div>
          </div>

          <Badge color="amber" style={{ marginTop: 22 }}>{item.tag}</Badge>
          <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 700, letterSpacing: 1, marginTop: 12 }}>{item.carrier.toUpperCase()} · {item.name}</div>
          <div style={{ fontSize: 36, fontWeight: 800, marginTop: 6, letterSpacing: -1, fontFeatureSettings: '"tnum"' }}>{item.number}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 14 }}>
            <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.6 }}>{vnd(item.price)}</span>
            {item.oldPrice && <span style={{ fontSize: 14, opacity: 0.7, textDecoration: 'line-through' }}>{vnd(item.oldPrice)}</span>}
          </div>
        </div>

        {/* segmented tabs */}
        <div style={{ padding: '16px 18px 0' }}>
          <div style={{ display: 'flex', gap: 0, background: '#E2E8F0', borderRadius: 12, padding: 3 }}>
            {[
              { k: 'info', l: 'Thông tin' },
              { k: 'pack', l: 'Gói cước' },
              { k: 'qa', l: 'Hỏi đáp' },
            ].map((t) => (
              <button key={t.k} onClick={() => setTab(t.k)} className="tap" style={{
                flex: 1, height: 38, borderRadius: 10, border: 'none',
                background: tab === t.k ? '#fff' : 'transparent',
                color: tab === t.k ? '#0F172A' : '#64748B',
                fontSize: 13, fontWeight: 700,
                boxShadow: tab === t.k ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}>{t.l}</button>
            ))}
          </div>
        </div>

        {/* tab content */}
        {tab === 'info' && (
          <div style={{ padding: '14px 18px' }} className="anim-fade">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { l: 'Tổng nút', v: item.sum || '—', i: <Ic.Star s={18}/> },
                { l: 'Mệnh hợp', v: item.element || '—', i: <Ic.Trend s={18}/> },
                { l: 'Loại sim', v: '5G eSIM', i: <Ic.Sim s={18}/> },
                { l: 'Data tháng', v: item.data, i: <Ic.Phone s={18}/> },
              ].map((x) => (
                <Card key={x.l} style={{ padding: 12 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: b.solid }}>{x.i}<span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>{x.l}</span></div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginTop: 6 }}>{x.v}</div>
                </Card>
              ))}
            </div>

            <Card style={{ padding: 16, marginTop: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Ý nghĩa phong thủy</div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginTop: 6 }}>
                Số <strong>{item.number}</strong> có tổng nút <strong>{item.sum || '—'}</strong>, thuộc dải <strong>{item.tag}</strong>, hợp mệnh <strong>{item.element || '—'}</strong>. {item.meaning || 'Số đẹp, dễ nhớ, mang nhiều ý nghĩa tốt lành.'} Giao SIM tận nơi 24h, kích hoạt online qua VNeID.
              </div>
            </Card>

            <Card style={{ padding: 16, marginTop: 10, display: 'flex', gap: 12, alignItems: 'center', background: b.soft, border: `1px solid ${b.solid}20` }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: b.solid, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Gift s={20} c="#fff"/></div>
              <div style={{ flex: 1, fontSize: 12, color: '#475569' }}>
                <strong style={{ color: '#0F172A' }}>Tặng buổi luận giải miễn phí</strong> bởi chuyên gia phong thủy khi đăng ký
              </div>
            </Card>
          </div>
        )}

        {tab === 'pack' && (
          <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }} className="anim-fade">
            {[
              { n: 'Cơ bản', d: '30GB/tháng', c: 'Miễn phí nội mạng', p: 89000, hl: false },
              { n: 'Tiêu chuẩn', d: '120GB/tháng', c: 'Miễn phí mọi mạng', p: 149000, hl: true },
              { n: 'Premium', d: 'Không giới hạn', c: 'Roaming 50 nước', p: 299000, hl: false },
            ].map((g) => (
              <Card key={g.n} style={{ padding: 14, border: g.hl ? `2px solid ${b.solid}` : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{g.n}</div>
                      {g.hl && <Badge color="blue">Phổ biến</Badge>}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{g.d} · {g.c}</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: b.solid }}>{vnd(g.p)}<span style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>/th</span></div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === 'qa' && (
          <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }} className="anim-fade">
            {[
              { q: 'SIM có cần kích hoạt eKYC không?', a: 'Có, kích hoạt qua VNeID hoặc CCCD trong 5 phút.' },
              { q: 'Có giao SIM tận nơi không?', a: 'Miễn phí giao SIM 64 tỉnh thành, nhận trong 24-48h.' },
              { q: 'Đổi số khác được không?', a: 'Trong 7 ngày đầu nếu chưa kích hoạt, hỗ trợ đổi 1 lần.' },
            ].map((x, i) => (
              <Card key={i} style={{ padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{x.q}</div>
                <div style={{ fontSize: 12, color: '#475569', marginTop: 6, lineHeight: 1.5 }}>{x.a}</div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ActionBar>
        <button onClick={handleAdd} className="tap" style={{
          height: 52, padding: '0 18px', borderRadius: 16,
          background: b.soft, color: b.solid, border: 'none',
          fontSize: 14, fontWeight: 700,
        }}>
          <Ic.Cart s={20} c={b.solid}/>
        </button>
        <PrimaryButton fullWidth onClick={handleBuy} brand={brand}>Mua ngay</PrimaryButton>
      </ActionBar>
    </div>
  );
}

Object.assign(window, { SimDetailScreen });
