// app.jsx — Main app, router, bottom nav

const { useState, useEffect } = React;

function useNav(initial) {
  const [stack, setStack] = useState([{ name: initial, params: {} }]);
  return {
    current: stack[stack.length - 1],
    stack,
    push: (name, params = {}) => setStack(s => [...s, { name, params }]),
    pop: () => setStack(s => s.length > 1 ? s.slice(0, -1) : s),
    replace: (name, params = {}) => setStack(s => [...s.slice(0, -1), { name, params }]),
    reset: (name, params = {}) => setStack([{ name, params }]),
  };
}

function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div key={msg.id} className="toast" style={{ position: 'absolute', bottom: 110, left: '50%', transform: 'translateX(-50%)', padding: '10px 16px', borderRadius: 999, background: 'rgba(15,23,42,0.95)', color: '#fff', fontSize: 13, fontWeight: 600, zIndex: 100, backdropFilter: 'blur(12px)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', display: 'flex', gap: 8, alignItems: 'center' }}>
      <Ic.Check s={14} c="#10B981" w={3}/> {msg.text}
    </div>
  );
}

// Map between url hashes and the isAgent boolean.
// `/agency-app/#dai-ly` lands directly on the agent home — handy for client demos
// where the in-app Tweaks panel is hidden on the deployed site.
const ROLE_HASHES = {
  agent: ['agent', 'dai-ly', 'dailly', 'daily'],
  consumer: ['consumer', 'nguoi-dung', 'nguoidung', 'user'],
};
function readRoleHash() {
  const h = (window.location.hash || '').toLowerCase().replace(/^#/, '');
  if (ROLE_HASHES.agent.includes(h)) return 'agent';
  if (ROLE_HASHES.consumer.includes(h)) return 'consumer';
  return null;
}
function writeRoleHash(isAgent) {
  const want = isAgent ? '#dai-ly' : '#nguoi-dung';
  if (window.location.hash !== want) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search + want);
  }
}

function DemoRoleSwitcher({ isAgent, onChange }) {
  const opts = [
    { v: false, l: 'Người dùng' },
    { v: true,  l: 'Đại lý' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 100, right: 12, zIndex: 70,
      display: 'flex', alignItems: 'center', gap: 2,
      padding: 3,
      background: 'rgba(15,23,42,0.78)',
      backdropFilter: 'blur(14px)',
      border: '1px solid rgba(255,255,255,0.16)',
      borderRadius: 999,
      boxShadow: '0 6px 18px rgba(0,0,0,0.22)',
    }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.6)', padding: '0 6px 0 9px', letterSpacing: 0.4, display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 12 }}>🎭</span>DEMO
      </span>
      {opts.map((opt) => (
        <button key={String(opt.v)} onClick={() => onChange(opt.v)} className="tap" style={{
          background: isAgent === opt.v ? '#fff' : 'transparent',
          color: isAgent === opt.v ? '#0F172A' : 'rgba(255,255,255,0.82)',
          border: 'none', borderRadius: 999,
          padding: '5px 10px',
          fontSize: 10.5, fontWeight: 700, letterSpacing: -0.1,
        }}>{opt.l}</button>
      ))}
    </div>
  );
}

function BottomNav({ active, onChange, brand }) {
  const b = getBrand(brand);
  const tabs = [
    { k: 'home', l: 'Trang chủ', i: Ic.Home },
    { k: 'products', l: 'Sản phẩm', i: Ic.Grid },
    { k: 'tuvi', l: 'Tử vi', i: Ic.Sparkles },
    { k: 'orders', l: 'Đơn hàng', i: Ic.Cart },
    { k: 'profile', l: 'Tôi', i: Ic.User },
  ];
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 88, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderTop: '1px solid #E2E8F0', display: 'flex', paddingBottom: 22, zIndex: 50 }}>
      {tabs.map(t => {
        const isActive = active === t.k;
        return (
          <button key={t.k} onClick={() => onChange(t.k)} className="tap" style={{ flex: 1, border: 'none', background: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '8px 4px', color: isActive ? b.solid : '#94A3B8', position: 'relative' }}>
            {isActive && <div style={{ position: 'absolute', top: 0, width: 28, height: 3, borderRadius: '0 0 3px 3px', background: b.solid }}/>}
            <t.i s={22} c={isActive ? b.solid : '#94A3B8'} w={isActive ? 2.4 : 2}/>
            <div style={{ fontSize: 10, fontWeight: isActive ? 700 : 500 }}>{t.l}</div>
          </button>
        );
      })}
    </div>
  );
}

const BRAND_HEX = { blue: '#2563EB', purple: '#7C3AED', green: '#10B981', red: '#DC2626', orange: '#EA580C', slate: '#0F172A' };
const HEX_BRAND = Object.fromEntries(Object.entries(BRAND_HEX).map(([k, v]) => [v, k]));

function AppShell() {
  const [tweaks, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);
  const brand = tweaks.brand;

  const [auth, setAuth] = useState(true);
  // Default to consumer on the public site — `/agency-app/#dai-ly` opts into agent.
  // (The Tweaks panel only opens inside the editor, so URL is the only switch a
  // visitor on dongitran.github.io has.)
  const initialRole = typeof window !== 'undefined' ? readRoleHash() : null;
  const [user, setUser] = useState({ name: 'Nguyễn Quốc Anh', phone: '0901 234 567', email: 'quocanh@gmail.com', balance: 12480000, isAgent: initialRole === 'agent', agentTier: 'Bạc', refCode: 'QA2026' });
  const [cart, setCart] = useState([]);
  const [tab, setTab] = useState('home');
  const nav = useNav(auth ? 'home' : 'welcome');
  const [toast, setToast] = useState(null);

  const showToast = (text) => setToast({ id: Date.now(), text });
  useEffect(() => { if (toast) { const id = setTimeout(() => setToast(null), 2700); return () => clearTimeout(id); }}, [toast]);

  useEffect(() => {
    const cur = nav.current.name;
    if (['home', 'products', 'tuvi', 'orders', 'profile'].includes(cur)) setTab(cur);
  }, [nav.current.name]);

  const onLogin = (u = {}) => { setAuth(true); setUser({ ...user, ...u }); nav.reset('home'); };
  const onLogout = () => { setAuth(false); nav.reset('welcome'); };

  const addToCart = (item) => {
    setCart(c => {
      const ex = c.find(x => x.id === item.id && x.type === item.type);
      if (ex) return c.map(x => x === ex ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...item, qty: 1 }];
    });
    showToast('Đã thêm vào giỏ');
  };

  const renderScreen = () => {
    const { name, params } = nav.current;
    const cartCount = cart.reduce((sum, x) => sum + (x.qty || 1), 0);
    const common = { nav, brand, user, setUser, cart, setCart, addToCart, showToast, tweaks, cartCount };
    switch (name) {
      case 'welcome': return <WelcomeScreen {...common} onComplete={() => nav.replace('login')}/>;
      case 'login': return <LoginScreen {...common} onLogin={onLogin}/>;
      case 'forgot-password': return <ForgotPasswordScreen {...common}/>;
      case 'signup': return <SignupScreen {...common} onLogin={onLogin}/>;
      case 'legal': return <LegalScreen {...common} {...params}/>;
      case 'home': return <HomeScreen {...common}/>;
      case 'products': return <ProductsScreen {...common} cardStyle={tweaks.cardStyle} user={user}/>;
      case 'tuvi': return <TuViScreen {...common}/>;
      case 'sim-detail': return <SimDetailScreen {...common} item={params.item}/>;
      case 'course-detail': return <CourseDetailScreen {...common} item={params.item}/>;
      case 'cart': return <CartScreen {...common}/>;
      case 'checkout': return <CheckoutQRScreen {...common} {...params}/>;
      case 'orders': return <OrdersScreen {...common}/>;
      case 'order-detail': return <OrderDetailScreen {...common} order={params.order}/>;
      case 'profile': return <ProfileScreen {...common} onLogout={onLogout}/>;
      case 'profile-edit': return <ProfileEditScreen {...common}/>;
      case 'addresses': return <AddressBookScreen {...common}/>;
      case 'payment-methods': return <PaymentMethodScreen {...common}/>;
      case 'change-password': return <ChangePasswordScreen {...common}/>;
      case 'contracts': return <ContractsScreen {...common}/>;
      case 'agent-packages': return <AgentPackagesScreen {...common}/>;
      case 'agent-dashboard': return <AgentDashboardScreen {...common} agentLayout={tweaks.agentLayout}/>;
      case 'agent-team': return <AgentTeamScreen {...common}/>;
      case 'agent-referral': return <AgentReferralScreen {...common}/>;
      case 'agent-history': return <AgentHistoryScreen {...common}/>;
      case 'wallet': return <WalletScreen {...common}/>;
      case 'withdrawal-detail': return <WithdrawalDetailScreen {...common} request={params.request}/>;
      case 'shipping': return <ShippingScreen {...common} {...params}/>;
      case 'experts': return <ExpertsListScreen {...common}/>;
      case 'expert-detail': return <ExpertDetailScreen {...common} item={params.item}/>;
      default: return <HomeScreen {...common} homeHero={tweaks.homeHero}/>;
    }
  };

  const showBottomNav = auth && ['home', 'products', 'tuvi', 'orders', 'profile'].includes(nav.current.name);
  const onTabChange = (k) => { setTab(k); nav.reset(k); };

  const switchRole = (isAgent) => {
    setUser({ ...user, isAgent });
    writeRoleHash(isAgent);
  };

  // React to external hash changes (e.g. user pastes a different URL or hits back).
  useEffect(() => {
    const onHash = () => {
      const role = readRoleHash();
      if (role && (role === 'agent') !== user.isAgent) {
        setUser((u) => ({ ...u, isAgent: role === 'agent' }));
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [user.isAgent]);

  return (
    <>
      <IOSDevice width={402} height={874}>
        <div style={{ position: 'absolute', inset: 0, background: '#fff', overflow: 'hidden', zIndex: 5 }}>
          {renderScreen()}
          {showBottomNav && <BottomNav active={tab} onChange={onTabChange} brand={brand}/>}
          {auth && <DemoRoleSwitcher isAgent={user.isAgent} onChange={switchRole}/>}
          <Toast msg={toast}/>
        </div>
      </IOSDevice>

      <TweaksPanel>
        <TweakSection label="Màu thương hiệu">
          <TweakColor
            label="Brand"
            value={BRAND_HEX[brand] || '#2563EB'}
            onChange={(hex) => setTweak('brand', HEX_BRAND[hex] || 'blue')}
            options={['#2563EB','#7C3AED','#10B981','#DC2626','#EA580C','#0F172A']}
          />
        </TweakSection>
        <TweakSection label="Vai trò người dùng">
          <TweakRadio
            label="Trang chủ"
            value={user.isAgent ? 'agent' : 'consumer'}
            onChange={(v) => switchRole(v === 'agent')}
            options={[
              { value: 'consumer', label: 'Người dùng' },
              { value: 'agent', label: 'Đại lý' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Card sản phẩm">
          <TweakRadio
            label="Layout"
            value={tweaks.cardStyle}
            onChange={(v) => setTweak('cardStyle', v)}
            options={[
              { value: 'rich', label: 'Rich' },
              { value: 'list', label: 'List' },
              { value: 'grid', label: 'Grid' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Dashboard đại lý">
          <TweakRadio
            label="Layout"
            value={tweaks.agentLayout}
            onChange={(v) => setTweak('agentLayout', v)}
            options={[
              { value: 'stats', label: 'Stats' },
              { value: 'compact', label: 'Compact' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Demo">
          <TweakButton onClick={() => { auth ? onLogout() : onLogin(); }}>
            {auth ? 'Đăng xuất' : 'Đăng nhập nhanh'}
          </TweakButton>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppShell/>);
