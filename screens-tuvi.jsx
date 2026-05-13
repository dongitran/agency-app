// screens-tuvi.jsx — Tử vi: lập lá số 12 cung (4×4 layout truyền thống)

const TUVI_API = 'https://phuclinhbaodinh.vn/apiServer/tu-vi';
// Cloudflare Worker proxy — replaced after deploy. Format: pass real URL via ?url=
const TUVI_PROXY = 'https://tu-vi-proxy.thiendong.workers.dev/?url=';

const CAN_NAMES = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI_NAMES = ['Tí', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// Chi index → [gridRow, gridColumn] in the 4x4 chart (1-indexed)
const CHI_TO_GRID = {
  5: [1, 1], 6: [1, 2], 7: [1, 3], 8: [1, 4],
  4: [2, 1],                       9: [2, 4],
  3: [3, 1],                      10: [3, 4],
  2: [4, 1], 1: [4, 2], 0: [4, 3], 11: [4, 4],
};

const STATUS_COLORS = {
  M: { c: '#FCD34D', l: 'Miếu' },
  V: { c: '#7DD3FC', l: 'Vượng' },
  Đ: { c: '#86EFAC', l: 'Đắc' },
  D: { c: '#86EFAC', l: 'Đắc' },
  H: { c: '#FCA5A5', l: 'Hãm' },
  B: { c: '#A78BFA', l: 'Bình' },
};

// Watermark emoji per chi position — visual cue per cung cell (≈10% opacity)
const ZODIAC_EMOJI = ['🐀', '🐂', '🐅', '🐈', '🐉', '🐍', '🐎', '🐐', '🐒', '🐓', '🐕', '🐖'];

// Bát Trạch — ported from sample/constants/appConstant.ts
const BIRTHDAY_YEAR_DATA = [
  { years: [1940, 1949, 1958, 1967, 1976, 1985, 1994, 2003, 2012, 2021], nam: 'canf', nu: 'ly' },
  { years: [1941, 1950, 1959, 1968, 1977, 1986, 1995, 2004, 2013, 2022], nam: 'khon', nu: 'kham' },
  { years: [1942, 1951, 1960, 1969, 1978, 1987, 1996, 2005, 2014, 2023], nam: 'ton', nu: 'khon' },
  { years: [1943, 1952, 1961, 1970, 1979, 1988, 1997, 2006, 2015, 2024], nam: 'chan', nu: 'chan' },
  { years: [1944, 1953, 1962, 1971, 1980, 1989, 1998, 2007, 2016, 2025], nam: 'khon', nu: 'ton' },
  { years: [1945, 1954, 1963, 1972, 1981, 1990, 1999, 2008, 2017, 2026], nam: 'kham', nu: 'can' },
  { years: [1946, 1955, 1964, 1973, 1982, 1991, 2000, 2009, 2018, 2027], nam: 'ly', nu: 'canf' },
  { years: [1947, 1956, 1965, 1974, 1983, 1992, 2001, 2010, 2019, 2028], nam: 'can', nu: 'doai' },
  { years: [1948, 1957, 1966, 1975, 1984, 1993, 2002, 2011, 2020, 2029], nam: 'doai', nu: 'can' },
];

const CUNG_MENH_DATA = {
  canf: { 'Sanh Khí': 'Tây', 'Họa Hại': 'Đông nam', 'Diên Niên': 'Tây nam', 'Tuyệt Mệnh': 'Nam', 'Thiên Y': 'Đông bắc', 'Lục Sát': 'Bắc', 'Phục Vị': 'Tây bắc', 'Ngũ Quỷ': 'Đông' },
  can:  { 'Sanh Khí': 'Tây nam', 'Họa Hại': 'Nam', 'Diên Niên': 'Tây', 'Tuyệt Mệnh': 'Đông nam', 'Thiên Y': 'Tây bắc', 'Lục Sát': 'Đông', 'Phục Vị': 'Đông bắc', 'Ngũ Quỷ': 'Bắc' },
  kham: { 'Sanh Khí': 'Đông nam', 'Họa Hại': 'Tây', 'Diên Niên': 'Nam', 'Tuyệt Mệnh': 'Tây nam', 'Thiên Y': 'Đông', 'Lục Sát': 'Tây bắc', 'Phục Vị': 'Bắc', 'Ngũ Quỷ': 'Đông bắc' },
  chan: { 'Sanh Khí': 'Nam', 'Họa Hại': 'Tây nam', 'Diên Niên': 'Đông nam', 'Tuyệt Mệnh': 'Tây', 'Thiên Y': 'Bắc', 'Lục Sát': 'Đông bắc', 'Phục Vị': 'Đông', 'Ngũ Quỷ': 'Tây bắc' },
  ton:  { 'Sanh Khí': 'Bắc', 'Họa Hại': 'Tây bắc', 'Diên Niên': 'Đông', 'Tuyệt Mệnh': 'Đông bắc', 'Thiên Y': 'Nam', 'Lục Sát': 'Tây', 'Phục Vị': 'Đông nam', 'Ngũ Quỷ': 'Tây nam' },
  ly:   { 'Sanh Khí': 'Đông', 'Họa Hại': 'Đông bắc', 'Diên Niên': 'Bắc', 'Tuyệt Mệnh': 'Tây bắc', 'Thiên Y': 'Đông nam', 'Lục Sát': 'Tây nam', 'Phục Vị': 'Nam', 'Ngũ Quỷ': 'Tây' },
  khon: { 'Sanh Khí': 'Đông bắc', 'Họa Hại': 'Đông', 'Diên Niên': 'Tây bắc', 'Tuyệt Mệnh': 'Bắc', 'Thiên Y': 'Tây', 'Lục Sát': 'Nam', 'Phục Vị': 'Tây nam', 'Ngũ Quỷ': 'Đông nam' },
  doai: { 'Sanh Khí': 'Tây bắc', 'Họa Hại': 'Bắc', 'Diên Niên': 'Đông bắc', 'Tuyệt Mệnh': 'Đông', 'Thiên Y': 'Tây nam', 'Lục Sát': 'Đông nam', 'Phục Vị': 'Tây', 'Ngũ Quỷ': 'Nam' },
};
const SAO_TOT = ['Sanh Khí', 'Diên Niên', 'Thiên Y', 'Phục Vị'];
const CUNG_PHI_MAP = { 1: 'Khảm', 2: 'Khôn', 3: 'Chấn', 4: 'Tốn', 5: 'Không có cung', 6: 'Càn', 7: 'Đoài', 8: 'Cấn', 9: 'Ly' };

function canChi(canIdx, chiIdx) {
  const can = CAN_NAMES[canIdx] || '';
  const chi = CHI_NAMES[chiIdx] || '';
  return `${can} ${chi}`.trim();
}

function sinhLaoBenhTu(name) {
  if (!name) return '';
  const s = name.trim().replace(/\s+/g, '');
  if (!s.length) return '';
  const m = s.length % 4;
  return m === 1 ? 'Sinh' : m === 2 ? 'Lão' : m === 3 ? 'Bệnh' : 'Tử';
}

function getCungMenhInfo(year, gender) {
  // gender: 'male' | 'female'
  const entry = BIRTHDAY_YEAR_DATA.find((d) => d.years.includes(+year));
  if (!entry) return null;
  const cungKey = gender === 'male' ? entry.nam : entry.nu;
  const map = CUNG_MENH_DATA[cungKey];
  if (!map) return null;
  const tot = [], xau = [];
  Object.entries(map).forEach(([k, v]) => (SAO_TOT.includes(k) ? tot : xau).push(`${k}: ${v}`));
  return { saoTot: tot.join(' · '), saoXau: xau.join(' · '), key: cungKey };
}

function calculateCungPhi(year, gender) {
  // gender: 'male' | 'female'; uses solar year as approximation of lunar year
  const y = +year;
  if (!y) return '';
  let a = y % 100;
  if (a > 9) {
    a = Math.floor(a / 10) + (a % 10);
    if (a > 9) a = Math.floor(a / 10) + (a % 10);
  }
  if (y >= 2000) {
    a += 1;
    if (a > 9) a = Math.floor(a / 10) + (a % 10);
  }
  let cungNumber;
  if (gender === 'male') {
    cungNumber = 10 - a;
  } else {
    cungNumber = 5 + a;
    if (cungNumber > 9) cungNumber = Math.floor(cungNumber / 10) + (cungNumber % 10);
  }
  if (cungNumber === 5) return gender === 'male' ? 'Khôn' : 'Cấn';
  return CUNG_PHI_MAP[cungNumber] || '';
}

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
    const proxied = TUVI_PROXY + encodeURIComponent(realUrl);
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
  const today = new Date();
  const nowYear = today.getFullYear();
  const [phase, setPhase] = React.useState('form');
  const [result, setResult] = React.useState(null);
  const [source, setSource] = React.useState(null);
  const [selectedCung, setSelectedCung] = React.useState(null);
  const [personalOpen, setPersonalOpen] = React.useState(false);
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
    if (!validate()) { showToast && showToast('Thiếu thông tin'); return; }
    setPhase('loading');
    const minDelay = new Promise((r) => setTimeout(r, 1500));
    try {
      const [{ data, source: src }] = await Promise.all([fetchTuVi(form), minDelay]);
      setResult(data);
      setSource(src);
      setPhase('result');
      if (src === 'mock') showToast && showToast('API timeout — đang dùng mock');
    } catch (e) {
      await minDelay;
      setPhase('form');
      showToast && showToast('Không tính được lá số. Thử lại.');
    }
  };

  const onReset = () => { setPhase('form'); setResult(null); setSelectedCung(null); };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0A0E1A', display: 'flex', flexDirection: 'column' }} className="anim-fade">
      {phase === 'form' && (
        <TuViForm form={form} errors={errors} setField={setField} onSubmit={onSubmit} brand={brand} nowYear={nowYear}/>
      )}
      {phase === 'loading' && <TuViLoading/>}
      {phase === 'result' && result && (
        <TuViResult
          data={result} source={source} brand={brand} form={form}
          onReset={onReset} onCungSelect={setSelectedCung}
          onOpenPersonal={() => setPersonalOpen(true)}
        />
      )}

      <Sheet open={!!selectedCung} onClose={() => setSelectedCung(null)} title={selectedCung ? `Cung ${selectedCung.Name}` : ''} bottomOffset={88}>
        {selectedCung && <CungDetail cung={selectedCung}/>}
      </Sheet>

      <Sheet open={personalOpen} onClose={() => setPersonalOpen(false)} title="Thông tin cá nhân" bottomOffset={88}>
        {result && <PersonalInfoSheet info={result.Info} form={form}/>}
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
      <div className="screen-hero" style={{
        background: 'linear-gradient(165deg, #1E1B4B 0%, #312E81 45%, #4C1D95 100%)',
        padding: '60px 18px 26px', color: '#fff', borderRadius: '0 0 28px 28px',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <StarField count={32}/>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Lập lá số tử vi</div>
            <Badge color="amber">⭐ TỬ VI ĐẨU SỐ</Badge>
          </div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6, lineHeight: 1.5 }}>
            12 cung mệnh · sao chính tinh · sao tốt xấu — luận giải bởi chuyên gia phong thủy
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '16px 18px 30px' }} className="scroll-area">
        <FieldLabel>Họ và tên</FieldLabel>
        <TInput value={form.hoten} onChange={(v) => setField('hoten', v)} placeholder="VD: Nguyễn Văn A" error={errors.hoten}/>

        <FieldLabel mt={14}>Giới tính</FieldLabel>
        <div style={{ display: 'flex', gap: 0, background: '#13182A', borderRadius: 12, padding: 4 }}>
          {[
            { k: 'male', l: 'Nam', i: '♂' },
            { k: 'female', l: 'Nữ', i: '♀' },
          ].map((g) => {
            const active = form.gender === g.k;
            return (
              <button key={g.k} onClick={() => setField('gender', g.k)} className="tap" style={{
                flex: 1, height: 42, borderRadius: 9, border: 'none',
                background: active ? `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})` : 'transparent',
                color: active ? '#fff' : '#94A3B8', fontSize: 14, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <span style={{ fontSize: 16 }}>{g.i}</span> {g.l}
              </button>
            );
          })}
        </div>

        <FieldLabel mt={14}>Ngày sinh (dương lịch)</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.4fr', gap: 8 }}>
          <TSelect value={form.dobDay} onChange={(v) => setField('dobDay', v)} options={days} placeholder="Ngày" error={errors.dobDay}/>
          <TSelect value={form.dobMonth} onChange={(v) => setField('dobMonth', v)} options={months} placeholder="Tháng" error={errors.dobMonth}/>
          <TSelect value={form.dobYear} onChange={(v) => setField('dobYear', v)} options={years} placeholder="Năm" error={errors.dobYear}/>
        </div>

        <FieldLabel mt={14}>Giờ sinh</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <TSelect value={form.hour} onChange={(v) => setField('hour', v)} options={hours} placeholder="Giờ"/>
          <TSelect value={form.minute} onChange={(v) => setField('minute', v)} options={minutes} placeholder="Phút"/>
        </div>

        <FieldLabel mt={14}>Năm xem hạn</FieldLabel>
        <TSelect value={form.namXem} onChange={(v) => setField('namXem', v)} options={namXemRange} placeholder="Năm xem"/>

        <button onClick={onSubmit} className="tap" style={{
          marginTop: 22, width: '100%', height: 54, borderRadius: 16,
          background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`,
          color: '#fff', border: 'none', fontSize: 15, fontWeight: 800, letterSpacing: 1,
          boxShadow: `0 10px 24px ${b.solid}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Ic.Sparkles s={18} c="#fff"/> AN SAO
        </button>

        <div style={{ marginTop: 14, padding: 12, background: 'rgba(245,158,11,0.08)', borderRadius: 12, border: '1px solid rgba(245,158,11,0.25)' }}>
          <div style={{ fontSize: 11, color: '#FCD34D', fontWeight: 700 }}>💡 Mẹo</div>
          <div style={{ fontSize: 12, color: '#CBD5E1', marginTop: 4, lineHeight: 1.5 }}>
            Giờ sinh càng chính xác, lá số càng đúng. Nếu chưa nhớ giờ, chọn áng chừng và nhờ chuyên gia hiệu chỉnh sau.
          </div>
        </div>
      </div>
    </>
  );
}

function FieldLabel({ children, mt }) {
  return <div style={{ fontSize: 12, fontWeight: 700, color: '#CBD5E1', marginTop: mt || 0, marginBottom: 6, letterSpacing: 0.2 }}>{children}</div>;
}

function TInput({ value, onChange, placeholder, error }) {
  return (
    <div>
      <input
        value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: '100%', height: 46, padding: '0 14px', borderRadius: 12,
          background: '#13182A', border: `1.5px solid ${error ? '#EF4444' : '#252B3D'}`,
          color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
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
        value={value} onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', height: 46, padding: '0 32px 0 12px', borderRadius: 12,
          background: '#13182A', border: `1.5px solid ${error ? '#EF4444' : '#252B3D'}`,
          color: value ? '#fff' : '#64748B', fontSize: 14, outline: 'none',
          appearance: 'none', WebkitAppearance: 'none', boxSizing: 'border-box', fontWeight: 600,
        }}
      >
        {!value && <option value="">{placeholder}</option>}
        {options.map((o) => <option key={o} value={o} style={{ background: '#13182A' }}>{o}</option>)}
      </select>
      <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748B' }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/></svg>
      </div>
    </div>
  );
}

function StarField({ count = 28 }) {
  const stars = React.useMemo(() => (
    Array.from({ length: count }, () => ({
      l: Math.random() * 100, t: Math.random() * 100,
      o: 0.2 + Math.random() * 0.7, s: 1 + Math.random() * 1.6,
    }))
  ), [count]);
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

function TuViLoading() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, background: 'linear-gradient(165deg, #0A0E1A 0%, #1E1B4B 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }} className="anim-fade">
      <StarField count={40}/>
      <div style={{ position: 'relative', width: 110, height: 110 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px dashed rgba(168,85,247,0.4)', animation: 'tuvi-rotate 8s linear infinite' }}/>
        <div style={{ position: 'absolute', inset: 14, borderRadius: '50%', border: '2px solid rgba(168,85,247,0.7)', animation: 'tuvi-rotate-rev 5s linear infinite' }}/>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, animation: 'tuvi-pulse 2.6s ease-in-out infinite' }}>☯</div>
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

function TuViResult({ data, source, brand, form, onReset, onCungSelect, onOpenPersonal }) {
  const b = getBrand(brand);
  const info = data.Info || {};
  const cungList = data.Cac_cung || [];
  const cungByChi = {};
  cungList.forEach((c) => { if (typeof c.ChiCung === 'number') cungByChi[c.ChiCung] = c; });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0A0E1A', overflow: 'hidden' }}>
      {/* Compact header */}
      <div className="screen-hero" style={{
        background: 'linear-gradient(165deg, #1E1B4B 0%, #312E81 100%)',
        padding: '54px 16px 14px', color: '#fff',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <StarField count={22}/>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Badge color="amber">LÁ SỐ {source === 'mock' ? '· DEMO' : ''}</Badge>
              {info.AmDuong && <Badge color="purple">{info.AmDuong}</Badge>}
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, marginTop: 6, letterSpacing: -0.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {form.hoten || 'Quý khách'}
            </div>
            <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>
              {form.dobDay}/{form.dobMonth}/{form.dobYear} · {form.hour}:{form.minute}
            </div>
          </div>
          <button onClick={onReset} className="tap" style={{
            padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.18)',
            border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0,
          }}>
            <Ic.Refresh s={14} c="#fff"/> Lập lại
          </button>
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, overflow: 'auto', padding: '10px 8px 24px', position: 'relative' }} className="scroll-area">
        <StarField count={14}/>
        <TuViChart cungByChi={cungByChi} info={info} form={form} brand={brand} onCungSelect={onCungSelect} onOpenPersonal={onOpenPersonal}/>

        <div style={{ marginTop: 12, padding: '0 6px', textAlign: 'center', fontSize: 11, color: '#64748B' }}>
          Chạm vào cung để xem chi tiết sao
        </div>

        <button onClick={onReset} className="tap" style={{
          margin: '14px 6px 0', width: 'calc(100% - 12px)', height: 46, borderRadius: 14,
          background: 'transparent', border: `1.5px solid ${b.solid}`,
          color: '#fff', fontSize: 14, fontWeight: 700,
        }}>
          Lập lá số khác
        </button>
      </div>
    </div>
  );
}

function TuViChart({ cungByChi, info, form, brand, onCungSelect, onOpenPersonal }) {
  // Chart is a 4×4 grid. Outer 12 cells = cung. Inner 2×2 = personal info.
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(4, 1fr)',
      gap: 4,
      aspectRatio: '1',
      width: '100%',
      padding: 0,
    }}>
      {Object.entries(CHI_TO_GRID).map(([chiIdx, [row, col]]) => {
        const cung = cungByChi[chiIdx];
        return (
          <div key={chiIdx} style={{ gridRow: row, gridColumn: col, minHeight: 0, minWidth: 0 }}>
            {cung ? (
              <ChartCell cung={cung} chiIdx={Number(chiIdx)} onClick={() => onCungSelect(cung)}/>
            ) : (
              <EmptyCell chiIdx={Number(chiIdx)}/>
            )}
          </div>
        );
      })}
      <div style={{ gridArea: '2 / 2 / 4 / 4', minWidth: 0, minHeight: 0 }}>
        <CenterInfo info={info} form={form} brand={brand} onOpen={onOpenPersonal}/>
      </div>
    </div>
  );
}

function ChartCell({ cung, chiIdx, onClick }) {
  const isMenh = cung.Name === 'Mệnh';
  const emoji = ZODIAC_EMOJI[chiIdx] || '';
  return (
    <button onClick={onClick} className="tap" style={{
      position: 'relative',
      width: '100%', height: '100%',
      background: isMenh
        ? 'linear-gradient(160deg, #2A1F47 0%, #1A1530 100%)'
        : 'linear-gradient(160deg, #13182A 0%, #0B0F1E 100%)',
      border: `1px solid ${isMenh ? '#F59E0B' : '#252B3D'}`,
      borderRadius: 8, padding: 6,
      color: '#fff', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', overflow: 'hidden',
      boxShadow: isMenh ? '0 0 10px rgba(245,158,11,0.3)' : 'none',
    }}>
      {/* Zodiac emoji watermark — 80% of cell, ~10% opacity */}
      <span style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 56, opacity: 0.1, pointerEvents: 'none', filter: 'grayscale(0.3)',
        lineHeight: 1,
      }} aria-hidden>{emoji}</span>

      <span style={{
        position: 'relative',
        fontSize: 13, fontWeight: 700, lineHeight: 1.2,
        color: isMenh ? '#FCD34D' : '#E2E8F0',
        letterSpacing: -0.2,
        textShadow: '0 1px 2px rgba(0,0,0,0.6)',
      }}>
        {cung.Name}
      </span>
    </button>
  );
}

function EmptyCell({ chiIdx }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0B0F1E', border: '1px dashed #1F2A3F', borderRadius: 7,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#334155', fontSize: 9, fontWeight: 600,
    }}>{CHI_NAMES[chiIdx]}</div>
  );
}

function CenterInfo({ info, form, brand, onOpen }) {
  const fullDob = `${form.dobDay}/${form.dobMonth}/${form.dobYear}`;
  const slbt = sinhLaoBenhTu(form.hoten);

  return (
    <button onClick={onOpen} className="tap" style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(160deg, #2A1F47 0%, #1A1530 60%, #0F1320 100%)',
      border: '1px solid #4C3A8A', borderRadius: 7, padding: '8px 8px 6px',
      color: '#fff', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', cursor: 'pointer',
    }}>
      <div style={{ position: 'absolute', top: -24, right: -24, width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.45), transparent 70%)' }}/>
      <div style={{ position: 'absolute', bottom: -30, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.18), transparent 70%)' }}/>

      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#FCD34D', letterSpacing: 0.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {form.hoten || 'Quý khách'}{slbt && <span style={{ fontSize: 8.5, opacity: 0.8, marginLeft: 4 }}>({slbt})</span>}
        </div>
        <div style={{ fontSize: 9, color: '#CBD5E1', marginTop: 2, fontWeight: 600 }}>
          {info.AmDuong || (form.gender === 'male' ? '♂ Nam' : '♀ Nữ')} · {fullDob}
        </div>
      </div>

      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, padding: '6px 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', marginTop: 6 }}>
        {[
          { l: 'Bản mệnh', v: info.MenhCuc },
          { l: 'Cục', v: info.Cuc },
          { l: 'Năm xem', v: info.NamHan ? `${info.NamHan} · ${info.Tuoi}t` : null },
        ].filter((r) => r.v).map((r) => (
          <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
            <span style={{ fontSize: 8, color: '#94A3B8', fontWeight: 600 }}>{r.l}</span>
            <span style={{ fontSize: 9, color: '#fff', fontWeight: 700, textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }}>{r.v}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', textAlign: 'center', marginTop: 4 }}>
        <span style={{ fontSize: 8.5, color: '#A78BFA', fontWeight: 700, letterSpacing: 0.3 }}>
          Xem đầy đủ →
        </span>
      </div>
    </button>
  );
}

/* ---------------------------------- Detail Sheet ---------------------------------- */

function CungDetail({ cung }) {
  const groups = [
    { title: 'Chính tinh', items: cung.ChinhTinh || [], bg: '#FEF3C7', fg: '#92400E', dot: '#F59E0B' },
    { title: 'Sao tốt', items: cung.Saotot || [], bg: '#DCFCE7', fg: '#166534', dot: '#22C55E' },
    { title: 'Sao xấu', items: cung.Saoxau || [], bg: '#FEE2E2', fg: '#991B1B', dot: '#EF4444' },
  ];

  const meta = [
    cung.TrangSinh && { l: 'Tràng sinh', v: cung.TrangSinh, color: 'purple' },
    cung.LuuDaiHanTen && { l: 'Lưu đại hạn', v: cung.LuuDaiHanTen, color: 'blue' },
    cung.LuuTieuHanTen && { l: 'Lưu tiểu hạn', v: cung.LuuTieuHanTen, color: 'amber' },
    cung.Than === 1 && { l: 'Thân cư', v: cung.Name, color: 'red' },
    cung.Tuan === 1 && { l: 'Tuần', v: '✓', color: 'slate' },
    cung.Triet === 1 && { l: 'Triệt', v: '✓', color: 'slate' },
  ].filter(Boolean);

  return (
    <div style={{ padding: '0 20px 20px' }}>
      <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>
        Vị trí: <strong style={{ color: '#0F172A' }}>{canChi(cung.CanCung, cung.ChiCung)}</strong>
      </div>

      {meta.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          {meta.map((m, i) => (
            <Badge key={i} color={m.color}>{m.l}: {m.v}</Badge>
          ))}
        </div>
      )}

      {groups.map((g) => (
        <div key={g.title} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: g.dot }}/>
            {g.title}
            <span style={{ opacity: 0.6, fontWeight: 600 }}>({g.items.length})</span>
          </div>
          {g.items.length === 0 ? (
            <div style={{ fontSize: 12, color: '#94A3B8', fontStyle: 'italic' }}>Không có</div>
          ) : (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {g.items.map((s, i) => {
                const st = STATUS_COLORS[s.Status];
                return (
                  <div key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '5px 10px', borderRadius: 10,
                    background: g.bg, color: g.fg,
                    fontSize: 12, fontWeight: 700,
                  }}>
                    {s.Name}
                    {s.Status && st && (
                      <span style={{
                        fontSize: 9, padding: '1px 5px', borderRadius: 4,
                        background: st.c, color: '#0F172A', fontWeight: 800,
                      }} title={st.l}>{s.Status}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PersonalInfoSheet({ info, form }) {
  const slbt = sinhLaoBenhTu(form.hoten);
  const cungMenh = getCungMenhInfo(form.dobYear, form.gender);
  const phiCung = calculateCungPhi(form.dobYear, form.gender);
  const fullDob = `${form.dobDay}/${form.dobMonth}/${form.dobYear}`;
  const time = `${form.hour}:${form.minute}`;

  const rows = [
    {
      label: 'Họ và tên',
      value: form.hoten || '—',
      sub: slbt ? `Sanh - Lão - Bệnh - Tử: ${slbt}` : null,
    },
    { label: 'Năm sinh', value: form.dobYear, sub: info.Nam ? `(${info.Nam})` : null },
    {
      label: 'Tháng sinh',
      value: form.dobMonth,
      sub: info.Thang != null ? `(${info.Thang}${info.ThangCC ? ` - ${info.ThangCC}` : ''})` : null,
    },
    {
      label: 'Ngày sinh',
      value: form.dobDay,
      sub: info.Ngay != null ? `(${info.Ngay}${info.NgayCC ? ` - ${info.NgayCC}` : ''})` : null,
    },
    {
      label: 'Giờ sinh',
      value: time,
      sub: info.Gio ? `(${info.Gio}${info.GioCC ? ` - ${info.GioCC}` : ''})` : null,
    },
    cungMenh && {
      label: 'Hướng tốt',
      value: cungMenh.saoTot,
      multi: true,
      color: '#15803D',
    },
    { label: 'Âm dương', value: info.AmDuong || (form.gender === 'male' ? 'Dương Nam' : 'Âm Nữ') },
    {
      label: 'Bản mệnh',
      value: info.MenhCuc ? `${info.MenhCuc}${info.Cuc ? ` — ${info.Cuc}` : ''}` : '—',
      sub: info.NguyenThan ? `Nguyên thần: ${info.NguyenThan}` : null,
    },
    info.NamHan && {
      label: 'Năm xem',
      value: `${info.NamHan}${info.Tuoi ? ` - ${info.Tuoi} tuổi` : ''}`,
    },
    phiCung && { label: 'Phi Cung', value: phiCung },
    cungMenh && {
      label: 'Hướng xấu',
      value: cungMenh.saoXau,
      multi: true,
      color: '#B91C1C',
    },
  ].filter(Boolean);

  return (
    <div style={{ padding: '0 20px 24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4 }}>
              {r.label}
            </div>
            {r.multi ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {String(r.value).split(' · ').map((seg, j) => (
                  <span key={j} style={{
                    display: 'inline-block', padding: '4px 10px', borderRadius: 999,
                    background: `${r.color}1A`, color: r.color, fontSize: 12, fontWeight: 700,
                  }}>{seg}</span>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', lineHeight: 1.4 }}>
                {r.value}
              </div>
            )}
            {r.sub && (
              <div style={{ fontSize: 12, color: '#475569', fontWeight: 500, lineHeight: 1.4, marginTop: 1 }}>
                {r.sub}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { TuViScreen });
