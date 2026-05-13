// screens-home.jsx — Home tab with hero variants + featured

// Sum digits of phone number to single-digit ngũ hành (1-9)
function calcTongNut(phone) {
  const digits = String(phone || '').replace(/\D/g, '').split('').map(Number);
  let s = digits.reduce((a, b) => a + b, 0);
  while (s > 9) s = String(s).split('').map(Number).reduce((a, b) => a + b, 0);
  return s;
}

const MOCK_SIMS = [
  {
    id: 's1', name: 'Lộc Phát Tam Hoa', carrier: 'Viettel', prefix: '086', number: '0868 86 86 86',
    price: 5990000, oldPrice: 7990000, data: '120GB/tháng', call: 'Miễn phí nội mạng',
    tag: 'Lộc phát', color: '#16A34A', img: 'V', element: 'Hỏa', sum: 8, simType: '5G eSIM',
    commission: 18,
    compatibleElements: ['Hỏa', 'Mộc'], compatibleAges: ['Canh Thân 1980', 'Bính Tý 1996', 'Mậu Dần 1998'],
    luanGiai: {
      tongNut: { value: 8, meaning: 'Số 8 trong phong thủy là số "Phát" — biểu trưng cho thịnh vượng, phát đạt và tài lộc dồi dào. Tổng nút 8 đặc biệt hợp người làm kinh doanh, buôn bán.' },
      nguHanh: { element: 'Hỏa', meaning: 'Mệnh Hỏa rực rỡ, nhiệt huyết và năng động. Số này tăng cường vận khí cho người mệnh Hỏa và Mộc (Mộc sinh Hỏa).' },
      daiDep: { group: 'Lộc Phát Tam Hoa 868686', meaning: 'Dải "86" lặp 3 lần (Lộc Phát) tạo nên cộng hưởng tài lộc rất mạnh. Tam hoa khẳng định địa vị, uy quyền và sự bền vững.' },
      digitMeanings: [
        { digit: 0, meaning: 'Khởi đầu vẹn toàn, không cùng tận' },
        { digit: 8, meaning: 'Phát — phát đạt, thịnh vượng' },
        { digit: 6, meaning: 'Lộc — tài lộc, may mắn' },
      ],
      expertNote: 'SIM lý tưởng cho doanh nhân, người làm sales/đại lý. Nên giữ làm số chính trong giao dịch.',
    },
  },
  {
    id: 's2', name: 'Thần Tài Đại Cát', carrier: 'MobiFone', prefix: '097', number: '0979 39 39 79',
    price: 12990000, data: 'Không giới hạn', call: 'Không giới hạn',
    tag: 'Thần tài', color: '#7C3AED', img: 'M', element: 'Kim', sum: 7, simType: '5G eSIM',
    commission: 20,
    compatibleElements: ['Kim', 'Thủy'], compatibleAges: ['Quý Hợi 1983', 'Tân Mùi 1991', 'Quý Dậu 1993'],
    luanGiai: {
      tongNut: { value: 7, meaning: 'Số 7 — số "Thất" trong tiếng Hán Việt nghĩa là "Tất Cả", biểu trưng cho sự viên mãn, đầy đủ.' },
      nguHanh: { element: 'Kim', meaning: 'Mệnh Kim cứng cáp, kiên định. SIM hợp người mệnh Kim và Thủy (Kim sinh Thủy).' },
      daiDep: { group: 'Thần Tài Đại Cát 79·79', meaning: '"79" là cặp số Thần Tài kinh điển — Thần tài độ mệnh, làm ăn phát đạt, tài lộc về như nước.' },
      digitMeanings: [
        { digit: 0, meaning: 'Khởi nguyên' },
        { digit: 9, meaning: 'Cửu — trường tồn, vĩnh cửu' },
        { digit: 7, meaning: 'Thất — viên mãn, đầy đủ' },
        { digit: 3, meaning: 'Tam — tài lộc, phát triển' },
      ],
      expertNote: 'SIM cấp cao dành cho lãnh đạo, doanh chủ. Phù hợp giao dịch tài chính lớn.',
    },
  },
  {
    id: 's3', name: 'Phát Lộc Ngũ Quý', carrier: 'Viettel', prefix: '098', number: '0988 88 88 88',
    price: 89990000, data: 'Không giới hạn', call: 'Không giới hạn',
    tag: 'Ngũ quý', color: '#DC2626', img: 'V', element: 'Hỏa', sum: 9, simType: '5G eSIM',
    commission: 25,
    compatibleElements: ['Hỏa', 'Mộc'], compatibleAges: ['Đinh Sửu 1997', 'Kỷ Hợi 2019', 'Ất Mão 1975'],
    luanGiai: {
      tongNut: { value: 9, meaning: 'Số 9 — "Cửu" — biểu tượng quyền lực tột đỉnh, trường tồn vĩnh cửu. Trong Dịch học, 9 là số dương cực thịnh.' },
      nguHanh: { element: 'Hỏa', meaning: 'Mệnh Hỏa cường đại. Số 8 lặp 5 lần kích hoạt năng lượng dương đại phát.' },
      daiDep: { group: 'Ngũ Quý 88888', meaning: 'Ngũ quý 88888 — đỉnh cao trong dải SIM phong thủy. Bộ "Phát" lặp 5 lần đại biểu cho 5 yếu tố: Phú, Quý, Thọ, Khang, Ninh.' },
      digitMeanings: [
        { digit: 9, meaning: 'Cửu — quyền uy, trường tồn' },
        { digit: 8, meaning: 'Phát — phát đạt tột đỉnh' },
      ],
      expertNote: 'SIM tầm thượng lưu, biểu tượng địa vị. Đầu tư cho thương hiệu cá nhân và quan hệ cao cấp.',
    },
  },
  {
    id: 's4', name: 'Bình An Hợp Mệnh', carrier: 'Vinaphone', prefix: '091', number: '0911 26 36 86',
    price: 2990000, oldPrice: 3990000, data: '90GB/tháng', call: 'Miễn phí mọi mạng',
    tag: 'Hợp mệnh', color: '#0EA5E9', img: 'V', element: 'Thủy', sum: 5, simType: '4G physical',
    commission: 15,
    compatibleElements: ['Thủy', 'Kim'], compatibleAges: ['Giáp Tý 1984', 'Bính Dần 1986', 'Mậu Thìn 1988'],
    luanGiai: {
      tongNut: { value: 5, meaning: 'Số 5 — trung tâm Ngũ Hành, biểu trưng cho cân bằng và hòa hợp.' },
      nguHanh: { element: 'Thủy', meaning: 'Mệnh Thủy uyển chuyển, linh hoạt. Số hợp mệnh Thủy và Kim.' },
      daiDep: { group: 'Tiến cấp 26·36·86', meaning: 'Dải số tăng tiến đẹp 2-6, 3-6, 8-6 — tài lộc tăng theo thời gian, ổn định bền vững.' },
      digitMeanings: [
        { digit: 2, meaning: 'Nhị — cặp đôi, phụng sự' },
        { digit: 6, meaning: 'Lộc — tài lộc' },
        { digit: 3, meaning: 'Tam — phát triển' },
        { digit: 8, meaning: 'Phát — thịnh vượng' },
      ],
      expertNote: 'Phù hợp gia đình, người làm việc văn phòng cần ổn định tài chính lâu dài.',
    },
  },
  {
    id: 's5', name: 'Tài Lộc Tứ Quý', carrier: 'MobiFone', prefix: '090', number: '0903 6668 6668',
    price: 8990000, data: '120GB/tháng', call: 'Miễn phí',
    tag: 'Tứ quý', color: '#F59E0B', img: 'M', element: 'Thổ', sum: 7, simType: '5G eSIM',
    commission: 20,
    compatibleElements: ['Thổ', 'Hỏa'], compatibleAges: ['Mậu Ngọ 1978', 'Canh Thân 1980', 'Đinh Mão 1987'],
    luanGiai: {
      tongNut: { value: 7, meaning: 'Số 7 viên mãn, đầy đủ — kết hợp với dải lặp tạo cộng hưởng phong thủy mạnh.' },
      nguHanh: { element: 'Thổ', meaning: 'Mệnh Thổ vững chắc. SIM hợp mệnh Thổ và Hỏa (Hỏa sinh Thổ).' },
      daiDep: { group: 'Tứ Quý 6668·6668', meaning: '"6668" hai lần — Lộc-Lộc-Lộc-Phát lặp đôi. Tài lộc đến liên tiếp, sự nghiệp viên mãn.' },
      digitMeanings: [
        { digit: 6, meaning: 'Lộc — tài lộc' },
        { digit: 8, meaning: 'Phát — phát đạt' },
        { digit: 3, meaning: 'Tam — phát triển' },
        { digit: 0, meaning: 'Khởi đầu vẹn toàn' },
      ],
      expertNote: 'SIM phù hợp người làm bất động sản, đầu tư dài hạn.',
    },
  },
  {
    id: 's6', name: 'Quý Nhân Tam Hoa', carrier: 'Vinaphone', prefix: '091', number: '0916 79 79 79',
    price: 4990000, oldPrice: 6990000, data: 'Không giới hạn', call: 'Miễn phí',
    tag: 'Tam hoa', color: '#10B981', img: 'V', element: 'Mộc', sum: 9, simType: '5G eSIM',
    commission: 18,
    compatibleElements: ['Mộc', 'Thủy'], compatibleAges: ['Quý Hợi 1983', 'Ất Hợi 1995', 'Đinh Mão 1987'],
    luanGiai: {
      tongNut: { value: 9, meaning: 'Số 9 quyền uy, trường tồn — kết hợp Tam hoa Thần Tài 79 tạo nên cộng hưởng cực mạnh.' },
      nguHanh: { element: 'Mộc', meaning: 'Mệnh Mộc sinh trưởng, phát triển. SIM hợp mệnh Mộc và Thủy (Thủy sinh Mộc).' },
      daiDep: { group: 'Tam Hoa Thần Tài 79·79·79', meaning: 'Cặp số 79 (Thần Tài) lặp 3 lần — quý nhân phù trợ, đường tài lộc rộng mở, gặp nhiều may mắn.' },
      digitMeanings: [
        { digit: 7, meaning: 'Thất — viên mãn' },
        { digit: 9, meaning: 'Cửu — trường tồn' },
        { digit: 1, meaning: 'Nhất — khởi đầu, dẫn đầu' },
        { digit: 6, meaning: 'Lộc — tài lộc' },
      ],
      expertNote: 'SIM ưu tiên cho sales, freelancer cần thu hút quý nhân và khách hàng tốt.',
    },
  },
];

const MOCK_COURSES = [
  { id: 'c1', name: 'Phong thủy số học cơ bản', mentor: 'Master Nguyễn Hoàng', price: 499000, oldPrice: 799000, rating: 4.9, students: 2840, duration: '14 giờ', lessons: 42, level: 'Nhập môn', cover: '#DC2626', topic: 'Phong thủy', commission: 35 },
  { id: 'c2', name: 'Tư vấn SIM hợp tuổi · hợp mệnh', mentor: 'Master Trần Mai Linh', price: 1299000, rating: 4.8, students: 1568, duration: '20 giờ', lessons: 58, level: 'Nâng cao', cover: '#7C3AED', topic: 'Phong thủy', commission: 40 },
  { id: 'c3', name: 'Tư duy thịnh vượng & năng lượng tích cực', mentor: 'Coach Lê Quang Vũ', price: 599000, oldPrice: 899000, rating: 4.9, students: 4103, duration: '10 giờ', lessons: 24, level: 'Cơ bản', cover: '#EC4899', topic: 'Tư duy', commission: 35 },
  { id: 'c4', name: 'Tư duy phục vụ khách hàng đẳng cấp', mentor: 'Coach Phạm Đức Anh', price: 399000, rating: 4.7, students: 1823, duration: '8 giờ', lessons: 18, level: 'Cơ bản', cover: '#F59E0B', topic: 'Tư duy', commission: 30 },
  { id: 'c5', name: 'Khởi nghiệp kinh doanh SIM phong thủy', mentor: 'Nguyễn Thành Đạt', price: 999000, oldPrice: 1499000, rating: 4.8, students: 1245, duration: '16 giờ', lessons: 48, level: 'Trung cấp', cover: '#0EA5E9', topic: 'Kinh doanh', commission: 38 },
  { id: 'c6', name: 'Xây hệ thống đại lý F1·F2·F3', mentor: 'Trần Hoàng Việt', price: 1499000, rating: 4.9, students: 568, duration: '20 giờ', lessons: 52, level: 'Nâng cao', cover: '#16A34A', topic: 'Kinh doanh', commission: 40 },
];

// 3rd category — demonstrating "đa dạng sản phẩm" beyond SIM/khóa học
const MOCK_ACCESSORIES = [
  { id: 'a1', name: 'Vòng đá Thạch Anh Hồng', price: 890000, oldPrice: 1290000, color: '#EC4899', material: 'Thạch anh hồng', purpose: 'Tình duyên · gia đạo', element: 'Hỏa', commission: 22, image: '💎', tag: 'Bán chạy' },
  { id: 'a2', name: 'Tượng Tỳ Hưu Phong Thủy', price: 2490000, color: '#F59E0B', material: 'Đá thạch anh vàng', purpose: 'Chiêu tài · hộ thân', element: 'Thổ', commission: 25, image: '🦁', tag: 'Cao cấp' },
  { id: 'a3', name: 'Vòng tay Hổ Phách', price: 1990000, oldPrice: 2490000, color: '#B45309', material: 'Hổ phách Baltic', purpose: 'Sức khỏe · bình an', element: 'Thổ', commission: 20, image: '📿', tag: 'Limited' },
  { id: 'a4', name: 'Vòng cổ Mặt Phật Bản Mệnh', price: 1290000, color: '#7C3AED', material: 'Bạc 925 + đá tự nhiên', purpose: 'Hộ mệnh · trừ tà', element: 'Kim', commission: 22, image: '🧿', tag: 'Phổ biến' },
];

// helper: estimated commission for current agent on a given product
// price * commission% — for prototype, simple F1 calc
function estCommission(item) {
  if (!item || !item.commission) return 0;
  return Math.round(item.price * item.commission / 100);
}

function HomeScreen({ nav, user, brand, homeHero, addToCart, cartCount }) {
  const b = getBrand(brand);
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 11) return 'Chào buổi sáng';
    if (h < 14) return 'Chào buổi trưa';
    if (h < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  })();

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F6FB', overflow: 'auto', paddingBottom: 100 }} className="scroll-area anim-fade">
      {/* iOS status bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 8 }}>
        <IOSStatusBar dark={homeHero !== 'minimal'}/>
      </div>

      {/* Hero variants */}
      {homeHero === 'gradient' && (
        <div className="screen-hero" style={{
          position: 'relative',
          background: `linear-gradient(160deg, ${b.grad[0]} 0%, ${b.grad[1]} 100%)`,
          color: '#fff', padding: '64px 18px 26px', borderRadius: '0 0 28px 28px',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }}/>
          <div style={{ position: 'absolute', bottom: -50, left: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={user.name} size={42}/>
              <div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>{greeting} 👋</div>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.2 }}>{user.name}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="tap" style={btnGlass}><Ic.Bell s={20} c="#fff"/><span style={dotPing}/></button>
              <button className="tap" style={btnGlass} onClick={() => nav.push('cart')}>
                <Ic.Cart s={20} c="#fff"/>
                {cartCount > 0 && <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16, borderRadius: 8, background: '#EF4444', color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{cartCount}</span>}
              </button>
            </div>
          </div>

          {/* wallet pill */}
          <div onClick={() => nav.push('wallet')} className="tap" style={{
            marginTop: 22, padding: 16, borderRadius: 20,
            background: 'rgba(255,255,255,0.16)',
            border: '1px solid rgba(255,255,255,0.22)',
            backdropFilter: 'blur(14px)', position: 'relative',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ic.Wallet s={22} c="#fff"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, opacity: 0.8, fontWeight: 600 }}>Số dư ví & hoa hồng tháng này</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
                <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>{vnd(user.balance)}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#A7F3D0', display: 'inline-flex', alignItems: 'center', gap: 2 }}><Ic.ArrowUp s={10} c="#A7F3D0"/>+24%</span>
              </div>
            </div>
            <Ic.Chevron s={16} c="#fff"/>
          </div>
        </div>
      )}

      {homeHero === 'stats' && (
        <div className="screen-hero" style={{ padding: '64px 18px 16px', background: '#fff', borderRadius: '0 0 28px 28px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={user.name} size={42}/>
              <div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{greeting} 👋</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{user.name}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="tap" style={{...btnGlass, background: '#F1F5F9', position: 'relative'}}><Ic.Bell s={20} c="#0F172A"/></button>
              <button className="tap" style={{...btnGlass, background: '#F1F5F9', position: 'relative'}} onClick={() => nav.push('cart')}>
                <Ic.Cart s={20} c="#0F172A"/>
                {cartCount > 0 && <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16, borderRadius: 8, background: '#EF4444', color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{cartCount}</span>}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 18 }}>
            <div style={{ padding: 14, borderRadius: 16, background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, color: '#fff' }}>
              <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 600 }}>Hoa hồng tháng</div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.4, marginTop: 4 }}>{vnd(user.balance)}</div>
              <Spark data={[3,4,3.5,5,4,6,7]} color="#fff" width={90} height={28}/>
            </div>
            <div style={{ padding: 14, borderRadius: 16, background: '#F1F5F9' }}>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Team & đơn tháng</div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.4, color: '#0F172A', marginTop: 4 }}>32 <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>thành viên</span></div>
              <div style={{ fontSize: 12, color: '#15803D', fontWeight: 700, marginTop: 6 }}>+58 đơn hợp lệ</div>
            </div>
          </div>
        </div>
      )}

      {homeHero === 'minimal' && (
        <div className="screen-hero" style={{ padding: '60px 18px 12px', background: '#F4F6FB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{greeting},</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', letterSpacing: -0.6 }}>{user.name.split(' ').slice(-1)[0]}.</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="tap" style={{...btnGlass, background: '#fff'}}><Ic.Bell s={20} c="#0F172A"/></button>
              <button className="tap" style={{...btnGlass, background: '#fff', position: 'relative'}} onClick={() => nav.push('cart')}>
                <Ic.Cart s={20} c="#0F172A"/>
                {cartCount > 0 && <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16, borderRadius: 8, background: b.solid, color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div style={{ padding: '16px 18px 4px' }}>
        <div onClick={() => nav.push('search')} className="tap" style={{
          height: 48, padding: '0 16px', background: '#fff',
          borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12,
          border: '1px solid #E2E8F0', color: '#94A3B8',
        }}>
          <Ic.Search s={20} c="#94A3B8"/>
          <span style={{ fontSize: 14 }}>Tìm SIM hợp tuổi · mệnh · tổng nút…</span>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '14px 18px 4px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          { icon: <Ic.Sim s={22}/>, label: 'Mua SIM', c: '#3B82F6', go: () => nav.reset('products', { seg: 'sim' }) },
          { icon: <Ic.Book s={22}/>, label: 'Khóa học', c: '#8B5CF6', go: () => nav.reset('products', { seg: 'course' }) },
          { icon: <Ic.Agent s={22}/>, label: 'Đại lý', c: '#10B981', go: () => nav.push('agent-packages') },
          { icon: <Ic.Wallet s={22}/>, label: 'Nạp/Rút', c: '#F59E0B', go: () => nav.push('wallet') },
        ].map((a) => (
          <button key={a.label} onClick={a.go} className="tap" style={{
            background: 'none', border: 'none', padding: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 18,
              background: `${a.c}15`, color: a.c,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{a.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#0F172A' }}>{a.label}</div>
          </button>
        ))}
      </div>

      {/* Promo banner */}
      <div style={{ padding: '16px 18px 6px' }}>
        <div onClick={() => nav.push('agent-packages')} className="tap" style={{
          padding: 18, borderRadius: 20, position: 'relative', overflow: 'hidden',
          background: `linear-gradient(110deg, #0F172A 0%, #1E293B 100%)`,
          color: '#fff',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 140, height: 140, borderRadius: '50%', background: `${b.solid}30`, filter: 'blur(20px)' }}/>
          <Badge color="amber" style={{ position: 'relative' }}>🔥 GIẢM 30%</Badge>
          <div style={{ fontSize: 18, fontWeight: 800, marginTop: 8, letterSpacing: -0.3, lineHeight: 1.25, position: 'relative' }}>Trở thành đại lý<br/>F1 — kiếm 25% hoa hồng</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, position: 'relative' }}>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Xem 3 gói đại lý</span>
            <Ic.Chevron s={14} c="#fff"/>
          </div>
        </div>
      </div>

      {/* SIM section */}
      <div style={{ marginTop: 14 }}>
        <SectionHead title="SIM nổi bật" action="Xem tất cả" onAction={() => nav.reset('products', { seg: 'sim' })}/>
        <div style={{ display: 'flex', gap: 12, padding: '0 18px 4px', overflowX: 'auto', scrollbarWidth: 'none' }} className="scroll-area">
          {MOCK_SIMS.slice(0,3).map((s) => (
            <div key={s.id} onClick={() => nav.push('sim-detail', { item: s })} className="tap" style={{ width: 200, flexShrink: 0 }}>
              <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: 110, background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`, color: '#fff', padding: 14, position: 'relative' }}>
                  <Badge color="amber" style={{ position: 'absolute', top: 10, right: 10 }}>{s.tag}</Badge>
                  <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 700, letterSpacing: 1 }}>{s.carrier.toUpperCase()}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, marginTop: 16, letterSpacing: -0.3 }}>{s.number}</div>
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{s.data}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: b.solid }}>{vnd(s.price)}</span>
                    {s.oldPrice && <span style={{ fontSize: 11, color: '#94A3B8', textDecoration: 'line-through' }}>{vnd(s.oldPrice)}</span>}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Courses section */}
      <div style={{ marginTop: 18 }}>
        <SectionHead title="Khóa học bán chạy" action="Xem tất cả" onAction={() => nav.reset('products', { seg: 'course' })}/>
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MOCK_COURSES.slice(0,2).map((c) => (
            <Card key={c.id} onClick={() => nav.push('course-detail', { item: c })} style={{ padding: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{
                width: 84, height: 84, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, ${c.cover}, ${c.cover}88)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', position: 'relative',
              }}>
                <Ic.Play s={26} c="#fff"/>
                <div style={{ position: 'absolute', bottom: 6, left: 6, padding: '2px 6px', background: 'rgba(0,0,0,0.4)', borderRadius: 5, fontSize: 9, fontWeight: 700 }}>{c.duration}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Badge color="purple">{c.level}</Badge>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginTop: 4, lineHeight: 1.3 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>{c.mentor} · {c.lessons} bài</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 11, color: '#64748B' }}>
                    <Ic.Star s={12} f="#F59E0B"/><strong style={{ color: '#0F172A' }}>{c.rating}</strong><span>· {c.students.toLocaleString()}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: b.solid }}>{vnd(c.price)}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Agent quick CTA */}
      <div style={{ padding: '16px 18px 0' }}>
        <Card style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center', background: b.soft, border: `1px solid ${b.solid}20` }} onClick={() => user.isAgent ? nav.push('agent-dashboard') : nav.push('agent-packages')}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ic.Crown s={22} c="#fff"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{user.isAgent ? 'Vào dashboard đại lý' : 'Trở thành đại lý SimPlus'}</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{user.isAgent ? `Cấp ${user.agentTier} · ${user.team} thành viên team` : 'Nhận hoa hồng F1·F2·F3 đến 25%'}</div>
          </div>
          <Ic.Chevron s={16} c={b.solid}/>
        </Card>
      </div>
    </div>
  );
}


Object.assign(window, { HomeScreen, MOCK_SIMS, MOCK_COURSES, MOCK_ACCESSORIES, calcTongNut, estCommission });
