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

function canChi(canIdx, chiIdx) {
  const can = CAN_NAMES[canIdx] || '';
  const chi = CHI_NAMES[chiIdx] || '';
  return `${can} ${chi}`.trim();
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
    try {
      const { data, source: src } = await fetchTuVi(form);
      setResult(data);
      setSource(src);
      setPhase('result');
      if (src === 'mock') showToast && showToast('API timeout — đang dùng mock');
    } catch (e) {
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
        <TuViResult data={result} source={source} brand={brand} form={form} onReset={onReset} onCungSelect={setSelectedCung}/>
      )}

      <Sheet open={!!selectedCung} onClose={() => setSelectedCung(null)} title={selectedCung ? `Cung ${selectedCung.Name}` : ''}>
        {selectedCung && <CungDetail cung={selectedCung}/>}
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
          <Badge color="amber">⭐ TỬ VI ĐẨU SỐ</Badge>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 10, letterSpacing: -0.5 }}>Lập lá số tử vi</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4, lineHeight: 1.5 }}>
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

function TuViResult({ data, source, brand, form, onReset, onCungSelect }) {
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
        <TuViChart cungByChi={cungByChi} info={info} form={form} brand={brand} onCungSelect={onCungSelect}/>

        <div style={{ marginTop: 12, padding: '0 6px' }}>
          <Legend/>
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

function TuViChart({ cungByChi, info, form, brand, onCungSelect }) {
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
        <CenterInfo info={info} form={form} brand={brand}/>
      </div>
    </div>
  );
}

function ChartCell({ cung, chiIdx, onClick }) {
  const chinh = Array.isArray(cung.ChinhTinh) ? cung.ChinhTinh : [];
  const tot = Array.isArray(cung.Saotot) ? cung.Saotot : [];
  const xau = Array.isArray(cung.Saoxau) ? cung.Saoxau : [];

  const isMenh = cung.Name === 'Mệnh';
  const isThan = cung.Than === 1;
  const hasTuan = cung.Tuan === 1 || cung.LuuTuan === 1;
  const hasTriet = cung.Triet === 1 || cung.LuuTriet === 1;
  const canChiStr = canChi(cung.CanCung, cung.ChiCung);

  return (
    <button onClick={onClick} className="tap" style={{
      width: '100%', height: '100%',
      background: isMenh
        ? 'linear-gradient(160deg, #2A1F47 0%, #1A1530 100%)'
        : 'linear-gradient(160deg, #13182A 0%, #0B0F1E 100%)',
      border: `1px solid ${isMenh ? '#F59E0B' : '#252B3D'}`,
      borderRadius: 7, padding: '4px 4px 3px',
      color: '#fff', cursor: 'pointer', position: 'relative',
      display: 'flex', flexDirection: 'column', textAlign: 'left',
      overflow: 'hidden', boxShadow: isMenh ? '0 0 8px rgba(245,158,11,0.25)' : 'none',
    }}>
      {/* Top: cung name + can-chi */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2 }}>
        <span style={{ fontSize: 8.5, fontWeight: 800, color: isMenh ? '#FCD34D' : '#C4B5FD', textTransform: 'uppercase', letterSpacing: 0.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {cung.Name}
        </span>
        <span style={{ fontSize: 7.5, color: '#64748B', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>{canChiStr}</span>
      </div>

      {/* Tuần/Triệt/Thân markers — tiny top right */}
      {(isThan || hasTuan || hasTriet) && (
        <div style={{ position: 'absolute', top: 2, right: 2, display: 'flex', gap: 2 }}>
          {isThan && <Mark color="#F59E0B">T</Mark>}
          {hasTuan && <Mark color="#FB923C">Tu</Mark>}
          {hasTriet && <Mark color="#EF4444">Tr</Mark>}
        </div>
      )}

      {/* Stars */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden', marginTop: 3 }}>
        {chinh.slice(0, 3).map((s, i) => {
          const st = STATUS_COLORS[s.Status] || { c: '#FCD34D' };
          return (
            <div key={'c'+i} style={{ fontSize: 9.5, fontWeight: 700, color: st.c, lineHeight: 1.18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {s.Name}{s.Status ? <span style={{ fontSize: 7, opacity: 0.85, marginLeft: 2 }}>({s.Status})</span> : ''}
            </div>
          );
        })}
        {chinh.length === 0 && (
          <div style={{ fontSize: 8.5, color: '#475569', fontStyle: 'italic' }}>vô chính diện</div>
        )}

        {tot.slice(0, 3).map((s, i) => (
          <div key={'t'+i} style={{ fontSize: 8.5, color: '#86EFAC', lineHeight: 1.18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {s.Name}
          </div>
        ))}
        {xau.slice(0, 2).map((s, i) => (
          <div key={'x'+i} style={{ fontSize: 8.5, color: '#FCA5A5', lineHeight: 1.18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {s.Name}
          </div>
        ))}
      </div>

      {/* Bottom: lưu đại hạn / tiểu hạn */}
      {(cung.LuuDaiHanTen || cung.LuuTieuHanTen) && (
        <div style={{ marginTop: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {cung.LuuDaiHanTen && (
            <span style={{ fontSize: 7, padding: '1px 4px', borderRadius: 3, background: 'rgba(167,139,250,0.18)', color: '#A78BFA', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
              {cung.LuuDaiHanTen}
            </span>
          )}
        </div>
      )}
    </button>
  );
}

function Mark({ color, children }) {
  return (
    <span style={{
      fontSize: 7, fontWeight: 800, padding: '1px 3px', borderRadius: 3,
      background: color, color: '#000', letterSpacing: 0.2,
    }}>{children}</span>
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

function CenterInfo({ info, form, brand }) {
  const b = getBrand(brand);
  const fullDob = `${form.dobDay}/${form.dobMonth}/${form.dobYear}`;
  const time = `${form.hour}:${form.minute}`;

  const rows = [
    { l: 'Bản mệnh', v: info.MenhCuc },
    { l: 'Cục', v: info.Cuc },
    { l: 'Năm sinh', v: info.Nam },
    { l: 'Tháng/Ngày', v: info.ThangCC && info.NgayCC ? `${info.ThangCC} / ${info.NgayCC}` : null },
    { l: 'Giờ sinh', v: info.GioCC || `${time}` },
    { l: 'Năm xem', v: info.NamHan ? `${info.NamHan} · ${info.Tuoi} t` : null },
    { l: 'Chủ mệnh', v: info.ChuMenh },
    { l: 'Chủ thân', v: info.ChuThan },
  ].filter((r) => r.v);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(160deg, #2A1F47 0%, #1A1530 60%, #0F1320 100%)',
      border: '1px solid #4C3A8A',
      borderRadius: 7, padding: '6px 6px 4px',
      color: '#fff', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'stretch',
    }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%)' }}/>

      <div style={{ position: 'relative', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#FCD34D', letterSpacing: 0.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {form.hoten || 'Quý khách'}
        </div>
        <div style={{ fontSize: 8.5, color: '#CBD5E1', marginTop: 1, fontWeight: 600 }}>
          {form.gender === 'male' ? '♂ Nam' : '♀ Nữ'} · {fullDob}
        </div>
      </div>

      <div style={{ position: 'relative', flex: 1, overflow: 'auto', padding: '4px 0 0' }} className="scroll-area">
        {rows.map((r) => (
          <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', gap: 4, padding: '2px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ fontSize: 7.5, color: '#64748B', fontWeight: 600, whiteSpace: 'nowrap' }}>{r.l}</span>
            <span style={{ fontSize: 8.5, color: '#fff', fontWeight: 700, textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend() {
  const items = [
    { c: '#FCD34D', l: 'Chính tinh' },
    { c: '#86EFAC', l: 'Sao tốt' },
    { c: '#FCA5A5', l: 'Sao xấu' },
    { c: '#A78BFA', l: 'Lưu hạn' },
  ];
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
      {items.map((x) => (
        <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#94A3B8' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: x.c, boxShadow: `0 0 6px ${x.c}66` }}/>
          {x.l}
        </div>
      ))}
    </div>
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
    <div style={{ padding: '0 20px 20px', maxHeight: 480, overflow: 'auto' }} className="scroll-area">
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

Object.assign(window, { TuViScreen });
