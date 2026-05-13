// screens-course.jsx — Course detail (list moved into screens-products.jsx)

function CourseDetailScreen({ nav, item, brand, addToCart, showToast }) {
  const b = getBrand(brand);
  const [tab, setTab] = React.useState('about');

  const chaptersByTopic = {
    'Phong thủy': [
      { n: 'Chương 1 · Nhập môn phong thủy số học', l: ['Khái niệm tổng nút & quẻ số', 'Ngũ hành cơ bản', 'Bát hình toàn'], unlocked: true },
      { n: 'Chương 2 · Tính tổng nút & ý nghĩa', l: ['Cách cộng dồn số điện thoại', 'Ý nghĩa số 0-9', 'Bát Quái ứng dụng'], unlocked: true },
      { n: 'Chương 3 · Số hợp mệnh & hợp tuổi', l: ['Bảng đối chiếu mệnh - số', 'Tuổi nào - số nào', 'Tránh số xung'], unlocked: false },
      { n: 'Chương 4 · Tam hoa, Tứ quý, Thần tài', l: ['Phân loại dải số quý', 'Giá trị thị trường', 'Cách định giá'], unlocked: false },
    ],
    'Tư duy': [
      { n: 'Chương 1 · Tâm thức thịnh vượng', l: ['Niềm tin về tiền bạc', 'Năng lượng & tần số', 'Luật hấp dẫn'], unlocked: true },
      { n: 'Chương 2 · Lắng nghe khách hàng', l: ['Active listening', 'Đặt câu hỏi sâu', 'Đồng cảm thực sự'], unlocked: true },
      { n: 'Chương 3 · Xử lý từ chối', l: ['5 lý do khách từ chối', 'Reframing', 'Chốt sale tự nhiên'], unlocked: false },
      { n: 'Chương 4 · Xây thương hiệu cá nhân', l: ['Personal branding 101', 'Story telling', 'Tự tin trên camera'], unlocked: false },
    ],
    'Kinh doanh': [
      { n: 'Chương 1 · Tổng quan thị trường SIM phong thủy', l: ['Quy mô ngành', 'Phân khúc khách hàng', 'Cơ hội phong thủy số'], unlocked: true },
      { n: 'Chương 2 · Vận hành cửa hàng SIM', l: ['Setup kho số', 'Quy trình bán', 'Chăm sóc khách hàng'], unlocked: true },
      { n: 'Chương 3 · Mô hình đại lý F1·F2·F3', l: ['Cấu trúc hoa hồng', 'Tuyển F1', 'Đào tạo F2-F3'], unlocked: false },
      { n: 'Chương 4 · Quản lý dòng tiền', l: ['Theo dõi commission', 'Tối ưu thuế', 'Tái đầu tư'], unlocked: false },
    ],
  };
  const chapters = chaptersByTopic[item.topic] || chaptersByTopic['Kinh doanh'];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 90 }} className="anim-slide-in">
      <div style={{ flex: 1, overflow: 'auto' }} className="scroll-area">
        {/* hero cover with play */}
        <div style={{ height: 240, position: 'relative', background: `linear-gradient(160deg, ${item.cover}, ${item.cover}88)`, color: '#fff', borderRadius: '0 0 24px 24px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 60%)' }}/>
          <IOSStatusBar dark={true}/>
          <div style={{ position: 'absolute', top: 66, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', zIndex: 30 }}>
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

          {tab === 'about' && (() => {
            const aboutByTopic = {
              'Phong thủy': {
                desc: 'Khóa học giúp bạn nắm vững phong thủy số học: từ tổng nút, ngũ hành, bát quái đến cách đối chiếu số hợp mệnh - hợp tuổi. Áp dụng ngay vào tư vấn SIM phong thủy chuyên nghiệp.',
                learn: ['Tính tổng nút & quẻ số chính xác', 'Đối chiếu mệnh - số - tuổi', 'Định giá SIM phong thủy theo dải', 'Luận giải ý nghĩa cho khách hàng'],
              },
              'Tư duy': {
                desc: 'Khóa học rèn luyện tâm thế và kỹ năng mềm cốt lõi để trở thành người tư vấn SIM phong thủy đẳng cấp. Từ tâm thức thịnh vượng đến kỹ năng lắng nghe, xử lý từ chối.',
                learn: ['Tâm thức thịnh vượng & năng lượng tích cực', 'Lắng nghe & đồng cảm thực sự', 'Xử lý từ chối chuyên nghiệp', 'Xây thương hiệu cá nhân tin cậy'],
              },
              'Kinh doanh': {
                desc: 'Khóa học cung cấp toàn bộ quy trình vận hành & nhân rộng kinh doanh SIM phong thủy: từ setup kho số, quy trình bán đến triển khai mạng lưới đại lý F1·F2·F3.',
                learn: ['Vận hành cửa hàng SIM phong thủy', 'Xây hệ thống đại lý F1·F2·F3', 'Tối ưu hoa hồng & dòng tiền', 'Marketing & content viral'],
              },
            };
            const a = aboutByTopic[item.topic] || aboutByTopic['Kinh doanh'];
            return (
            <div className="anim-fade" style={{ marginTop: 14 }}>
              <div style={{ fontSize: 14, color: '#334155', lineHeight: 1.6 }}>
                {a.desc} <strong style={{ color: '#0F172A' }}>{item.lessons} bài học</strong> trên ứng dụng, kèm template & case-study thật.
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginTop: 18 }}>Bạn sẽ học được</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                {a.learn.map((x) => (
                  <div key={x} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 8, background: b.soft, color: b.solid, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic.Check s={14} c={b.solid} w={2.4}/></div>
                    <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.5 }}>{x}</div>
                  </div>
                ))}
              </div>
            </div>
            );
          })()}

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

Object.assign(window, { CourseDetailScreen });
