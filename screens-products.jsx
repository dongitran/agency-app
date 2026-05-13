// screens-products.jsx — Sản phẩm: SIM phong thủy + Khóa học (segmented)

function ProductsScreen({ nav, brand, cardStyle, addToCart, user }) {
  const b = getBrand(brand);
  const initialSeg = (nav.current && nav.current.params && nav.current.params.seg) || 'sim';
  const [seg, setSeg] = React.useState(initialSeg);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  // SIM specific filters
  const [simFilter, setSimFilter] = React.useState('Tất cả');
  const [simFilters, setSimFilters] = React.useState({
    need: '',
    gender: '',
    carrier: '',
    prefix: '',
    suffix: '',
    cccd: '',
    priceMin: '',
    priceMax: '',
    dob: '',
  });

  const simCategories = [
    { k: 'Tất cả', l: 'Tất cả', i: '🌟' },
    { k: 'Tam hoa', l: 'Tam hoa', i: '💎' },
    { k: 'Tứ quý', l: 'Tứ quý', i: '👑' },
    { k: 'Ngũ quý', l: 'Ngũ quý', i: '🔥' },
    { k: 'Lộc phát', l: 'Lộc phát', i: '💸' },
    { k: 'Thần tài', l: 'Thần tài', i: '🧧' },
    { k: 'Hợp mệnh', l: 'Hợp mệnh', i: '☯️' },
    { k: 'Tiến cấp', l: 'Tiến cấp', i: '📈' },
    { k: 'Gánh đảo', l: 'Gánh đảo', i: '🔄' },
  ];

  const [courseCat, setCourseCat] = React.useState('Tất cả');
  const courseCats = ['Tất cả', 'Tư duy', 'Phong thủy', 'Kinh doanh'];

  const [accFilter, setAccFilter] = React.useState('Tất cả');
  const accFilters = ['Tất cả', 'Bán chạy', 'Cao cấp', 'Phổ biến', 'Limited'];

  const q = query.trim().toLowerCase();
  
  const matchSim = (s) => {
    if (q && !(String(s.number).toLowerCase().includes(q) || (s.name || '').toLowerCase().includes(q))) return false;
    if (simFilter !== 'Tất cả' && s.tag !== simFilter) return false;
    // Advanced filters
    if (simFilters.carrier && s.carrier !== simFilters.carrier) return false;
    if (simFilters.prefix && !s.number.startsWith(simFilters.prefix)) return false;
    if (simFilters.suffix && !s.number.endsWith(simFilters.suffix)) return false;
    if (simFilters.priceMin && s.price < parseInt(simFilters.priceMin)) return false;
    if (simFilters.priceMax && s.price > parseInt(simFilters.priceMax)) return false;
    return true;
  };

  const matchCourse = (c) =>
    !q ||
    (c.name || '').toLowerCase().includes(q) ||
    (c.mentor || '').toLowerCase().includes(q) ||
    (c.topic || '').toLowerCase().includes(q);

  const matchAcc = (a) =>
    !q ||
    (a.name || '').toLowerCase().includes(q) ||
    (a.material || '').toLowerCase().includes(q) ||
    (a.purpose || '').toLowerCase().includes(q);

  const simList = MOCK_SIMS.filter(matchSim);
  const courseList = MOCK_COURSES.filter((c) => (courseCat === 'Tất cả' ? true : c.topic === courseCat) && matchCourse(c));
  const accList = (typeof MOCK_ACCESSORIES !== 'undefined' ? MOCK_ACCESSORIES : []).filter((a) => (accFilter === 'Tất cả' ? true : a.tag === accFilter) && matchAcc(a));

  const mainCategories = [
    { k: 'sim', l: 'SIM số', i: Ic.Sim, c: '#2563EB' },
    { k: 'course', l: 'Khóa học', i: Ic.Book, c: '#7C3AED' },
    { k: 'accessory', l: 'Vật phẩm', i: Ic.Gift, c: '#EA580C' },
    { k: 'insurance', l: 'Bảo hiểm', i: Ic.Star, c: '#10B981' },
    { k: 'service', l: 'Dịch vụ', i: Ic.Settings, c: '#64748B' },
    { k: 'health', l: 'Sức khỏe', i: Ic.Heart, c: '#EF4444' },
    { k: 'news', l: 'Tin tức', i: Ic.Doc, c: '#3B82F6' },
  ];

  const onSwitchSeg = (k) => {
    setSeg(k);
    setQuery('');
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column' }} className="anim-fade">
      {/* Hero */}
      <div className="screen-hero" style={{
        background: `linear-gradient(160deg, ${b.grad[0]}, ${b.grad[1]})`,
        padding: '64px 18px 60px', color: '#fff', borderRadius: '0 0 28px 28px',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}/>
        <div style={{ position: 'absolute', bottom: -50, left: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Sản phẩm</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>
              {MOCK_SIMS.length} SIM phong thủy · {MOCK_COURSES.length} khóa học chuyên gia
            </div>
          </div>
          <button onClick={() => setSheetOpen(true)} className="tap" style={{
            width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Ic.Filter s={18} c="#fff"/>
          </button>
        </div>
      </div>

      {/* Segmented control — overlaps hero */}
      {/* Compact Main Categories — Horizontal Scroll */}
      <div style={{ padding: '16px 0 12px', flexShrink: 0, overflowX: 'auto', background: '#fff', borderBottom: '1px solid #F1F5F9' }} className="scroll-area">
        <div style={{ display: 'flex', gap: 18, padding: '0 20px' }}>
          {mainCategories.map((s) => {
            const active = seg === s.k;
            return (
              <button key={s.k} onClick={() => onSwitchSeg(s.k)} className="tap" style={{
                background: 'none', border: 'none', padding: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                minWidth: 64, flexShrink: 0,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 20,
                  background: active ? `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})` : '#F8FAFC',
                  color: active ? '#fff' : '#94A3B8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: active ? `0 8px 20px ${b.solid}44` : 'none',
                  border: active ? 'none' : '1px solid #E2E8F0',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <s.i s={26} c={active ? '#fff' : '#64748B'} w={active ? 2.2 : 1.8}/>
                </div>
                <span style={{ fontSize: 11, fontWeight: active ? 800 : 600, color: active ? b.solid : '#64748B', letterSpacing: -0.2 }}>{s.l}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-categories for SIM */}
      {seg === 'sim' && (
        <div className="anim-slide-up" style={{ padding: '0 0 14px', background: '#fff' }}>
          <div style={{ display: 'flex', gap: 10, padding: '0 20px', overflowX: 'auto' }} className="scroll-area">
            {simCategories.map((c) => (
              <button key={c.k} onClick={() => setSimFilter(c.k)} className="tap" style={{
                padding: '10px 14px', borderRadius: 14, border: 'none',
                background: simFilter === c.k ? b.soft : '#F8FAFC',
                color: simFilter === c.k ? b.solid : '#475569',
                display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                border: simFilter === c.k ? `1.5px solid ${b.solid}` : '1.5px solid transparent',
              }}>
                <span style={{ fontSize: 16 }}>{c.i}</span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{c.l}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search & Advanced Filter */}
      <div style={{ padding: '10px 18px', flexShrink: 0, display: 'flex', gap: 10 }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 10, height: 46, padding: '0 14px',
          background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0',
        }}>
          <Ic.Search s={16} c="#94A3B8"/>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={seg === 'sim' ? 'Nhập số SIM cần tìm...' : 'Tìm kiếm sản phẩm...'}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#0F172A', background: 'transparent' }}
          />
        </div>
        {seg === 'sim' && (
          <button onClick={() => setFilterSheetOpen(true)} className="tap" style={{
            width: 46, height: 46, borderRadius: 14, background: b.solid, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 16px ${b.solid}44`,
          }}>
            <Ic.Filter s={20} c="#fff"/>
          </button>
        )}
      </div>

      {/* Content pane */}
      <div key={seg} style={{ flex: 1, overflow: 'auto', padding: '8px 18px 30px' }} className="scroll-area anim-fade">
        {seg === 'sim' && (
          <SimSection list={simList} cardStyle={cardStyle} brand={brand} nav={nav} onSort={() => setSheetOpen(true)} user={user}/>
        )}
        {seg === 'course' && (
          <CourseSection list={courseList} cardStyle={cardStyle} brand={brand} nav={nav} user={user}/>
        )}
        {seg === 'accessory' && (
          <AccessorySection list={accList} brand={brand} nav={nav} user={user}/>
        )}
      </div>

      <Sheet open={filterSheetOpen} onClose={() => setFilterSheetOpen(false)} title="Bộ lọc SIM nâng cao" bottomOffset={0}>
        <div style={{ padding: '0 20px 30px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6, display: 'block', letterSpacing: 0.5 }}>NHÀ MẠNG</label>
              <select value={simFilters.carrier} onChange={e => setSimFilters({...simFilters, carrier: e.target.value})} style={{ width: '100%', height: 44, borderRadius: 12, border: '1.5px solid #E2E8F0', padding: '0 10px', fontSize: 14, background: '#F8FAFC' }}>
                <option value="">Tất cả</option>
                <option value="Viettel">Viettel</option>
                <option value="MobiFone">MobiFone</option>
                <option value="Vinaphone">Vinaphone</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6, display: 'block', letterSpacing: 0.5 }}>GIỚI TÍNH</label>
              <select value={simFilters.gender} onChange={e => setSimFilters({...simFilters, gender: e.target.value})} style={{ width: '100%', height: 44, borderRadius: 12, border: '1.5px solid #E2E8F0', padding: '0 10px', fontSize: 14, background: '#F8FAFC' }}>
                <option value="">Tất cả</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6, display: 'block', letterSpacing: 0.5 }}>NHU CẦU SỬ DỤNG</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Kinh doanh', 'Tài lộc', 'Bình an', 'Tình duyên'].map(n => (
                <Chip key={n} active={simFilters.need === n} onClick={() => setSimFilters({...simFilters, need: simFilters.need === n ? '' : n})} brand={brand}>{n}</Chip>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6, display: 'block', letterSpacing: 0.5 }}>ĐẦU SỐ</label>
              <Input placeholder="Ví dụ: 09..." value={simFilters.prefix} onChange={v => setSimFilters({...simFilters, prefix: v})} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6, display: 'block', letterSpacing: 0.5 }}>ĐUÔI SỐ</label>
              <Input placeholder="Ví dụ: 888" value={simFilters.suffix} onChange={v => setSimFilters({...simFilters, suffix: v})} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6, display: 'block', letterSpacing: 0.5 }}>NGÀY SINH</label>
              <Input type="date" value={simFilters.dob} onChange={v => setSimFilters({...simFilters, dob: v})} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6, display: 'block', letterSpacing: 0.5 }}>SỐ CCCD (4 SỐ CUỐI)</label>
              <Input placeholder="Ví dụ: 1234" value={simFilters.cccd} onChange={v => setSimFilters({...simFilters, cccd: v})} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6, display: 'block', letterSpacing: 0.5 }}>KHOẢNG GIÁ</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1 }}><Input placeholder="Từ" value={simFilters.priceMin} onChange={v => setSimFilters({...simFilters, priceMin: v})} /></div>
              <span style={{ color: '#94A3B8' }}>—</span>
              <div style={{ flex: 1 }}><Input placeholder="Đến" value={simFilters.priceMax} onChange={v => setSimFilters({...simFilters, priceMax: v})} /></div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
            <button onClick={() => { setSimFilters({ need: '', gender: '', carrier: '', prefix: '', suffix: '', cccd: '', priceMin: '', priceMax: '', dob: '' }); setFilterSheetOpen(false); }} className="tap" style={{ flex: 1, height: 50, borderRadius: 14, background: '#F1F5F9', border: 'none', fontSize: 15, fontWeight: 700, color: '#64748B' }}>Xóa lọc</button>
            <PrimaryButton fullWidth onClick={() => setFilterSheetOpen(false)} brand={brand}>Áp dụng</PrimaryButton>
          </div>
        </div>
      </Sheet>

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Sắp xếp danh sách" bottomOffset={88}>
        <div style={{ padding: '6px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(seg === 'sim'
            ? ['Phù hợp nhất', 'Giá thấp đến cao', 'Giá cao đến thấp', 'Số mới nhất', 'Bán chạy nhất']
            : ['Phù hợp nhất', 'Bán chạy nhất', 'Mới nhất', 'Đánh giá cao nhất']
          ).map((o, i) => (
            <div key={o} onClick={() => setSheetOpen(false)} className="tap" style={{
              padding: '14px 16px', borderRadius: 14, background: i === 0 ? b.soft : '#F8FAFC',
              border: i === 0 ? `1.5px solid ${b.solid}` : '1.5px solid transparent',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{o}</span>
              {i === 0 && <Ic.Check c={b.solid}/>}
            </div>
          ))}
        </div>
      </Sheet>
    </div>
  );
}

function CommissionBadge({ item, brand, size = 'sm' }) {
  if (!item || !item.commission) return null;
  const amt = estCommission(item);
  if (size === 'sm') {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 7px', borderRadius: 6, background: 'rgba(245,158,11,0.14)', color: '#B45309', fontSize: 10, fontWeight: 800 }}>
        <span>🎁</span>+{vndShort(amt)}
      </div>
    );
  }
  return null;
}

function SimSection({ list, cardStyle, brand, nav, onSort, user }) {
  const b = getBrand(brand);
  if (list.length === 0) return <EmptyState label="Không có SIM phù hợp"/>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4px 4px 12px' }}>
        <div style={{ fontSize: 12, color: '#64748B' }}><strong style={{ color: '#0F172A' }}>{list.length}</strong> SIM phù hợp</div>
        <div style={{ fontSize: 12, color: '#0F172A', fontWeight: 600, display: 'flex', gap: 4, alignItems: 'center' }} className="tap" onClick={onSort}>
          Sắp xếp <Ic.Chevron s={12}/>
        </div>
      </div>

      {cardStyle === 'rich' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {list.map((s) => (
            <Card key={s.id} onClick={() => nav.push('sim-detail', { item: s })} style={{ overflow: 'hidden' }}>
              <div style={{ height: 92, background: `linear-gradient(115deg, ${s.color}, ${s.color}aa)`, color: '#fff', padding: 14, position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 700, letterSpacing: 1 }}>{s.carrier.toUpperCase()}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4, letterSpacing: -0.4, fontFeatureSettings: '"tnum"' }}>{s.number}</div>
                </div>
                <Badge color="amber" style={{ alignSelf: 'flex-start' }}>{s.tag}</Badge>
              </div>
              <div style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{s.name}</div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 4, fontSize: 11, color: '#64748B' }}>
                    <span>📶 {s.data}</span>
                    <span>📞 {s.call}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: b.solid, letterSpacing: -0.3 }}>{vnd(s.price)}</div>
                  {s.oldPrice && <div style={{ fontSize: 11, color: '#94A3B8', textDecoration: 'line-through' }}>{vnd(s.oldPrice)}</div>}
                  {user?.isAgent && <div style={{ marginTop: 3 }}><CommissionBadge item={s} brand={brand}/></div>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {cardStyle === 'compact' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.map((s) => (
            <Card key={s.id} onClick={() => nav.push('sim-detail', { item: s })} style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ic.Sim s={26} c="#fff"/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', letterSpacing: -0.3 }}>{s.number}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{s.carrier} · {s.data}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: b.solid }}>{vnd(s.price)}</div>
                {s.tag && <Badge color="slate" style={{ marginTop: 2 }}>{s.tag}</Badge>}
              </div>
            </Card>
          ))}
        </div>
      )}

      {cardStyle === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {list.map((s) => (
            <Card key={s.id} onClick={() => nav.push('sim-detail', { item: s })} style={{ overflow: 'hidden' }}>
              <div style={{ height: 80, background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`, color: '#fff', padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Badge color="amber" style={{ alignSelf: 'flex-start' }}>{s.tag}</Badge>
                <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>{s.number}</div>
              </div>
              <div style={{ padding: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                <div style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>{s.data}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: b.solid, marginTop: 6 }}>{vnd(s.price)}</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

function CourseSection({ list, cardStyle, brand, nav, user }) {
  const b = getBrand(brand);
  if (list.length === 0) return <EmptyState label="Không có khóa học phù hợp"/>;

  const featured = list[0];

  return (
    <>
      {/* Featured */}
      <Card onClick={() => nav.push('course-detail', { item: featured })} style={{ overflow: 'hidden', marginBottom: 14 }}>
        <div style={{ height: 150, background: `linear-gradient(135deg, ${featured.cover}, ${featured.cover}88)`, padding: 16, position: 'relative', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Badge color="amber">⭐ Bestseller</Badge>
            {featured.oldPrice && <Badge color="red">-{Math.round((1 - featured.price / featured.oldPrice) * 100)}%</Badge>}
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 700, letterSpacing: 1 }}>{(featured.level || '').toUpperCase()}</div>
            <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4, letterSpacing: -0.4, lineHeight: 1.2 }}>{featured.name}</div>
          </div>
        </div>
        <div style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: '#64748B' }}>{featured.mentor} · {featured.lessons} bài</div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 4, fontSize: 12 }}>
              <Ic.Star s={14} f="#F59E0B"/><strong style={{ color: '#0F172A' }}>{featured.rating}</strong>
              <span style={{ color: '#64748B' }}>· {featured.students.toLocaleString()} học viên</span>
            </div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: b.solid }}>{vnd(featured.price)}</div>
        </div>
      </Card>

      <SectionHead title={`Tất cả khóa học · ${list.length}`}/>
      <div style={{ display: cardStyle === 'grid' ? 'grid' : 'flex', flexDirection: 'column', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {list.map((c) => (
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
                  {c.oldPrice && <Badge color="red">-{Math.round((1 - c.price / c.oldPrice) * 100)}%</Badge>}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginTop: 5, lineHeight: 1.3 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{c.mentor} · {c.lessons} bài · ⭐{c.rating}</div>
                <div style={{ marginTop: 6, fontSize: 15, fontWeight: 800, color: b.solid }}>{vnd(c.price)}</div>
              </div>
            </Card>
          )
        ))}
      </div>
    </>
  );
}

function AccessorySection({ list, brand, nav, user }) {
  const b = getBrand(brand);
  if (list.length === 0) return <EmptyState label="Không có vật phẩm phù hợp"/>;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {list.map((a) => (
        <Card key={a.id} onClick={() => nav.push('sim-detail', { item: { ...a, type: 'accessory', number: a.material, tag: a.tag, simType: a.material, data: a.purpose, call: '—', luanGiai: { tongNut: null, nguHanh: { element: a.element, meaning: `Mệnh ${a.element} · ${a.purpose}` }, daiDep: null, digitMeanings: [], expertNote: `Vật phẩm "${a.name}" được chế tác thủ công, ${a.purpose.toLowerCase()}.` } } })} style={{ overflow: 'hidden' }}>
          <div style={{ height: 110, background: `linear-gradient(135deg, ${a.color}, ${a.color}cc)`, padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff', position: 'relative' }}>
            {a.tag && <Badge color="amber" style={{ alignSelf: 'flex-start' }}>{a.tag}</Badge>}
            <div style={{ fontSize: 56, lineHeight: 1, alignSelf: 'flex-end' }}>{a.image}</div>
          </div>
          <div style={{ padding: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', lineHeight: 1.3, height: 34, overflow: 'hidden' }}>{a.name}</div>
            <div style={{ fontSize: 10, color: '#64748B', marginTop: 4 }}>{a.material}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 6 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: b.solid }}>{vnd(a.price)}</div>
                {a.oldPrice && <div style={{ fontSize: 10, color: '#94A3B8', textDecoration: 'line-through' }}>{vnd(a.oldPrice)}</div>}
              </div>
              {user?.isAgent && <CommissionBadge item={a} brand={brand}/>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 11, marginTop: 4, opacity: 0.8 }}>Thử bỏ bớt bộ lọc hoặc đổi từ khóa.</div>
    </div>
  );
}

Object.assign(window, { ProductsScreen });
