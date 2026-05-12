// screens-course.jsx — Course list + detail

function CourseListScreen({ nav, brand, cardStyle }) {
  const b = getBrand(brand);
  const [cat, setCat] = React.useState('Tất cả');
  const cats = ['Tất cả', 'Bán hàng', 'Marketing', 'Đại lý', 'Tài chính', 'Mới'];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column' }} className="anim-slide-in">
      <ScreenHeader title="Khóa học" subtitle="Học bán hàng & xây team từ chuyên gia" onBack={() => nav.pop()}/>
      <div style={{ display: 'flex', gap: 8, padding: '12px 18px 6px', overflowX: 'auto', flexShrink: 0 }} className="scroll-area">
        {cats.map(f => <Chip key={f} active={f===cat} onClick={() => setCat(f)} brand={brand}>{f}</Chip>)}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '8px 18px 30px' }} className="scroll-area">
        {/* Featured */}
        <Card onClick={() => nav.push('course-detail', { item: MOCK_COURSES[1] })} style={{ overflow: 'hidden', marginBottom: 14 }}>
          <div style={{ height: 150, background: `linear-gradient(135deg, ${MOCK_COURSES[1].cover}, ${MOCK_COURSES[1].cover}88)`, padding: 16, position: 'relative', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Badge color="amber">⭐ Bestseller</Badge>
              <Badge color="red">-38%</Badge>
            </div>
            <div>
              <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 700, letterSpacing: 1 }}>{MOCK_COURSES[1].level.toUpperCase()}</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4, letterSpacing: -0.4, lineHeight: 1.2 }}>{MOCK_COURSES[1].name}</div>
            </div>
          </div>
          <div style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#64748B' }}>{MOCK_COURSES[1].mentor} · {MOCK_COURSES[1].lessons} bài</div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 4, fontSize: 12 }}>
                <Ic.Star s={14} f="#F59E0B"/><strong style={{ color: '#0F172A' }}>{MOCK_COURSES[1].rating}</strong>
                <span style={{ color: '#64748B' }}>· {MOCK_COURSES[1].students.toLocaleString()} học viên</span>
              </div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: b.solid }}>{vnd(MOCK_COURSES[1].price)}</div>
          </div>
        </Card>

        <SectionHead title="Tất cả khóa học"/>
        <div style={{ display: cardStyle === 'grid' ? 'grid' : 'flex', flexDirection: 'column', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {MOCK_COURSES.map((c) => (
            cardStyle === 'grid' ? (
              <Card key={c.id} onClick={() => nav.push('course-detail', { item: c })} style={{ overflow: 'hidden' }}>
                <div style={{ height: 100, background: `linear-gradient(135deg, ${c.cover}, ${c.cover}aa)`, padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff' }}>
                  <Badge color="purple">{c.level}</Badge>
                  <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>{c.duration} · {c.lessons} bài</div>
                </div>
                <div style={{ padding: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', lineHeight: 1.3, height: 34, overflow: 'hidden' }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: '#64748B', marginTop: 4 }}>{c.mentor}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                    <div style={{ display: 'flex', gap: 3, alignItems: 'center', fontSize: 11 }}><Ic.Star s={11} f="#F59E0B"/><strong>{c.rating}</strong></div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: b.solid }}>{vnd(c.price)}</div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card key={c.id} onClick={() => nav.push('course-detail', { item: c })} style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 88, height: 88, borderRadius: 14, flexShrink: 0, background: `linear-gradient(135deg, ${c.cover}, ${c.cover}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative' }}>
                  <Ic.Play s={28} c="#fff"/>
                  <div style={{ position: 'absolute', bottom: 6, left: 6, padding: '2px 6px', background: 'rgba(0,0,0,0.5)', borderRadius: 5, fontSize: 9, fontWeight: 700 }}>{c.duration}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <Badge color="purple">{c.level}</Badge>
                    {c.oldPrice && <Badge color="red">-{Math.round((1-c.price/c.oldPrice)*100)}%</Badge>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginTop: 5, lineHeight: 1.3 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{c.mentor} · {c.lessons} bài · ⭐{c.rating}</div>
                  <div style={{ marginTop: 6, fontSize: 15, fontWeight: 800, color: b.solid }}>{vnd(c.price)}</div>
                </div>
              </Card>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseDetailScreen({ nav, item, brand, addToCart, showToast }) {
  const b = getBrand(brand);
  const [tab, setTab] = React.useState('about');

  const chapters = [
    { n: 'Chương 1 · Tổng quan thị trường SIM 2026', l: ['Toàn cảnh ngành viễn thông VN', 'Cấu trúc giá & hoa hồng', 'Khung pháp lý mới'], unlocked: true },
    { n: 'Chương 2 · Tư duy bán hàng', l: ['Hiểu khách hàng B2C vs B2B', 'Quy trình AIDA cho SIM', 'Đối phó từ chối'], unlocked: true },
    { n: 'Chương 3 · Xây dựng kênh F1', l: ['Mô hình hoa hồng đa cấp', 'Cấu trúc team', 'Onboard đại lý mới'], unlocked: false },
    { n: 'Chương 4 · Quản lý dòng tiền', l: ['Theo dõi commission', 'Tối ưu thuế cho đại lý'], unlocked: false },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 90 }} className="anim-slide-in">
      <div style={{ flex: 1, overflow: 'auto' }} className="scroll-area">
        {/* hero cover with play */}
        <div style={{ height: 240, position: 'relative', background: `linear-gradient(160deg, ${item.cover}, ${item.cover}88)`, color: '#fff', borderRadius: '0 0 24px 24px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 60%)' }}/>
          <IOSStatusBar dark={true}/>
          <div style={{ position: 'absolute', top: 50, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => nav.pop()} className="tap" style={{...btnGlass, background: 'rgba(255,255,255,0.18)'}}><Ic.Back s={20} c="#fff"/></button>
            <button className="tap" style={{...btnGlass, background: 'rgba(255,255,255,0.18)'}}><Ic.Share s={18} c="#fff"/></button>
          </div>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="tap" style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.4)' }}>
              <Ic.Play s={26} c="#fff"/>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Badge color="amber">⭐ Bestseller</Badge>
            <div style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', background: 'rgba(0,0,0,0.4)', borderRadius: 6 }}>Preview · 02:14</div>
          </div>
        </div>

        <div style={{ padding: 18 }}>
          <Badge color="purple">{item.level}</Badge>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', letterSpacing: -0.4, lineHeight: 1.2, marginTop: 8 }}>{item.name}</div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 8, fontSize: 13 }}>
            <Ic.Star s={14} f="#F59E0B"/><strong style={{ color: '#0F172A' }}>{item.rating}</strong>
            <span style={{ color: '#64748B' }}>({item.students.toLocaleString()} học viên)</span>
          </div>

          {/* Mentor */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16, padding: 12, borderRadius: 14, background: '#fff' }}>
            <Avatar name={item.mentor} size={44}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: '#64748B' }}>Giảng viên</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{item.mentor}</div>
            </div>
            <button className="tap" style={{ padding: '6px 14px', borderRadius: 999, border: `1.5px solid ${b.solid}`, color: b.solid, background: '#fff', fontSize: 12, fontWeight: 700 }}>Theo dõi</button>
          </div>

          {/* stats */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 4px 4px', marginTop: 8, borderTop: '1px solid #E2E8F0' }}>
            {[
              { l: 'Bài học', v: item.lessons },
              { l: 'Thời lượng', v: item.duration },
              { l: 'Cấp độ', v: item.level },
              { l: 'Ngôn ngữ', v: 'Tiếng Việt' },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{s.v}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* tabs */}
          <div style={{ display: 'flex', gap: 0, background: '#E2E8F0', borderRadius: 12, padding: 3, marginTop: 18 }}>
            {[
              { k: 'about', l: 'Mô tả' },
              { k: 'curriculum', l: 'Nội dung' },
              { k: 'reviews', l: 'Đánh giá' },
            ].map((t) => (
              <button key={t.k} onClick={() => setTab(t.k)} className="tap" style={{
                flex: 1, height: 36, borderRadius: 9, border: 'none',
                background: tab === t.k ? '#fff' : 'transparent',
                color: tab === t.k ? '#0F172A' : '#64748B',
                fontSize: 13, fontWeight: 700,
              }}>{t.l}</button>
            ))}
          </div>

          {tab === 'about' && (
            <div className="anim-fade" style={{ marginTop: 14 }}>
              <div style={{ fontSize: 14, color: '#334155', lineHeight: 1.6 }}>
                Khóa học giúp bạn nắm vững quy trình bán SIM hiệu quả: từ tâm lý khách hàng, kịch bản tư vấn, xử lý từ chối đến triển khai mạng lưới đại lý F1·F2·F3. <strong style={{ color: '#0F172A' }}>{item.lessons} bài học</strong> trên ứng dụng, kèm template & case-study thật.
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginTop: 18 }}>Bạn sẽ học được</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                {['Phân khúc khách hàng SIM & khóa học', 'Quy trình tư vấn chuyển đổi cao', 'Cách phát triển team F1 → F3', 'Quản lý hoa hồng & dòng tiền'].map((x) => (
                  <div key={x} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 8, background: b.soft, color: b.solid, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic.Check s={14} c={b.solid} w={2.4}/></div>
                    <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.5 }}>{x}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'curriculum' && (
            <div className="anim-fade" style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {chapters.map((c, i) => (
                <Card key={i} style={{ padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{c.n}</div>
                      <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>{c.l.length} bài học</div>
                    </div>
                    {c.unlocked ? <Ic.Play s={18} c={b.solid}/> : <Ic.Lock s={18} c="#94A3B8"/>}
                  </div>
                  <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                    {c.l.map((x, j) => (
                      <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: '#475569' }}>
                        <div style={{ width: 18, height: 18, borderRadius: 4, background: '#F1F5F9', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{j+1}</div>
                        {x}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {tab === 'reviews' && (
            <div className="anim-fade" style={{ marginTop: 14 }}>
              <Card style={{ padding: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#0F172A', letterSpacing: -1 }}>{item.rating}</div>
                  <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>{[1,2,3,4,5].map((s) => <Ic.Star key={s} s={12} f={s <= Math.floor(item.rating) ? '#F59E0B' : '#E2E8F0'}/>)}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>{item.students}</div>
                </div>
                <div style={{ flex: 1 }}>
                  {[5,4,3,2,1].map((s) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{ fontSize: 10, color: '#64748B', width: 8 }}>{s}</span>
                      <div style={{ flex: 1, height: 4, borderRadius: 2, background: '#E2E8F0', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: '#F59E0B', width: s === 5 ? '78%' : s === 4 ? '18%' : '2%' }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {[
                { n: 'Mai Lan', d: '2 tuần trước', r: 5, c: 'Nội dung rất thực tế, áp dụng được ngay. Mentor giải thích rõ phần hoa hồng F1·F2.' },
                { n: 'Quang Huy', d: '1 tháng trước', r: 5, c: 'Đáng đồng tiền. Sau 1 tháng team mình đã có 12 đại lý F1.' },
              ].map((r, i) => (
                <Card key={i} style={{ padding: 14, marginTop: 10 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <Avatar name={r.n} size={36}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{r.n}</div>
                      <div style={{ display: 'flex', gap: 2 }}>{[1,2,3,4,5].map((s) => <Ic.Star key={s} s={11} f={s <= r.r ? '#F59E0B' : '#E2E8F0'}/>)}</div>
                    </div>
                    <span style={{ fontSize: 11, color: '#94A3B8' }}>{r.d}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#475569', marginTop: 8, lineHeight: 1.5 }}>{r.c}</div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <ActionBar>
        <div style={{ flex: 0 }}>
          <div style={{ fontSize: 11, color: '#64748B' }}>Giá khóa học</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: b.solid, letterSpacing: -0.3 }}>{vnd(item.price)}</div>
        </div>
        <PrimaryButton fullWidth onClick={() => { addToCart({ ...item, type: 'course' }); nav.push('cart'); }} brand={brand}>Đăng ký học</PrimaryButton>
      </ActionBar>
    </div>
  );
}

Object.assign(window, { CourseListScreen, CourseDetailScreen });
