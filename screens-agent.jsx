// screens-agent.jsx — Agent application 5-step wizard, dashboard, team, wallet, referral

const AGENT_PACKAGES = [
  { id: 'bronze', name: 'Đại lý Đồng', price: 990000, period: '12 tháng', commission: { f1: 15, f2: 5, f3: 2 }, color: '#B45309', gradFrom: '#F59E0B', gradTo: '#B45309', perks: ['Link giới thiệu riêng', 'Hoa hồng F1 15%', 'Báo cáo cơ bản', 'Hỗ trợ Zalo nhóm'] },
  { id: 'silver', name: 'Đại lý Bạc', price: 1990000, period: '12 tháng', commission: { f1: 20, f2: 8, f3: 3 }, color: '#475569', gradFrom: '#94A3B8', gradTo: '#475569', perks: ['Tất cả gói Đồng', 'Hoa hồng F1 20% · F2 8%', 'Báo cáo chi tiết', 'Khóa học cơ bản miễn phí', 'Quản lý team đến cấp F3'], featured: true },
  { id: 'gold', name: 'Đại lý Vàng', price: 4990000, period: '12 tháng', commission: { f1: 25, f2: 10, f3: 5 }, color: '#B45309', gradFrom: '#FBBF24', gradTo: '#D97706', perks: ['Tất cả gói Bạc', 'Hoa hồng F1 25% · F2 10% · F3 5%', 'Mentor 1-1 hàng tháng', 'Tất cả khóa học miễn phí', 'Co-branding marketing'] },
];

// Mock orders eligible for commission withdrawal
const MOCK_COMMISSION_ORDERS = [
  { id: 'SP12345678', buyer: 'Lê Minh Duy', seller: 'Tôi', level: 'F0', type: 'sim', name: 'SIM Lộc Phát · 0868.86.86.86', total: 5990000, rate: '10%', commission: 599000, date: '12/05/2026', status: 'completed' },
  { id: 'SP12345675', buyer: 'Trần Thị Thu', seller: 'Nguyễn Mai', level: 'F1', type: 'sim', name: 'SIM Thần Tài · 0909.39.39.39', total: 8990000, rate: '8%', commission: 719200, date: '10/05/2026', status: 'completed' },
  { id: 'SP12345673', buyer: 'Hoàng Văn Nam', seller: 'Lê Văn Bình', level: 'F1', type: 'course', name: 'Khóa học Thấu hiểu Bản thân', total: 1500000, rate: '8%', commission: 120000, date: '08/05/2026', status: 'completed' },
  { id: 'SP12345672', buyer: 'Ngô Mỹ Linh', seller: 'Phạm Tuấn', level: 'F2', type: 'accessory', name: 'Vòng trầm hương phong thủy', total: 2490000, rate: '3%', commission: 74700, date: '05/05/2026', status: 'completed' },
  { id: 'SP12345671', buyer: 'Phạm Anh Tuấn', seller: 'Tôi', level: 'F0', type: 'sim', name: 'SIM Ngũ Quý · 0333.33.33.33', total: 25000000, rate: '10%', commission: 2500000, date: '01/05/2026', status: 'completed' },
];

// Mock withdrawal requests history
const MOCK_WITHDRAWAL_HISTORY = [
  { id: 'WRQ0892', amount: 5000000, date: '08/05/2026 14:22', status: 'approved', bank: 'Vietcombank', note: 'Đã thanh toán qua App VCB', ordersCount: 8,
    orders: [
      { id: 'SP12345601', buyer: 'Nguyễn An', total: 5990000, commission: 599000, date: '01/05/2026' },
      { id: 'SP12345602', buyer: 'Trần Bình', total: 8990000, commission: 719200, date: '02/05/2026' },
      { id: 'SP12345603', buyer: 'Lê Chi', total: 1500000, commission: 120000, date: '03/05/2026' },
      { id: 'SP12345604', buyer: 'Phạm Du', total: 2490000, commission: 199200, date: '04/05/2026' },
      { id: 'SP12345605', buyer: 'Hoàng Em', total: 25000000, commission: 2500000, date: '05/05/2026' },
    ]
  },
  { id: 'WRQ0841', amount: 3000000, date: '02/05/2026 16:40', status: 'pending', bank: 'Vietcombank', note: 'Đang đối soát đơn hàng', ordersCount: 5,
    orders: [
      { id: 'SP12345610', buyer: 'Đặng Hà', total: 12000000, commission: 1200000, date: '28/04/2026' },
      { id: 'SP12345611', buyer: 'Bùi Kim', total: 5000000, commission: 500000, date: '29/04/2026' },
    ]
  },
  { id: 'WRQ0712', amount: 1200000, date: '15/04/2026 10:15', status: 'rejected', bank: 'Vietcombank', note: 'Đơn hàng SP12345600 bị hoàn trả từ khách hàng', ordersCount: 3,
    orders: [
      { id: 'SP12345600', buyer: 'Vũ Lan', total: 10000000, commission: 1000000, date: '10/04/2026' },
    ]
  },
];


// Admin-config for withdrawals — shown to user on wallet
const WITHDRAW_CONFIG = {
  minAmount: 200000,
  allowedDays: [1, 15, new Date().getDate()], // Luôn bao gồm ngày hôm nay cho demo
  cutoffHour: 23, // Để test được vào buổi tối
  feeType: 'none',
  feeValue: 0,
  processingDays: 2,
};

// Mock user's package purchase history
const MOCK_PACKAGE_HISTORY = [
  { id: 'p1', pkg: 'Đại lý Bạc', price: 1990000, type: 'Mua mới', boughtAt: '15/01/2026', from: '15/01/2026', until: '15/01/2027', status: 'Đang hiệu lực' },
  { id: 'p2', pkg: 'Đại lý Đồng', price: 990000, type: 'Mua mới', boughtAt: '20/12/2024', from: '20/12/2024', until: '20/12/2025', status: 'Hết hạn' },
];

// === 5-STEP AGENT APPLICATION WIZARD ===
function AgentPackagesScreen({ nav, brand, user, setUser, showToast }) {
  const b = getBrand(brand);
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    packageId: user.isAgent ? null : 'silver',
    fullName: user.name || 'Nguyễn Quốc Anh',
    cccd: '012345678901',
    birthDate: '01/01/1990',
    gender: 'male',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    phone: user.phone || '0901234567',
    email: user.email || 'anh.nguyen@gmail.com',
    bankName: 'Vietcombank',
    bankAccount: '9988776655',
    bankHolder: (user.name || 'Nguyễn Quốc Anh').toUpperCase(),
    contractAgreed: true,
    signature: user.name || 'Nguyễn Quốc Anh',
    paid: false,
  });

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const pkg = AGENT_PACKAGES.find(p => p.id === data.packageId);

  const stepLabels = ['Chọn gói', 'Thông tin', 'Hợp đồng', 'Thanh toán', 'Chờ duyệt'];

  const canNext = () => {
    if (step === 0) return !!data.packageId;
    if (step === 1) return data.fullName && data.cccd && data.address && data.bankAccount;
    if (step === 2) return data.contractAgreed && data.signature;
    if (step === 3) return data.paid;
    return true;
  };

  const next = () => {
    if (!canNext()) { showToast && showToast('Vui lòng hoàn tất bước này'); return; }
    if (step < 4) setStep(step + 1);
    else {
      setUser({ ...user, isAgent: true, agentTier: pkg.name.split(' ')[1] });
      nav.replace('agent-dashboard');
    }
  };
  const prev = () => { if (step > 0) setStep(step - 1); else nav.pop(); };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 100 }} className="anim-slide-in">
      <ScreenHeader title="Đăng ký đại lý" subtitle={`Bước ${step + 1}/5 · ${stepLabels[step]}`} onBack={prev} />

      {/* progress bar */}
      <div style={{ padding: '0 18px 12px', background: '#fff', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
          {stepLabels.map((l, i) => (
            <React.Fragment key={l}>
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? b.solid : '#E2E8F0', transition: 'background .25s' }} />
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {stepLabels.map((l, i) => (
            <div key={l} style={{ fontSize: 9, fontWeight: i === step ? 800 : 600, color: i <= step ? b.solid : '#94A3B8', flex: 1, textAlign: 'center' }}>{l}</div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        {step === 0 && <Step1Package data={data} set={set} brand={brand} />}
        {step === 1 && <Step2BasicInfo data={data} set={set} brand={brand} />}
        {step === 2 && <Step3Contract data={data} set={set} pkg={pkg} brand={brand} />}
        {step === 3 && <Step4Payment data={data} set={set} pkg={pkg} brand={brand} showToast={showToast} />}
        {step === 4 && <Step5Pending pkg={pkg} data={data} brand={brand} />}
      </div>

      <ActionBar>
        <PrimaryButton fullWidth onClick={next} disabled={!canNext()} brand={brand}>
          {step < 3 ? 'Tiếp tục' : step === 3 ? 'Hoàn tất gửi yêu cầu' : 'Vào dashboard'}
        </PrimaryButton>
      </ActionBar>
    </div>
  );
}

function Step1Package({ data, set, brand }) {
  const b = getBrand(brand);
  return (
    <>
      <Card style={{ padding: 14, background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Ic.Crown s={20} c="#fff" />
          <div style={{ fontSize: 14, fontWeight: 800 }}>Chọn gói phù hợp</div>
        </div>
        <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>Mỗi gói có quyền lợi và mức hoa hồng F1·F2·F3 khác nhau</div>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
        {AGENT_PACKAGES.map((p) => (
          <Card key={p.id} onClick={() => set('packageId', p.id)} style={{ overflow: 'hidden', border: data.packageId === p.id ? `2.5px solid ${b.solid}` : '2.5px solid transparent', cursor: 'pointer' }}>
            <div style={{ padding: 14, background: `linear-gradient(120deg, ${p.gradFrom}, ${p.gradTo})`, color: '#fff', position: 'relative' }}>
              {p.featured && <Badge color="amber" style={{ position: 'absolute', top: 12, right: 12 }}>⭐ Phổ biến</Badge>}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Ic.Crown s={20} c="#fff" />
                <div style={{ fontSize: 16, fontWeight: 800 }}>{p.name}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.6 }}>{vnd(p.price)}</span>
                <span style={{ fontSize: 11, opacity: 0.85 }}>/ {p.period}</span>
              </div>
            </div>
            <div style={{ padding: 12 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                {Object.entries(p.commission).map(([k, v]) => (
                  <div key={k} style={{ flex: 1, padding: '5px 6px', borderRadius: 7, background: b.soft, textAlign: 'center' }}>
                    <div style={{ fontSize: 9, color: b.text, fontWeight: 700 }}>{k.toUpperCase()}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: b.solid }}>{v}%</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {p.perks.slice(0, 3).map((perk) => (
                  <div key={perk} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: 11, color: '#334155' }}>
                    <Ic.Check s={12} c={b.solid} w={2.4} /> {perk}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function Step2BasicInfo({ data, set, brand }) {
  const b = getBrand(brand);
  return (
    <>
      <Card style={{ padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>Thông tin cá nhân</div>
        <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Thông tin trên CCCD/CMND</div>
      </Card>

      <WField label="Họ và tên" required>
        <WInput value={data.fullName} onChange={(v) => set('fullName', v)} placeholder="Nguyễn Văn A" />
      </WField>
      <WField label="Số CCCD/CMND" required>
        <WInput value={data.cccd} onChange={(v) => set('cccd', v)} placeholder="012345678901" type="number" />
      </WField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <WField label="Ngày sinh">
          <WInput value={data.birthDate} onChange={(v) => set('birthDate', v)} placeholder="dd/mm/yyyy" />
        </WField>
        <WField label="Giới tính">
          <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 10, padding: 3 }}>
            {[{ k: 'male', l: '♂ Nam' }, { k: 'female', l: '♀ Nữ' }].map(g => {
              const a = data.gender === g.k;
              return <button key={g.k} onClick={() => set('gender', g.k)} className="tap" style={{ flex: 1, height: 36, borderRadius: 8, border: 'none', background: a ? '#fff' : 'transparent', color: a ? b.solid : '#64748B', fontSize: 12, fontWeight: 700 }}>{g.l}</button>;
            })}
          </div>
        </WField>
      </div>
      <WField label="Địa chỉ thường trú" required>
        <WInput value={data.address} onChange={(v) => set('address', v)} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" />
      </WField>
      <WField label="Số điện thoại" required>
        <WInput value={data.phone} onChange={(v) => set('phone', v)} placeholder="09xx xxx xxx" />
      </WField>
      <WField label="Email" required>
        <WInput value={data.email} onChange={(v) => set('email', v)} placeholder="abc@gmail.com" />
      </WField>

      <Card style={{ padding: 14, marginTop: 12, background: '#F8FAFC' }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>Tài khoản nhận hoa hồng</div>
        <div style={{ fontSize: 11, color: '#64748B', marginTop: 2, marginBottom: 10 }}>Hoa hồng sẽ được chuyển vào tài khoản này khi rút tiền</div>
        <WField label="Ngân hàng" required>
          <select value={data.bankName} onChange={(e) => set('bankName', e.target.value)} style={{ width: '100%', height: 46, padding: '0 14px', borderRadius: 10, background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14, color: '#0F172A', fontWeight: 600, appearance: 'none', WebkitAppearance: 'none' }}>
            {['Vietcombank', 'Techcombank', 'MBBank', 'TPBank', 'BIDV', 'VPBank', 'ACB', 'Sacombank'].map(n => <option key={n}>{n}</option>)}
          </select>
        </WField>
        <WField label="Số tài khoản" required>
          <WInput value={data.bankAccount} onChange={(v) => set('bankAccount', v)} placeholder="Số tài khoản 9-14 số" type="number" />
        </WField>
        <WField label="Tên chủ tài khoản" required>
          <WInput value={data.bankHolder} onChange={(v) => set('bankHolder', v)} placeholder="NGUYEN VAN A (không dấu)" />
        </WField>
      </Card>
    </>
  );
}

function Step3Contract({ data, set, pkg, brand }) {
  const b = getBrand(brand);
  return (
    <>
      <Card style={{ padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>Ký hợp đồng đại lý</div>
        <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Vui lòng đọc kỹ và ký xác nhận</div>
      </Card>

      <Card style={{ padding: 16, maxHeight: 280, overflow: 'auto' }} className="scroll-area">
        <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', textAlign: 'center', marginBottom: 12 }}>HỢP ĐỒNG ĐẠI LÝ SIMPLUS</div>
        <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.7 }}>
          <p>Hôm nay, <strong>{new Date().toLocaleDateString('vi-VN')}</strong>, giữa các bên:</p>
          <p><strong>Bên A — Công ty TNHH SimPlus Việt Nam</strong> (sau đây gọi là "Công ty").</p>
          <p><strong>Bên B — {data.fullName || '<Họ tên đại lý>'}</strong>, CCCD {data.cccd || '<số CCCD>'}, địa chỉ {data.address || '<địa chỉ>'} (sau đây gọi là "Đại lý").</p>
          <p><strong>Điều 1 — Gói đại lý:</strong> Đại lý đăng ký gói <strong>{pkg?.name || '—'}</strong> với giá {vnd(pkg?.price || 0)}, thời hạn {pkg?.period || '—'}.</p>
          <p><strong>Điều 2 — Hoa hồng:</strong> Đại lý được hưởng hoa hồng F1 {pkg?.commission.f1 || 0}%, F2 {pkg?.commission.f2 || 0}%, F3 {pkg?.commission.f3 || 0}% trên doanh thu đơn hàng hợp lệ từ link giới thiệu của Đại lý và các đại lý tuyến dưới.</p>
          <p><strong>Điều 3 — Quyền và nghĩa vụ:</strong> Đại lý có quyền truy cập hệ thống quản lý, link giới thiệu riêng và báo cáo doanh thu. Đại lý cam kết bán hàng đúng giá niêm yết và không vi phạm chính sách công ty.</p>
          <p><strong>Điều 4 — Thanh toán hoa hồng:</strong> Hoa hồng được cộng vào ví đại lý sau khi đơn hàng hoàn tất giao hàng. Đại lý có thể yêu cầu rút tiền vào ngày 1 và ngày 15 hàng tháng, tối thiểu 200.000đ mỗi lần.</p>
          <p><strong>Điều 5 — Chấm dứt:</strong> Hợp đồng có hiệu lực từ ngày ký và kéo dài theo thời hạn của gói. Một trong hai bên có quyền chấm dứt hợp đồng trước thời hạn nếu bên còn lại vi phạm.</p>
          <p style={{ fontStyle: 'italic', color: '#64748B', marginTop: 14 }}>Đầy đủ điều khoản chi tiết tại simplus.vn/contract</p>
        </div>
      </Card>

      <div style={{ marginTop: 12 }}>
        <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 12, background: '#fff', borderRadius: 12, border: `1.5px solid ${data.contractAgreed ? b.solid : '#E2E8F0'}`, cursor: 'pointer' }}>
          <input type="checkbox" checked={data.contractAgreed} onChange={(e) => set('contractAgreed', e.target.checked)} style={{ marginTop: 2 }} />
          <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.5 }}>
            Tôi đã đọc và đồng ý toàn bộ điều khoản trong <strong>Hợp đồng đại lý SimPlus</strong> và chính sách bảo mật thông tin.
          </div>
        </label>
      </div>

      <Card style={{ marginTop: 12, padding: 14 }}>
        <div style={{ fontSize: 12, color: '#475569', fontWeight: 700, marginBottom: 6 }}>Chữ ký xác nhận</div>
        <WInput value={data.signature} onChange={(v) => set('signature', v)} placeholder="Gõ họ tên đầy đủ thay cho chữ ký" />
        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 6, fontStyle: 'italic' }}>Bản prototype dùng gõ tên — bản chính thức sẽ có canvas vẽ chữ ký hoặc eKYC + chữ ký số</div>
      </Card>
    </>
  );
}

function Step4Payment({ data, set, pkg, brand, showToast }) {
  const b = getBrand(brand);
  if (!pkg) return null;
  React.useEffect(() => {
    if (data.paid) return;
    const t = setTimeout(() => { set('paid', true); showToast && showToast('Hệ thống đã ghi nhận thanh toán'); }, 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Card style={{ padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>Tóm tắt</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
          <span style={{ color: '#64748B' }}>Gói</span>
          <span style={{ color: '#0F172A', fontWeight: 700 }}>{pkg.name}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
          <span style={{ color: '#64748B' }}>Thời hạn</span>
          <span style={{ color: '#0F172A', fontWeight: 700 }}>{pkg.period}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
          <span style={{ color: '#64748B' }}>Tên đại lý</span>
          <span style={{ color: '#0F172A', fontWeight: 700 }}>{data.fullName}</span>
        </div>
        <div style={{ height: 1, background: '#E2E8F0', margin: '8px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Tổng cộng</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: b.solid }}>{vnd(pkg.price)}</span>
        </div>
      </Card>

      <Card style={{ marginTop: 12, padding: 18, textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>QUÉT MÃ ĐỂ THANH TOÁN</div>
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
          <div style={{ padding: 12, background: '#fff', borderRadius: 14, border: '2px solid #0F172A', position: 'relative' }}>
            <FakeQR />
          </div>
        </div>
        <div style={{ marginTop: 12, padding: 12, background: b.soft, borderRadius: 12, fontSize: 11, color: b.text, textAlign: 'left' }}>
          <strong>Nội dung CK:</strong> DLP{pkg.id.toUpperCase()}{data.phone.replace(/\D/g, '').slice(-4)}
        </div>
        {!data.paid && (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
            <div className="spin" style={{ width: 12, height: 12, border: `2px solid ${b.solid}44`, borderTopColor: b.solid, borderRadius: '50%' }} />
            <div style={{ fontSize: 11, color: '#64748B' }}>Đang chờ chuyển khoản… (demo tự xác nhận 6s)</div>
          </div>
        )}
        {data.paid && (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center', marginTop: 12, padding: '8px 12px', background: '#DCFCE7', borderRadius: 10 }}>
            <Ic.Check s={16} c="#15803D" />
            <div style={{ fontSize: 12, color: '#15803D', fontWeight: 700 }}>Đã ghi nhận thanh toán</div>
          </div>
        )}
      </Card>
    </>
  );
}

function Step5Pending({ pkg, data, brand }) {
  const b = getBrand(brand);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0 14px' }}>
        <div className="anim-scale" style={{
          width: 90, height: 90, borderRadius: 30,
          background: 'linear-gradient(135deg, #F59E0B, #D97706)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 16px 36px -10px #F59E0B80',
        }}>
          <Ic.Clock s={44} c="#fff" w={2.5} />
        </div>
        <div style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', marginTop: 18 }}>Đang chờ admin duyệt</div>
        <div style={{ fontSize: 13, color: '#64748B', marginTop: 6, textAlign: 'center', maxWidth: 280, lineHeight: 1.5 }}>
          Yêu cầu đăng ký <strong>{pkg?.name}</strong> đã gửi. Admin sẽ đối soát trong vòng <strong>1-2 ngày làm việc</strong>.
        </div>
      </div>

      <Card style={{ padding: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#64748B', letterSpacing: 0.3, marginBottom: 10 }}>TRẠNG THÁI</div>
        {[
          { l: 'Đã chọn gói', done: true },
          { l: 'Đã gửi thông tin', done: true },
          { l: 'Đã ký hợp đồng', done: true },
          { l: 'Đã thanh toán', done: true },
          { l: 'Chờ admin đối soát', done: false, active: true },
          { l: 'Kích hoạt đại lý', done: false },
        ].map((s, i, arr) => (
          <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: s.done ? '#10B981' : s.active ? '#F59E0B' : '#E2E8F0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {s.done ? <Ic.Check s={14} c="#fff" w={2.6} /> : s.active ? <div className="spin" style={{ width: 10, height: 10, border: '2px solid #fff', borderRightColor: 'transparent', borderRadius: '50%' }} /> : <span style={{ fontSize: 11, fontWeight: 800 }}>{i + 1}</span>}
            </div>
            <div style={{ flex: 1, fontSize: 13, fontWeight: s.active ? 700 : 600, color: s.done || s.active ? '#0F172A' : '#94A3B8' }}>{s.l}</div>
            {s.done && <div style={{ fontSize: 11, color: '#15803D', fontWeight: 700 }}>Hoàn tất</div>}
            {s.active && <div style={{ fontSize: 11, color: '#B45309', fontWeight: 700 }}>Đang xử lý</div>}
          </div>
        ))}
      </Card>

      <Card style={{ marginTop: 10, padding: 14, background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 16 }}>💡</span>
          <div style={{ fontSize: 12, color: '#1E40AF', lineHeight: 1.5 }}>
            Trong khi chờ duyệt, bạn có thể bấm <strong>"Vào dashboard"</strong> bên dưới để xem demo các chức năng dành cho đại lý.
          </div>
        </div>
      </Card>
    </>
  );
}

function WField({ label, required, children }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
        {label}{required && <span style={{ color: '#DC2626' }}> *</span>}
      </div>
      {children}
    </div>
  );
}

function WInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      inputMode={type === 'number' ? 'numeric' : 'text'}
      style={{
        width: '100%', height: 46, padding: '0 14px', borderRadius: 10,
        background: '#fff', border: '1.5px solid #E2E8F0',
        color: '#0F172A', fontSize: 14, outline: 'none', boxSizing: 'border-box',
      }}
    />
  );
}

function AgentDashboardScreen({ nav, brand, user, agentLayout }) {
  const b = getBrand(brand);
  const [range, setRange] = React.useState('30d');
  const monthly = 12480000, pending = 3220000, paid = 89400000;
  const sparkData = [3, 4.5, 4, 6, 5.5, 7, 8, 7.5, 9, 8, 10, 12];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', overflow: 'auto', paddingBottom: 100 }} className="scroll-area anim-fade">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5 }}><IOSStatusBar dark={true} /></div>

      <div className="screen-hero" style={{ background: `linear-gradient(165deg, ${b.grad[0]}, ${b.grad[1]})`, padding: '60px 18px 80px', color: '#fff', borderRadius: '0 0 28px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, position: 'relative' }}>
          <button onClick={() => nav.pop()} className="tap" style={{ ...btnGlass, background: 'rgba(255,255,255,0.2)', flexShrink: 0 }}><Ic.Back s={20} c="#fff" /></button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 600 }}>DASHBOARD ĐẠI LÝ</div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, marginTop: 2 }}>Xin chào, {user.name.split(' ').slice(-1)[0]}</div>
            <div style={{ marginTop: 8 }}><Badge color="amber">⭐ Cấp {user.agentTier} · F1 20%</Badge></div>
          </div>
          <button onClick={() => nav.push('agent-referral')} className="tap" style={{ ...btnGlass, background: 'rgba(255,255,255,0.2)', flexShrink: 0 }}><Ic.Share s={18} c="#fff" /></button>
        </div>

        <div style={{ marginTop: 22, position: 'relative' }}>
          <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 600 }}>HOA HỒNG THÁNG NÀY</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>{vnd(monthly)}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#A7F3D0', display: 'inline-flex', alignItems: 'center', gap: 2 }}><Ic.ArrowUp s={11} c="#A7F3D0" />+24%</span>
          </div>
        </div>
      </div>

      {/* range tabs */}
      <div style={{ padding: '0 18px', marginTop: -50, position: 'relative' }}>
        <Card style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Doanh thu hoa hồng</div>
            <div style={{ display: 'flex', gap: 0, background: '#F1F5F9', borderRadius: 9, padding: 2 }}>
              {['7d', '30d', '90d'].map(r => (
                <button key={r} onClick={() => setRange(r)} className="tap" style={{ padding: '4px 10px', border: 'none', background: range === r ? '#fff' : 'transparent', color: range === r ? '#0F172A' : '#64748B', borderRadius: 7, fontSize: 11, fontWeight: 700 }}>{r}</button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Spark data={sparkData} color={b.solid} width={332} height={70} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
            <div style={{ padding: 12, borderRadius: 12, background: '#F0FDF4' }}>
              <div style={{ fontSize: 11, color: '#15803D', fontWeight: 700 }}>Đã thanh toán</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginTop: 2, letterSpacing: -0.3 }}>{vnd(paid)}</div>
            </div>
            <div style={{ padding: 12, borderRadius: 12, background: '#FEF3C7' }}>
              <div style={{ fontSize: 11, color: '#92400E', fontWeight: 700 }}>Chờ duyệt</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginTop: 2, letterSpacing: -0.3 }}>{vnd(pending)}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* F1 F2 F3 commission breakdown */}
      <div style={{ padding: '14px 18px 0' }}>
        <SectionHead title="Hoa hồng theo cấp" />
        <Card style={{ padding: 16 }}>
          {[
            { l: 'F1 (Trực tiếp)', n: 12, r: 20, amt: 7440000, c: '#10B981' },
            { l: 'F2 (Cấp 2)', n: 14, r: 8, amt: 3290000, c: '#3B82F6' },
            { l: 'F3 (Cấp 3)', n: 6, r: 3, amt: 1750000, c: '#8B5CF6' },
          ].map((row, i, arr) => (
            <div key={row.l}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: row.c + '18', color: row.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>{row.l.split(' ')[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{row.l}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{row.n} thành viên · {row.r}% hoa hồng</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', letterSpacing: -0.3 }}>{vnd(row.amt)}</div>
                </div>
              </div>
              {i < arr.length - 1 && <div style={{ height: 1, background: '#F1F5F9' }} />}
            </div>
          ))}
        </Card>
      </div>

      {agentLayout === 'stats' && (
        <div style={{ padding: '14px 18px 0' }}>
          <SectionHead title="Hiệu suất" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { l: 'Click link', v: '1.2K', d: '+12%', c: '#3B82F6' },
              { l: 'Đăng ký mới', v: '48', d: '+8%', c: '#10B981' },
              { l: 'Đơn hợp lệ', v: '32', d: '+18%', c: '#F59E0B' },
              { l: 'Tỷ lệ chốt', v: '24%', d: '+3%', c: '#8B5CF6' },
            ].map((s) => (
              <Card key={s.l} style={{ padding: 14 }}>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>{s.l}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', letterSpacing: -0.4, marginTop: 2 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: s.c, fontWeight: 700, marginTop: 4 }}>↑ {s.d}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* quick actions */}
      <div style={{ padding: '14px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Card onClick={() => nav.push('agent-team')} style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#DBEAFE', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Users s={20} c="#1D4ED8" /></div>
          <div><div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Quản lý team</div><div style={{ fontSize: 11, color: '#64748B' }}>32 thành viên</div></div>
        </Card>
        <Card onClick={() => nav.push('wallet')} style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Wallet s={20} c="#B45309" /></div>
          <div><div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Rút tiền</div><div style={{ fontSize: 11, color: '#64748B' }}>Khả dụng {vndShort(monthly)}</div></div>
        </Card>
      </div>

      {/* Recent commissions */}
      <div style={{ padding: '14px 18px 0' }}>
        <SectionHead title="Hoa hồng gần đây" action="Xem tất cả" />
        <Card style={{ overflow: 'hidden' }}>
          {[
            { n: 'Lê Văn Bình', t: 'F1', p: 'SIM 5G Pro', a: 59800, d: '2 giờ trước' },
            { n: 'Nguyễn Mai', t: 'F1', p: 'Khóa học Bestseller', a: 259800, d: '5 giờ trước' },
            { n: 'Trần Hùng', t: 'F2', p: 'SIM Số đẹp', a: 47920, d: 'Hôm qua' },
            { n: 'Phạm Anh', t: 'F3', p: 'Gói đại lý Đồng', a: 19800, d: '2 ngày' },
          ].map((c, i, arr) => (
            <div key={i} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <Avatar name={c.n} size={36} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{c.n}</span>
                  <Badge color={c.t === 'F1' ? 'green' : c.t === 'F2' ? 'blue' : 'purple'}>{c.t}</Badge>
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{c.p} · {c.d}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#10B981' }}>+{vnd(c.a)}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function AgentTeamScreen({ nav, brand, showToast }) {
  const b = getBrand(brand);
  const [level, setLevel] = React.useState('F1');
  const team = {
    F1: [
      { n: 'Lê Văn Bình', phone: '0912 345 678', joined: '12/03/2025', sales: 12, revenue: 28400000, comm: 1840000, tier: 'Bạc', expires: '12/03/2026', active: true },
      { n: 'Nguyễn Mai', phone: '0987 654 321', joined: '28/02/2025', sales: 24, revenue: 58900000, comm: 3920000, tier: 'Vàng', expires: '28/02/2026', active: true },
      { n: 'Trần Hùng', phone: '0901 234 567', joined: '15/02/2025', sales: 8, revenue: 17500000, comm: 1100000, tier: 'Đồng', expires: '15/02/2026', active: true },
      { n: 'Đỗ Quốc', phone: '0978 456 123', joined: '02/02/2025', sales: 18, revenue: 41200000, comm: 2890000, tier: 'Bạc', expires: '02/02/2026', active: true },
      { n: 'Vũ Hà', phone: '0935 678 901', joined: '20/01/2025', sales: 6, revenue: 11800000, comm: 740000, tier: 'Đồng', expires: '20/01/2026', active: false },
    ],
    F2: [
      { n: 'Phạm Tuấn', phone: '0908 123 456', joined: '08/03/2025', sales: 5, revenue: 8900000, comm: 380000, tier: 'Đồng', via: 'Lê Văn Bình', expires: '08/03/2026', active: true },
      { n: 'Hoàng My', phone: '0967 234 568', joined: '14/02/2025', sales: 11, revenue: 24200000, comm: 920000, tier: 'Bạc', via: 'Nguyễn Mai', expires: '14/02/2026', active: true },
      { n: 'Bùi Đức', phone: '0915 345 670', joined: '30/01/2025', sales: 7, revenue: 14800000, comm: 540000, tier: 'Đồng', via: 'Đỗ Quốc', expires: '30/01/2026', active: true },
    ],
    F3: [
      { n: 'Lý Hồng', phone: '0974 567 890', joined: '20/03/2025', sales: 3, revenue: 6500000, comm: 95000, tier: 'Đồng', via: 'Phạm Tuấn', expires: '20/03/2026', active: true },
      { n: 'Ngô Khôi', phone: '0902 678 901', joined: '12/03/2025', sales: 4, revenue: 9200000, comm: 145000, tier: 'Đồng', via: 'Hoàng My', expires: '12/03/2026', active: true },
    ],
  };
  const list = team[level];
  const totals = {
    members: list.length,
    revenue: list.reduce((s, m) => s + m.revenue, 0),
    comm: list.reduce((s, m) => s + m.comm, 0),
    sales: list.reduce((s, m) => s + m.sales, 0),
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 100 }} className="anim-slide-in">
      <ScreenHeader title="Team đại lý" subtitle="32 thành viên · 3 cấp" onBack={() => nav.pop()} />

      {/* tree visualization */}
      <div style={{ padding: '14px 18px 0' }}>
        <Card style={{ padding: 18, background: `linear-gradient(135deg, ${b.grad[0]}10, ${b.grad[1]}10)` }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ padding: '6px 12px', borderRadius: 999, background: '#fff', border: `2px solid ${b.solid}`, fontSize: 12, fontWeight: 800, color: b.solid }}>Bạn (F0)</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 14, position: 'relative' }}>
            <svg viewBox="0 0 300 30" style={{ position: 'absolute', top: -10, left: 0, right: 0, width: '100%', height: 30, pointerEvents: 'none' }}>
              <path d="M150 0 L60 30 M150 0 L150 30 M150 0 L240 30" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
            </svg>
            {[
              { l: 'F1', n: 12, c: '#10B981' },
              { l: 'F2', n: 14, c: '#3B82F6' },
              { l: 'F3', n: 6, c: '#8B5CF6' },
            ].map((x) => (
              <div key={x.l} onClick={() => setLevel(x.l)} className="tap" style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: x.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, border: level === x.l ? '3px solid #0F172A' : '3px solid transparent', margin: '0 auto', transition: 'border .15s' }}>{x.n}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', marginTop: 5 }}>{x.l}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '14px 18px 6px', overflowX: 'auto', flexShrink: 0 }} className="scroll-area">
        {['F1', 'F2', 'F3'].map(f => <Chip key={f} active={f === level} onClick={() => setLevel(f)} brand={brand}>Cấp {f} ({team[f].length})</Chip>)}
      </div>

      {/* Aggregate stats card for active level */}
      <div style={{ padding: '0 18px 8px' }}>
        <Card style={{ padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', letterSpacing: 0.3, marginBottom: 8 }}>TỔNG HỢP TẦNG {level}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ padding: 10, background: '#EFF6FF', borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: '#1E40AF', fontWeight: 700 }}>Doanh thu nhánh</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginTop: 2, letterSpacing: -0.3 }}>{vnd(totals.revenue)}</div>
            </div>
            <div style={{ padding: 10, background: '#F0FDF4', borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: '#15803D', fontWeight: 700 }}>HH đóng góp</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginTop: 2, letterSpacing: -0.3 }}>{vnd(totals.comm)}</div>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: '#64748B' }}>
            <strong style={{ color: '#0F172A' }}>{totals.members}</strong> thành viên · <strong style={{ color: '#0F172A' }}>{totals.sales}</strong> đơn
          </div>
        </Card>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '4px 18px 30px' }} className="scroll-area">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.map((m, i) => (
            <Card key={i} onClick={() => showToast && showToast(`Sẽ mở chi tiết ${m.n}`)} style={{ padding: 14, position: 'relative', overflow: 'hidden' }}>
              {!m.active && (
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '3px 10px', background: '#FEE2E2', color: '#991B1B', fontSize: 10, fontWeight: 800, borderBottomLeftRadius: 10 }}>Hết hạn gói</div>
              )}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Avatar name={m.n} size={46} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{m.n}</span>
                    <Badge color={m.tier === 'Vàng' ? 'amber' : m.tier === 'Bạc' ? 'slate' : 'red'}>{m.tier}</Badge>
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 3 }}>
                    📞 {m.phone}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                    Join {m.joined}{m.via ? ` · qua ${m.via}` : ''} · hết hạn {m.expires}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 12, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                <div>
                  <div style={{ fontSize: 10, color: '#64748B' }}>Đơn</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>{m.sales}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#64748B' }}>Doanh thu</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginTop: 2, letterSpacing: -0.2 }}>{vndShort(m.revenue)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#64748B' }}>HH cho bạn</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#10B981', marginTop: 2, letterSpacing: -0.2 }}>+{vndShort(m.comm)}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentReferralScreen({ nav, brand, user, showToast }) {
  const b = getBrand(brand);
  const link = 'simplus.vn/r/' + user.refCode;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column' }} className="anim-slide-in">
      <ScreenHeader title="Link giới thiệu" onBack={() => nav.pop()} />
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        <Card style={{ padding: 22, textAlign: 'center', background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, color: '#fff' }}>
          <div style={{ fontSize: 13, opacity: 0.85, fontWeight: 600 }}>MÃ GIỚI THIỆU CỦA BẠN</div>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 2, marginTop: 6, fontFamily: 'ui-monospace, monospace' }}>{user.refCode}</div>
          <div style={{ marginTop: 14, padding: '8px 14px', background: 'rgba(255,255,255,0.18)', borderRadius: 12, fontSize: 13, fontWeight: 600 }}>{link}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={() => showToast('Đã sao chép link')} className="tap" style={{ flex: 1, height: 44, borderRadius: 12, border: 'none', background: '#fff', color: b.solid, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Ic.Copy s={16} c={b.solid} />Sao chép</button>
            <button onClick={() => showToast('Đã mở chia sẻ')} className="tap" style={{ flex: 1, height: 44, borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Ic.Share s={16} c="#fff" />Chia sẻ</button>
          </div>
        </Card>

        <SectionHead title="Hiệu quả link" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[{ l: 'Lượt click', v: '1.2K', c: '#3B82F6' }, { l: 'Đăng ký', v: '48', c: '#10B981' }, { l: 'Mua hàng', v: '32', c: '#F59E0B' }].map(s => (
            <Card key={s.l} style={{ padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.c, letterSpacing: -0.3 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{s.l}</div>
            </Card>
          ))}
        </div>

        <SectionHead title="Chia sẻ qua kênh" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
          {[{ l: 'Zalo', c: '#0068FF', i: 'Z' }, { l: 'Facebook', c: '#1877F2', i: 'f' }, { l: 'Tiktok', c: '#000', i: 'T' }, { l: 'SMS', c: '#10B981', i: '✉' }].map(x => (
            <button key={x.l} className="tap" style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 6 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: x.c, color: '#fff', fontWeight: 800, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{x.i}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#0F172A' }}>{x.l}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function WalletScreen({ nav, brand, user, showToast }) {
  const b = getBrand(brand);
  const [activeTab, setActiveTab] = React.useState('tx'); // tx (transactions) or history (withdrawals)
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState([]);

  const tx = [
    { t: 'Hoa hồng F1 · Nguyễn Mai', amt: 259800, in: true, d: '12/05 09:24' },
    { t: 'Rút tiền · Vietcombank', amt: 5000000, in: false, d: '08/05 14:22', s: 'Đã duyệt' },
    { t: 'Hoa hồng F2 · Phạm Tuấn', amt: 47920, in: true, d: '06/05 11:08' },
    { t: 'Yêu cầu rút tiền', amt: 3000000, in: false, d: '02/05 16:40', s: 'Chờ duyệt' },
  ];

  const totalSelected = MOCK_COMMISSION_ORDERS
    .filter(o => selectedIds.includes(o.id))
    .reduce((sum, o) => sum + o.commission, 0);

  // Withdrawal eligibility based on admin config
  const today = new Date();
  const todayDay = today.getDate();
  const cfg = WITHDRAW_CONFIG;
  const isAllowedDay = cfg.allowedDays.length === 0 || cfg.allowedDays.includes(todayDay);
  const isBeforeCutoff = today.getHours() < cfg.cutoffHour;
  const canWithdraw = isAllowedDay && isBeforeCutoff && user.balance >= cfg.minAmount;

  const nextAllowedDay = (() => {
    if (cfg.allowedDays.length === 0) return null;
    const nextThis = cfg.allowedDays.find(d => d > todayDay);
    if (nextThis) return nextThis + '/' + (today.getMonth() + 1);
    return cfg.allowedDays[0] + '/' + (((today.getMonth() + 1) % 12) + 1);
  })();

  const canSubmit = totalSelected >= cfg.minAmount;

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 100 }} className="anim-slide-in">
      <ScreenHeader title="Ví đại lý" onBack={() => nav.pop()} />
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        <Card style={{ padding: 18, background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, color: '#fff' }}>
          <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 600 }}>SỐ DƯ KHẢ DỤNG</div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.6, marginTop: 4 }}>{vnd(user.balance)}</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 14, fontSize: 12 }}>
            <div><span style={{ opacity: 0.75 }}>Chờ duyệt</span><div style={{ fontWeight: 700, marginTop: 2 }}>{vnd(3220000)}</div></div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.25)' }} />
            <div><span style={{ opacity: 0.75 }}>Đã rút (T5)</span><div style={{ fontWeight: 700, marginTop: 2 }}>{vnd(5000000)}</div></div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={() => canWithdraw && setSheetOpen(true)} disabled={!canWithdraw} className="tap" style={{ flex: 1, height: 44, borderRadius: 12, border: 'none', background: canWithdraw ? '#fff' : 'rgba(255,255,255,0.4)', color: canWithdraw ? b.solid : 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 700, cursor: canWithdraw ? 'pointer' : 'not-allowed' }}>Rút tiền</button>
            <button onClick={() => setActiveTab('history')} className="tap" style={{ flex: 1, height: 44, borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 13, fontWeight: 700 }}>Yêu cầu của tôi</button>
          </div>
        </Card>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', padding: '14px 18px 0' }}>
          <div style={{ display: 'flex', background: '#E2E8F0', borderRadius: 12, padding: 3, flex: 1 }}>
            {[
              { k: 'tx', l: 'Biến động số dư' },
              { k: 'history', l: 'Lịch sử rút tiền' },
            ].map(t => (
              <button key={t.k} onClick={() => setActiveTab(t.k)} className="tap" style={{
                flex: 1, height: 36, borderRadius: 9, border: 'none',
                background: activeTab === t.k ? '#fff' : 'transparent',
                color: activeTab === t.k ? b.solid : '#64748B',
                fontSize: 12, fontWeight: 700,
              }}>{t.l}</button>
            ))}
          </div>
        </div>

        {activeTab === 'tx' ? (
          <>
            {/* Withdrawal eligibility info card */}
            <Card style={{ margin: '14px 18px 0', padding: 14, background: canWithdraw ? '#F0FDF4' : '#FEF3C7', border: `1px solid ${canWithdraw ? '#BBF7D0' : '#FCD34D'}` }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: canWithdraw ? '#10B981' : '#F59E0B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {canWithdraw ? <Ic.Check s={16} c="#fff" w={2.6} /> : <Ic.Clock s={16} c="#fff" />}
                </div>
                <div style={{ flex: 1, fontSize: 12, color: canWithdraw ? '#15803D' : '#92400E', lineHeight: 1.5 }}>
                  {canWithdraw ? (
                    <><strong>Đủ điều kiện rút tiền hôm nay.</strong> Hãy chọn các đơn hàng thành công bên dưới để yêu cầu thanh toán hoa hồng.</>
                  ) : !isAllowedDay ? (
                    <><strong>Chưa đến ngày rút.</strong> Theo cấu hình của admin, được rút vào ngày <strong>{cfg.allowedDays.join(' và ')}</strong> hàng tháng. Lần tiếp theo: <strong>{nextAllowedDay}</strong>.</>
                  ) : !isBeforeCutoff ? (
                    <><strong>Quá giờ cut-off {cfg.cutoffHour}h.</strong> Vui lòng đợi ngày được rút tiếp theo.</>
                  ) : (
                    <><strong>Số dư chưa đủ.</strong> Cần tối thiểu <strong>{vnd(cfg.minAmount)}</strong> để gửi yêu cầu rút.</>
                  )}
                </div>
              </div>
            </Card>

            <SectionHead title="Giao dịch gần đây" />
            <div style={{ padding: '0 18px' }}>
              <Card style={{ overflow: 'hidden' }}>
                {tx.map((t, i) => (
                  <div key={i} style={{ padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center', borderBottom: i < tx.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: t.in ? '#DCFCE7' : '#FEF3C7', color: t.in ? '#15803D' : '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.in ? <Ic.ArrowUp s={16} w={2.4} /> : <Ic.Wallet s={18} />}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{t.t}</div>
                      <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{t.d}{t.s ? ` · ${t.s}` : ''}</div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: t.in ? '#10B981' : '#0F172A' }}>{t.in ? '+' : '-'}{vnd(t.amt)}</div>
                  </div>
                ))}
              </Card>
            </div>
          </>
        ) : (
          <div style={{ padding: '14px 18px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MOCK_WITHDRAWAL_HISTORY.map((h) => {
                const s = h.status === 'approved' ? { c: 'green', l: 'Đã duyệt' } : h.status === 'pending' ? { c: 'amber', l: 'Chờ duyệt' } : { c: 'red', l: 'Từ chối' };
                return (
                  <Card key={h.id} onClick={() => nav.push('withdrawal-detail', { request: h })} style={{ padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', fontFamily: 'ui-monospace, monospace' }}>#{h.id}</div>
                        <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{h.date}</div>
                      </div>
                      <Badge color={s.c}>{s.l}</Badge>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12 }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A' }}>{vnd(h.amount)}</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>{h.ordersCount} đơn hàng</div>
                    </div>
                    <div style={{ height: 1, background: '#F1F5F9', margin: '12px 0' }} />
                    <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                      <Ic.Bell s={14} c="#94A3B8" />
                      <div style={{ fontSize: 11, color: '#64748B', lineHeight: 1.4 }}>
                        {h.bank} · <span style={{ color: '#475569', fontWeight: 600 }}>{h.note}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Yêu cầu rút tiền" bottomOffset={0}>
        <div style={{ padding: '0 20px 30px', display: 'flex', flexDirection: 'column', height: '70vh' }}>
          <div style={{ paddingBottom: 16, borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 4 }}>Tổng hoa hồng đã chọn</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: b.solid }}>{vnd(totalSelected)}</div>
              <div style={{ fontSize: 12, color: totalSelected >= cfg.minAmount ? '#10B981' : '#DC2626', fontWeight: 700 }}>
                {totalSelected >= cfg.minAmount ? 'Đã đủ hạn mức rút' : `Cần tối thiểu ${vndShort(cfg.minAmount)}`}
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflow: 'auto', margin: '16px 0' }} className="scroll-area">
            <div style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', letterSpacing: 0.5, marginBottom: 12 }}>ĐƠN HÀNG ĐỦ ĐIỀU KIỆN (COMPLETED)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MOCK_COMMISSION_ORDERS.map(o => {
                const active = selectedIds.includes(o.id);
                return (
                  <div key={o.id} onClick={() => toggleSelect(o.id)} className="tap" style={{
                    padding: 12, borderRadius: 14, background: active ? b.soft : '#F8FAFC',
                    border: active ? `1.5px solid ${b.solid}` : '1.5px solid #E2E8F0',
                    display: 'flex', gap: 12, alignItems: 'center'
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 6, border: active ? 'none' : '2px solid #CBD5E1',
                      background: active ? b.solid : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {active && <Ic.Check s={14} c="#fff" w={3} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', fontFamily: 'ui-monospace, monospace' }}>{o.id}</span>
                        <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>{o.date}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#334155', fontWeight: 700, marginTop: 3 }}>{o.name}</div>
                      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                        <div style={{ fontSize: 11, color: '#64748B' }}>Khách: <span style={{ color: '#0F172A', fontWeight: 600 }}>{o.buyer}</span></div>
                        <div style={{ width: 1, height: 10, background: '#E2E8F0', marginTop: 3 }} />
                        <div style={{ fontSize: 11, color: '#64748B' }}>Người bán: <span style={{ color: o.level === 'F0' ? b.solid : '#7C3AED', fontWeight: 700 }}>{o.seller}</span> {o.level !== 'F0' && <Badge color="purple" style={{ fontSize: 9, padding: '1px 5px' }}>{o.level}</Badge>}</div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingTop: 6, borderTop: '1px dashed #E2E8F0' }}>
                        <div>
                          <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700 }}>GIÁ TRỊ ĐƠN</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>{vnd(o.total)}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 10, color: '#10B981', fontWeight: 800 }}>HOA HỒNG ({o.rate})</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: '#10B981' }}>+{vnd(o.commission)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
            <Card style={{ padding: 12, marginBottom: 16, background: '#F8FAFC', display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: b.solid, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>VCB</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Vietcombank</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>•••• 4789 · {user.name}</div>
              </div>
              <Ic.Chevron s={14} c="#94A3B8" />
            </Card>
            <PrimaryButton fullWidth brand={brand} disabled={!canSubmit} onClick={() => { setSheetOpen(false); setSelectedIds([]); showToast(`Đã gửi yêu cầu rút ${vnd(totalSelected)} cho ${selectedIds.length} đơn hàng`); }}>
              Gửi yêu cầu rút tiền
            </PrimaryButton>
          </div>
        </div>
      </Sheet>
    </div>
  );
}

// === Lịch sử mua gói đại lý ===
function AgentHistoryScreen({ nav, brand, user, showToast }) {
  const b = getBrand(brand);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 30 }} className="anim-slide-in">
      <ScreenHeader title="Lịch sử mua gói" subtitle={`${MOCK_PACKAGE_HISTORY.length} giao dịch`} onBack={() => nav.pop()} />
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        {MOCK_PACKAGE_HISTORY.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}>
            <Ic.Crown s={48} c="#CBD5E1" />
            <div style={{ marginTop: 12, fontSize: 14 }}>Chưa có gói nào</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MOCK_PACKAGE_HISTORY.map((h) => {
              const active = h.status === 'Đang hiệu lực';
              return (
                <Card key={h.id} style={{ padding: 14, border: active ? `1.5px solid ${b.solid}` : '1.5px solid transparent' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: active ? b.solid : '#E2E8F0', color: active ? '#fff' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Ic.Crown s={20} c={active ? '#fff' : '#64748B'} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{h.pkg}</div>
                        <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{h.type} · {h.boughtAt}</div>
                      </div>
                    </div>
                    <Badge color={active ? 'green' : 'slate'}>{h.status}</Badge>
                  </div>

                  <div style={{ padding: '10px 0', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#475569' }}>
                    <span>Hiệu lực</span>
                    <span style={{ color: '#0F172A', fontWeight: 700 }}>{h.from} → {h.until}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>Giá thanh toán</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: b.solid }}>{vnd(h.price)}</div>
                    </div>
                    <button onClick={() => showToast && showToast('Đang mở hợp đồng')} className="tap" style={{ padding: '8px 14px', borderRadius: 10, border: '1.5px solid #E2E8F0', background: '#fff', fontSize: 12, fontWeight: 700, color: '#475569', display: 'flex', gap: 5, alignItems: 'center' }}>
                      <Ic.Doc s={14} />Hợp đồng
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        <Card style={{ marginTop: 14, padding: 14, background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <div style={{ fontSize: 12, color: '#1E40AF', lineHeight: 1.5 }}>
              Bạn có thể nâng cấp lên gói cao hơn bất kỳ lúc nào. Hệ thống sẽ tính tiền chênh lệch theo thời gian còn lại.
            </div>
          </div>
        </Card>

        <button onClick={() => nav.push('agent-packages')} className="tap" style={{ marginTop: 14, width: '100%', height: 50, borderRadius: 14, background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, color: '#fff', border: 'none', fontSize: 14, fontWeight: 800, letterSpacing: 0.3, boxShadow: `0 8px 20px ${b.solid}30` }}>
          Mua / nâng cấp gói
        </button>
      </div>
    </div>
  );
}

// === Chi tiết yêu cầu rút tiền ===
function WithdrawalDetailScreen({ nav, brand, user, request, showToast }) {
  const b = getBrand(brand);
  if (!request) return null;

  const s = request.status === 'approved' ? { c: 'green', l: 'Đã duyệt', desc: 'Yêu cầu của bạn đã được phê duyệt và giải ngân.' } : request.status === 'pending' ? { c: 'amber', l: 'Đang xử lý', desc: 'Hệ thống đang đối soát các đơn hàng liên quan.' } : { c: 'red', l: 'Từ chối', desc: 'Yêu cầu bị từ chối do vi phạm chính sách hoặc hoàn đơn.' };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', display: 'flex', flexDirection: 'column', paddingBottom: 30 }} className="anim-slide-in">
      <ScreenHeader title="Chi tiết yêu cầu" subtitle={`Mã: ${request.id}`} onBack={() => nav.pop()} />
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 30px' }} className="scroll-area">
        
        {/* Status Hero */}
        <Card style={{ padding: 18, background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 700 }}>TỔNG TIỀN RÚT</div>
          <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>{vnd(request.amount)}</div>
          <div style={{ marginTop: 12 }}>
            <Badge color={s.c} style={{ fontSize: 13, padding: '5px 12px' }}>{s.l}</Badge>
          </div>
          <div style={{ fontSize: 11, opacity: 0.8, marginTop: 14, lineHeight: 1.4 }}>{s.desc}</div>
        </Card>

        {/* Info Section */}
        <SectionHead title="Thông tin giải ngân" />
        <Card style={{ padding: 16 }}>
          {[
            { l: 'Ngày yêu cầu', v: request.date },
            { l: 'Ngân hàng', v: request.bank },
            { l: 'Số tài khoản', v: '•••• 4789' },
            { l: 'Chủ tài khoản', v: user.name.toUpperCase() },
            { l: 'Nội dung', v: request.note },
          ].map((r, i, arr) => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <span style={{ fontSize: 12, color: '#64748B' }}>{r.l}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', textAlign: 'right' }}>{r.v}</span>
            </div>
          ))}
        </Card>

        <SectionHead title={`Đơn hàng đối soát (${request.ordersCount})`} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {request.orders?.map(o => (
            <Card key={o.id} style={{ padding: 14, border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', fontFamily: 'ui-monospace, monospace' }}>{o.id}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{o.date} · Khách: {o.buyer}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#10B981' }}>+{vnd(o.commission)}</div>
                  <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700 }}>HOA HỒNG</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {request.status === 'rejected' && (
          <div style={{ marginTop: 20, padding: 16, background: '#FEF2F2', borderRadius: 16, border: '1px solid #FECACA', display: 'flex', gap: 10 }}>
            <Ic.Bell s={20} c="#EF4444" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#991B1B' }}>Cần hỗ trợ?</div>
              <div style={{ fontSize: 11, color: '#B91C1C', marginTop: 2, lineHeight: 1.4 }}>Vui lòng liên hệ bộ phận Kế toán qua Hotline 1900 xxxx để được giải đáp về việc từ chối yêu cầu này.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  AgentPackagesScreen, AgentDashboardScreen, AgentTeamScreen, AgentReferralScreen, AgentHistoryScreen,
  WalletScreen, WithdrawalDetailScreen,
  MOCK_COMMISSION_ORDERS, MOCK_WITHDRAWAL_HISTORY, WITHDRAW_CONFIG, MOCK_PACKAGE_HISTORY 
});
