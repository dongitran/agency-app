// screens-sim.jsx — SIM detail (list moved into screens-products.jsx)

function SimDetailScreen({ nav, item, brand, user, addToCart, showToast }) {
  const b = getBrand(brand);
  const [tab, setTab] = React.useState('luangiai');
  const [liked, setLiked] = React.useState(false);
  const lg = item.luanGiai || {};
  const commValue = estCommission(item);

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
          <div style={{ position: 'absolute', top: 66, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', zIndex: 30 }}>
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

        {/* Commission preview banner — only if user is agent */}
        {user?.isAgent && commValue > 0 && (
          <div style={{ padding: '14px 18px 0' }}>
            <Card style={{ padding: 12, display: 'flex', gap: 10, alignItems: 'center', background: 'linear-gradient(135deg, #FEF3C7, #FED7AA)', border: '1px solid #FBBF24' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#F59E0B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎁</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#92400E', fontWeight: 700, letterSpacing: 0.3 }}>HOA HỒNG DỰ KIẾN (F1)</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', letterSpacing: -0.3, marginTop: 2 }}>{vnd(commValue)} <span style={{ fontSize: 11, color: '#92400E', fontWeight: 600 }}>· {item.commission}%</span></div>
              </div>
            </Card>
          </div>
        )}

        {/* segmented tabs */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{ display: 'flex', gap: 0, background: '#E2E8F0', borderRadius: 12, padding: 3 }}>
            {[
              { k: 'luangiai', l: 'Luận giải' },
              { k: 'info', l: 'Thông tin' },
              { k: 'pack', l: 'Gói cước' },
              { k: 'qa', l: 'Hỏi đáp' },
            ].map((t) => (
              <button key={t.k} onClick={() => setTab(t.k)} className="tap" style={{
                flex: 1, height: 38, borderRadius: 10, border: 'none',
                background: tab === t.k ? '#fff' : 'transparent',
                color: tab === t.k ? '#0F172A' : '#64748B',
                fontSize: 12, fontWeight: 700,
                boxShadow: tab === t.k ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}>{t.l}</button>
            ))}
          </div>
        </div>

        {/* Luận giải tab — đầy đủ */}
        {tab === 'luangiai' && (
          <div style={{ padding: '14px 18px' }} className="anim-fade">
            {/* Tổng nút */}
            {lg.tongNut && (
              <Card style={{ padding: 16, marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #FCD34D, #F59E0B)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>{lg.tongNut.value}</div>
                  <div>
                    <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: 0.3 }}>TỔNG NÚT</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>Số {lg.tongNut.value}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>{lg.tongNut.meaning}</div>
              </Card>
            )}

            {/* Ngũ hành */}
            {lg.nguHanh && (
              <Card style={{ padding: 16, marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>{lg.nguHanh.element}</div>
                  <div>
                    <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: 0.3 }}>NGŨ HÀNH</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>Mệnh {lg.nguHanh.element}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>{lg.nguHanh.meaning}</div>
              </Card>
            )}

            {/* Dải đẹp */}
            {lg.daiDep && (
              <Card style={{ padding: 16, marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: 0.3 }}>DẢI ĐẸP</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>{lg.daiDep.group}</div>
                <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6, marginTop: 8 }}>{lg.daiDep.meaning}</div>
              </Card>
            )}

            {/* Ý nghĩa từng chữ số */}
            {lg.digitMeanings && lg.digitMeanings.length > 0 && (
              <Card style={{ padding: 16, marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: 0.3, marginBottom: 10 }}>Ý NGHĨA TỪNG CHỮ SỐ</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {lg.digitMeanings.map((d, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 9, background: b.soft, color: b.solid, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 800, flexShrink: 0 }}>{d.digit}</div>
                      <div style={{ flex: 1, fontSize: 13, color: '#334155', lineHeight: 1.5, paddingTop: 4 }}>{d.meaning}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Hợp mệnh / hợp tuổi */}
            {(item.compatibleElements || item.compatibleAges) && (
              <Card style={{ padding: 16, marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: 0.3, marginBottom: 8 }}>HỢP MỆNH · HỢP TUỔI</div>
                {item.compatibleElements && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: '#64748B', alignSelf: 'center' }}>Mệnh hợp:</span>
                    {item.compatibleElements.map((e) => (
                      <span key={e} style={{ padding: '4px 10px', borderRadius: 999, background: '#EDE9FE', color: '#6D28D9', fontSize: 12, fontWeight: 700 }}>{e}</span>
                    ))}
                  </div>
                )}
                {item.compatibleAges && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, color: '#64748B', alignSelf: 'center' }}>Tuổi hợp:</span>
                    {item.compatibleAges.map((a) => (
                      <span key={a} style={{ padding: '4px 10px', borderRadius: 999, background: '#DCFCE7', color: '#15803D', fontSize: 12, fontWeight: 700 }}>{a}</span>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {/* Chuyên gia */}
            {lg.expertNote && (
              <Card style={{ padding: 16, marginBottom: 10, background: 'linear-gradient(135deg, #FEF3C7, #FED7AA)', border: '1px solid #FBBF24' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 16 }}>👨‍🏫</span>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#92400E', letterSpacing: 0.3 }}>LỜI CHUYÊN GIA</div>
                </div>
                <div style={{ fontSize: 13, color: '#7C2D12', lineHeight: 1.6, fontStyle: 'italic' }}>"{lg.expertNote}"</div>
              </Card>
            )}

            {/* CTA chuyên gia */}
            <Card style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center', background: b.soft, border: `1px solid ${b.solid}20` }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: b.solid, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Gift s={20} c="#fff"/></div>
              <div style={{ flex: 1, fontSize: 12, color: '#475569' }}>
                <strong style={{ color: '#0F172A' }}>Tặng buổi luận giải 1-1</strong> với chuyên gia phong thủy khi mua SIM
              </div>
            </Card>
          </div>
        )}

        {tab === 'info' && (
          <div style={{ padding: '14px 18px' }} className="anim-fade">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { l: 'Tổng nút', v: item.sum || '—', i: <Ic.Star s={18}/> },
                { l: 'Mệnh hợp', v: item.element || '—', i: <Ic.Trend s={18}/> },
                { l: 'Nhà mạng', v: item.carrier, i: <Ic.Sim s={18}/> },
                { l: 'Loại SIM', v: item.simType || '5G eSIM', i: <Ic.Sim s={18}/> },
                { l: 'Đầu số', v: item.prefix || '—', i: <Ic.Phone s={18}/> },
                { l: 'Data', v: item.data, i: <Ic.Phone s={18}/> },
              ].map((x) => (
                <Card key={x.l} style={{ padding: 12 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: b.solid }}>{x.i}<span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>{x.l}</span></div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginTop: 6 }}>{x.v}</div>
                </Card>
              ))}
            </div>
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
