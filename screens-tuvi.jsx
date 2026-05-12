// screens-tuvi.jsx — Tử vi: lập lá số 12 cung

const TUVI_API = 'https://phuclinhbaodinh.vn/apiServer/tu-vi';
const CORS_PROXY = 'https://corsproxy.io/?';

function buildTuViUrl({ hoten, gender, dobDay, dobMonth, dobYear, hour, minute, namXem }) {
  const isNam = gender === 'male' ? 1 : 0;
  const params = new URLSearchParams({
    version: 20211215,
    hoten: hoten || '',
    isDuong: 1,
    isNam,
    gio: hour,
    ngay: dobDay,
    thang: dobMonth,
    nam: dobYear,
    mau: 1,
    luuthaitue: 1,
    gioDH: hour,
    gioDM: minute,
    kieuls: 0,
    namHan: namXem,
    anTuHoa: 1,
    checkDaiVan: 0,
    check4Hoa: 1,
    checkLuuKhac: 1,
    checkLuuTuanTriet: 1,
  });
  return `${TUVI_API}?${params.toString()}`;
}

async function fetchTuVi(form) {
  const realUrl = buildTuViUrl(form);
  try {
    const proxied = CORS_PROXY + encodeURIComponent(realUrl);
    const res = await fetch(proxied);
    if (!res.ok) throw new Error('proxy ' + res.status);
    const data = await res.json();
    if (!data || !data.Cac_cung) throw new Error('bad payload');
    return { data, source: 'live' };
  } catch (e) {
    if (typeof window !== 'undefined' && window.__TUVI_MOCK) {
      return { data: window.__TUVI_MOCK, source: 'mock', error: String(e) };
    }
    throw e;
  }
}

function TuViScreen({ nav, brand, user, showToast }) {
  const b = getBrand(brand);
  const today = new Date();
  const nowYear = today.getFullYear();
  const [phase, setPhase] = React.useState('form'); // form · loading · result
  const [result, setResult] = React.useState(null);
  const [source, setSource] = React.useState(null);
  const [selectedCung, setSelectedCung] = React.useState(null);
  const [form, setForm] = React.useState({
    hoten: user?.name || '',
    gender: 'male',
    dobDay: '17',
    dobMonth: '10',
    dobYear: '1990',
    hour: '03',
    minute: '25',
    namXem: String(nowYear),
  });
  const [errors, setErrors] = React.useState({});

  const setField = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: null }));
  };

  const validate = () => {
    const er = {};
    if (!form.hoten.trim()) er.hoten = 'Vui lòng nhập họ tên';
    if (!form.dobDay) er.dobDay = '!';
    if (!form.dobMonth) er.dobMonth = '!';
    if (!form.dobYear) er.dobYear = '!';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) {
      showToast && showToast('Thiếu thông tin');
      return;
    }
    setPhase('loading');
    try {
      const { data, source: src } = await fetchTuVi(form);
      setResult(data);
      setSource(src);
      setPhase('result');
      if (src === 'mock') showToast && showToast('Dùng dữ liệu mẫu (API chặn CORS)');
    } catch (e) {
      setPhase('form');
      showToast && showToast('Không tính được lá số. Thử lại.');
    }
  };

  const onReset = () => {
    setPhase('form');
    setResult(null);
    setSelectedCung(null);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0B0F1A', display: 'flex', flexDirection: 'column' }} className="anim-fade">
      {phase === 'form' && (
        <TuViForm
          form={form}
          errors={errors}
          setField={setField}
          onSubmit={onSubmit}
          brand={brand}
          nowYear={nowYear}
        />
      )}
      {phase === 'loading' && <TuViLoading brand={brand}/>}
      {phase === 'result' && result && (
        <TuViResult
          data={result}
          source={source}
          brand={brand}
          form={form}
          onReset={onReset}
          onCungSelect={setSelectedCung}
        />
      )}

      <Sheet
        open={!!selectedCung}
        onClose={() => setSelectedCung(null)}
        title={selectedCung ? `Cung ${selectedCung.Name}` : ''}
      >
        {selectedCung && <CungDetail cung={selectedCung} brand={brand}/>}
      </Sheet>
    </div>
  );
}

/* ---------------------------------- Form ---------------------------------- */

function TuViForm({ form, errors, setField, onSubmit, brand, nowYear }) {
  const b = getBrand(brand);
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const years = Array.from({ length: 110 }, (_, i) => String(nowYear - i));
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = ['00', '15', '25', '30', '45'];
  const namXemRange = Array.from({ length: 12 }, (_, i) => String(nowYear - 2 + i));

  return (
    <>
      {/* Hero */}
      <div className="screen-hero" style={{
        background: 'linear-gradient(165deg, #1E1B4B 0%, #312E81 45%, #4C1D95 100%)',
        padding: '60px 18px 26px', color: '#fff', borderRadius: '0 0 28px 28px',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <StarField/>
        <div style={{ position: 'relative' }}>
          <Badge color="amber">⭐ TỬ VI ĐẨU SỐ</Badge>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 10, letterSpacing: -0.5 }}>Lập lá số tử vi</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4, lineHeight: 1.5 }}>
            12 cung mệnh · sao chính tinh · sao tốt xấu — luận giải bởi chuyên gia phong thủy
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '16px 18px 30px' }} className="scroll-area">
        {/* Họ tên */}
        <FieldLabel>Họ và tên</FieldLabel>
        <TInput
          value={form.hoten}
          onChange={(v) => setField('hoten', v)}
          placeholder="VD: Nguyễn Văn A"
          error={errors.hoten}
        />

        {/* Giới tính */}
        <FieldLabel mt={14}>Giới tính</FieldLabel>
        <div style={{ display: 'flex', gap: 0, background: '#1A1F2E', borderRadius: 12, padding: 4 }}>
          {[
            { k: 'male', l: 'Nam', i: '♂' },
            { k: 'female', l: 'Nữ', i: '♀' },
          ].map((g) => {
            const active = form.gender === g.k;
            return (
              <button key={g.k} onClick={() => setField('gender', g.k)} className="tap" style={{
                flex: 1, height: 42, borderRadius: 9, border: 'none',
                background: active ? `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})` : 'transparent',
                color: active ? '#fff' : '#94A3B8',
                fontSize: 14, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <span style={{ fontSize: 16 }}>{g.i}</span> {g.l}
              </button>
            );
          })}
        </div>

        {/* Ngày sinh */}
        <FieldLabel mt={14}>Ngày sinh (dương lịch)</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.4fr', gap: 8 }}>
          <TSelect value={form.dobDay} onChange={(v) => setField('dobDay', v)} options={days} placeholder="Ngày" error={errors.dobDay}/>
          <TSelect value={form.dobMonth} onChange={(v) => setField('dobMonth', v)} options={months} placeholder="Tháng" error={errors.dobMonth}/>
          <TSelect value={form.dobYear} onChange={(v) => setField('dobYear', v)} options={years} placeholder="Năm" error={errors.dobYear}/>
        </div>

        {/* Giờ sinh */}
        <FieldLabel mt={14}>Giờ sinh</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <TSelect value={form.hour} onChange={(v) => setField('hour', v)} options={hours} placeholder="Giờ"/>
          <TSelect value={form.minute} onChange={(v) => setField('minute', v)} options={minutes} placeholder="Phút"/>
        </div>

        {/* Năm xem */}
        <FieldLabel mt={14}>Năm xem hạn</FieldLabel>
        <TSelect value={form.namXem} onChange={(v) => setField('namXem', v)} options={namXemRange} placeholder="Năm xem"/>

        <button onClick={onSubmit} className="tap" style={{
          marginTop: 22, width: '100%', height: 54, borderRadius: 16,
          background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`,
          color: '#fff', border: 'none',
          fontSize: 15, fontWeight: 800, letterSpacing: 1,
          boxShadow: `0 10px 24px ${b.solid}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Ic.Sparkles s={18} c="#fff"/> AN SAO
        </button>

        <div style={{ marginTop: 14, padding: 12, background: 'rgba(245,158,11,0.08)', borderRadius: 12, border: '1px solid rgba(245,158,11,0.25)' }}>
          <div style={{ fontSize: 11, color: '#FCD34D', fontWeight: 700 }}>💡 Mẹo</div>
          <div style={{ fontSize: 12, color: '#CBD5E1', marginTop: 4, lineHeight: 1.5 }}>
            Giờ sinh càng chính xác, lá số càng đúng. Nếu chưa nhớ giờ, bạn có thể chọn áng chừng và nhờ chuyên gia hiệu chỉnh sau.
          </div>
        </div>
      </div>
    </>
  );
}

function FieldLabel({ children, mt }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 700, color: '#CBD5E1', marginTop: mt || 0, marginBottom: 6, letterSpacing: 0.2 }}>{children}</div>
  );
}

function TInput({ value, onChange, placeholder, error }) {
  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', height: 46, padding: '0 14px', borderRadius: 12,
          background: '#1A1F2E',
          border: `1.5px solid ${error ? '#EF4444' : '#2A3142'}`,
          color: '#fff', fontSize: 14, outline: 'none',
          boxSizing: 'border-box',
        }}
      />
      {error && <div style={{ fontSize: 11, color: '#FCA5A5', marginTop: 4 }}>{error}</div>}
    </div>
  );
}

function TSelect({ value, onChange, options, placeholder, error }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', height: 46, padding: '0 32px 0 12px', borderRadius: 12,
          background: '#1A1F2E',
          border: `1.5px solid ${error ? '#EF4444' : '#2A3142'}`,
          color: value ? '#fff' : '#64748B', fontSize: 14, outline: 'none',
          appearance: 'none', WebkitAppearance: 'none',
          boxSizing: 'border-box', fontWeight: 600,
        }}
      >
        {!value && <option value="">{placeholder}</option>}
        {options.map((o) => <option key={o} value={o} style={{ background: '#1A1F2E' }}>{o}</option>)}
      </select>
      <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748B' }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/></svg>
      </div>
    </div>
  );
}

function StarField() {
  // decorative tiny stars
  const stars = React.useMemo(() => (
    Array.from({ length: 28 }, () => ({
      l: Math.random() * 100,
      t: Math.random() * 100,
      o: 0.2 + Math.random() * 0.7,
      s: 1 + Math.random() * 1.6,
    }))
  ), []);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${s.l}%`, top: `${s.t}%`,
          width: s.s, height: s.s, borderRadius: '50%', background: '#fff',
          opacity: s.o, boxShadow: `0 0 ${s.s * 3}px rgba(255,255,255,0.4)`,
        }}/>
      ))}
    </div>
  );
}

/* ---------------------------------- Loading ---------------------------------- */

function TuViLoading({ brand }) {
  const b = getBrand(brand);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, background: 'linear-gradient(165deg, #0B0F1A 0%, #1E1B4B 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }} className="anim-fade">
      <StarField/>
      <div style={{ position: 'relative', width: 110, height: 110 }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px dashed rgba(168,85,247,0.4)',
          animation: 'tuvi-rotate 8s linear infinite',
        }}/>
        <div style={{
          position: 'absolute', inset: 14, borderRadius: '50%',
          border: '2px solid rgba(168,85,247,0.7)',
          animation: 'tuvi-rotate-rev 5s linear infinite',
        }}/>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 38, animation: 'tuvi-pulse 2.6s ease-in-out infinite',
        }}>☯</div>
      </div>
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>ĐANG AN SAO…</div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>Sắp xếp 12 cung & các sao chính tinh</div>
      </div>
      <style>{`
        @keyframes tuvi-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes tuvi-rotate-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes tuvi-pulse { 0%,100% { opacity: 0.65; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.05); } }
      `}</style>
    </div>
  );
}

/* ---------------------------------- Result ---------------------------------- */

function TuViResult({ data, source, brand, form, onReset, onCungSelect }) {
  const b = getBrand(brand);
  const info = data.Info || {};
  const cungList = data.Cac_cung || [];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0B0F1A' }}>
      {/* Personal info hero */}
      <div className="screen-hero" style={{
        background: 'linear-gradient(165deg, #1E1B4B 0%, #312E81 60%, #4C1D95 100%)',
        padding: '54px 18px 18px', color: '#fff',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <StarField/>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Badge color="amber">LÁ SỐ {source === 'mock' ? '· DEMO' : ''}</Badge>
            <div style={{ fontSize: 20, fontWeight: 800, marginTop: 8, letterSpacing: -0.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {form.hoten || 'Quý khách'}
            </div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>
              {form.gender === 'male' ? '♂ Nam' : '♀ Nữ'} · {form.dobDay}/{form.dobMonth}/{form.dobYear} · {form.hour}:{form.minute}
            </div>
          </div>
          <button onClick={onReset} className="tap" style={{
            padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.18)',
            border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', gap: 4, alignItems: 'center',
          }}>
            <Ic.Refresh s={14} c="#fff"/> Lập lại
          </button>
        </div>

        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 14 }}>
          {[
            { l: 'Tuổi', v: info.Nam || '—' },
            { l: 'Mệnh', v: info.MenhCuc || '—' },
            { l: 'Cục', v: info.Cuc || '—' },
            { l: 'Năm xem', v: info.NamHan || form.namXem },
          ].map((s) => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '8px 6px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 9, opacity: 0.7, fontWeight: 700, letterSpacing: 0.4 }}>{s.l.toUpperCase()}</div>
              <div style={{ fontSize: 11, fontWeight: 700, marginTop: 3, lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 12 cung grid */}
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 12px 30px' }} className="scroll-area">
        <div style={{ fontSize: 11, color: '#64748B', textAlign: 'center', marginBottom: 10 }}>
          Chạm vào cung để xem chi tiết sao
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {cungList.map((c, i) => (
            <CungCard key={i} cung={c} brand={brand} onClick={() => onCungSelect(c)}/>
          ))}
        </div>

        <button onClick={onReset} className="tap" style={{
          marginTop: 18, width: '100%', height: 48, borderRadius: 14,
          background: 'transparent', border: `1.5px solid ${b.solid}`,
          color: b.solid, fontSize: 14, fontWeight: 700,
        }}>
          Lập lá số khác
        </button>
      </div>
    </div>
  );
}

function CungCard({ cung, onClick, brand }) {
  const b = getBrand(brand);
  const chinh = Array.isArray(cung.ChinhTinh) ? cung.ChinhTinh : [];
  const tot = Array.isArray(cung.Saotot) ? cung.Saotot : [];
  const xau = Array.isArray(cung.Saoxau) ? cung.Saoxau : [];
  const tag = cung.LuuDaiHanTen || '';

  return (
    <button onClick={onClick} className="tap" style={{
      background: 'linear-gradient(165deg, #1A1F2E 0%, #0F1320 100%)',
      border: '1px solid #2A3142',
      borderRadius: 10, padding: '8px 6px',
      color: '#fff', minHeight: 110,
      display: 'flex', flexDirection: 'column', textAlign: 'left', cursor: 'pointer',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: b.solid === '#0F172A' ? '#A78BFA' : b.solid, textTransform: 'uppercase', letterSpacing: 0.4 }}>{cung.Name}</div>
        {cung.Than === 1 && <span style={{ fontSize: 8, padding: '1px 4px', borderRadius: 4, background: '#F59E0B', color: '#000', fontWeight: 800 }}>THÂN</span>}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, overflow: 'hidden' }}>
        {chinh.slice(0, 2).map((s, i) => (
          <div key={'c'+i} style={{ fontSize: 10, fontWeight: 700, color: '#FCD34D', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {s.Name}{s.Status ? ` (${s.Status})` : ''}
          </div>
        ))}
        {chinh.length === 0 && <div style={{ fontSize: 9, color: '#475569', fontStyle: 'italic' }}>—</div>}

        {tot.slice(0, 2).map((s, i) => (
          <div key={'t'+i} style={{ fontSize: 9, color: '#86EFAC', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            + {s.Name}
          </div>
        ))}
        {xau.slice(0, 1).map((s, i) => (
          <div key={'x'+i} style={{ fontSize: 9, color: '#FCA5A5', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            − {s.Name}
          </div>
        ))}
      </div>

      {tag && (
        <div style={{ marginTop: 4, fontSize: 8, color: '#94A3B8', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {tag}
        </div>
      )}
    </button>
  );
}

function CungDetail({ cung, brand }) {
  const b = getBrand(brand);
  const groups = [
    { title: 'Chính tinh', items: cung.ChinhTinh || [], color: '#FCD34D', prefix: '★' },
    { title: 'Sao tốt', items: cung.Saotot || [], color: '#86EFAC', prefix: '+' },
    { title: 'Sao xấu', items: cung.Saoxau || [], color: '#FCA5A5', prefix: '−' },
  ];
  return (
    <div style={{ padding: '0 20px 20px', maxHeight: 460, overflow: 'auto' }} className="scroll-area">
      <div style={{ display: 'flex', gap: 8, padding: '0 0 14px', flexWrap: 'wrap' }}>
        {cung.TrangSinh && <Badge color="purple">{cung.TrangSinh}</Badge>}
        {cung.LuuDaiHanTen && <Badge color="blue">{cung.LuuDaiHanTen}</Badge>}
        {cung.LuuTieuHanTen && <Badge color="amber">{cung.LuuTieuHanTen}</Badge>}
        {cung.Than === 1 && <Badge color="red">Thân cư</Badge>}
        {cung.Tuan === 1 && <Badge color="slate">Tuần</Badge>}
        {cung.Triet === 1 && <Badge color="slate">Triệt</Badge>}
      </div>

      {groups.map((g) => (
        <div key={g.title} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
            {g.title} <span style={{ opacity: 0.6, fontWeight: 600 }}>({g.items.length})</span>
          </div>
          {g.items.length === 0 ? (
            <div style={{ fontSize: 12, color: '#94A3B8', fontStyle: 'italic' }}>Không có</div>
          ) : (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {g.items.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '6px 10px', borderRadius: 10,
                  background: `${g.color}18`,
                  border: `1px solid ${g.color}55`,
                  fontSize: 12, fontWeight: 600, color: '#0F172A',
                }}>
                  <span style={{ color: g.color === '#FCD34D' ? '#A16207' : g.color === '#86EFAC' ? '#15803D' : '#B91C1C', fontWeight: 800 }}>{g.prefix}</span>
                  {s.Name}{s.Status ? ` (${s.Status})` : ''}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { TuViScreen });
