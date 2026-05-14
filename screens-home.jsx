// screens-home.jsx — Mock data + thin router that picks HomeAgent vs HomeConsumer

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

// Expert consultations — treat as a product type (each package has a price/commission).
// Used by HomeConsumerScreen, the Experts list/detail screens, and the Products tab.
const MOCK_EXPERTS = [
  {
    id: 'e1',
    name: 'Master Nguyễn Hoàng',
    title: 'Chuyên gia phong thủy số học',
    bio: 'Hơn 18 năm tư vấn SIM phong thủy, mệnh học, dịch học. Đào tạo hơn 200 đại lý cấp cao trên toàn quốc. Từng cộng tác với nhiều tập đoàn lớn để chọn số phong thủy cho lãnh đạo.',
    exp: '18 năm', cases: '5.2K', rating: 4.95, reviews: 1842,
    avatar: 'NH', color: '#DC2626',
    specialties: ['SIM phong thủy', 'Tổng nút · Ngũ hành', 'Mệnh & Bát Tự', 'Tư vấn doanh nhân'],
    languages: ['Tiếng Việt'],
    packages: [
      { id: 'pkg-quick', name: 'Tư vấn nhanh', duration: '15 phút', price: 179000, format: 'Video call · Zalo',                  tag: null,        commission: 20 },
      { id: 'pkg-deep',  name: 'Tư vấn chuyên sâu', duration: '60 phút', price: 599000, format: 'Video call · Zalo / Google Meet', tag: 'Bán chạy', commission: 25 },
      { id: 'pkg-tuvi',  name: 'Lá số Tử vi đầy đủ', duration: '90 phút + báo cáo PDF', price: 1290000, format: 'Video call + email báo cáo', tag: 'Cao cấp', commission: 30 },
    ],
    slots: ['Hôm nay 14:00', 'Hôm nay 16:30', 'Mai 09:00', 'Mai 14:00', 'T5 10:00', 'T5 15:00'],
  },
  {
    id: 'e2',
    name: 'Master Trần Mai Linh',
    title: 'Tư vấn SIM hợp tuổi · hợp mệnh',
    bio: '12 năm chuyên sâu về SIM phong thủy và tử vi đẩu số. Đã tư vấn cho hàng ngàn doanh nhân, gia đình và người làm sales. Thành thạo tiếng Anh, có thể tư vấn cho khách Việt kiều.',
    exp: '12 năm', cases: '3.8K', rating: 4.92, reviews: 1264,
    avatar: 'TL', color: '#7C3AED',
    specialties: ['SIM hợp tuổi', 'Tử vi đẩu số', 'Tư vấn doanh nhân', 'English consult'],
    languages: ['Tiếng Việt', 'English'],
    packages: [
      { id: 'pkg-quick',  name: 'Tư vấn nhanh', duration: '15 phút', price: 179000, format: 'Video call · Zalo',                  tag: null,        commission: 20 },
      { id: 'pkg-deep',   name: 'Tư vấn chuyên sâu', duration: '60 phút', price: 799000, format: 'Video call · Zalo / Google Meet', tag: 'Bán chạy', commission: 25 },
    ],
    slots: ['Mai 10:00', 'Mai 16:00', 'T5 09:00', 'T6 14:00'],
  },
  {
    id: 'e3',
    name: 'Coach Lê Quang Vũ',
    title: 'Tư duy thịnh vượng · năng lượng',
    bio: 'Mentor coaching cho hơn 8.000 học viên trong 8 năm. Đào tạo về tư duy bán hàng, thu hút khách hàng tốt và năng lượng tích cực cho người làm sales/đại lý.',
    exp: '8 năm', cases: '2.1K', rating: 4.88, reviews: 956,
    avatar: 'LV', color: '#10B981',
    specialties: ['Coaching kinh doanh', 'Năng lượng tích cực', 'Sales mindset'],
    languages: ['Tiếng Việt'],
    packages: [
      { id: 'pkg-quick',   name: 'Coaching mở đầu', duration: '30 phút', price: 149000,    format: 'Video call · Zoom',  tag: null,        commission: 20 },
      { id: 'pkg-monthly', name: 'Coaching 1-1 (1 tháng)', duration: '4 buổi · 60 phút/buổi', price: 4990000, format: 'Video call · Zoom', tag: 'Cao cấp', commission: 28 },
    ],
    slots: ['Mai 19:00', 'T5 20:00', 'T6 19:30', 'T7 09:00'],
  },
];

// helper: estimated commission for current agent on a given product
function estCommission(item) {
  if (!item || !item.commission) return 0;
  return Math.round(item.price * item.commission / 100);
}

// Router — picks the right home for the user. Two audiences with very
// different mental models (consumer = discover, agent = perform), so they
// each get their own screen rather than one home with conditionals scattered.
function HomeScreen(props) {
  if (props.user?.isAgent) return <HomeAgentScreen {...props}/>;
  return <HomeConsumerScreen {...props}/>;
}

Object.assign(window, { HomeScreen, MOCK_SIMS, MOCK_COURSES, MOCK_ACCESSORIES, MOCK_EXPERTS, calcTongNut, estCommission });
