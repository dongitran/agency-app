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
  const [user, setUser] = useState({ name: 'Nguyễn Quốc Anh', phone: '0901 234 567', email: 'quocanh@gmail.com', balance: 12480000, isAgent: true, agentTier: 'Bạc', refCode: 'QA2026' });
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
  const onLogout = () => { setAuth(false); nav.reset('welcome'); showToast('Đã đăng xuất'); };

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
    const common = { nav, brand, user, setUser, cart, setCart, addToCart, showToast, tweaks };
    switch (name) {
      case 'welcome': return <WelcomeScreen {...common} onComplete={() => nav.replace('login')}/>;
      case 'login': return <LoginScreen {...common} onLogin={onLogin}/>;
      case 'signup': return <SignupScreen {...common} onLogin={onLogin}/>;
      case 'home': return <HomeScreen {...common} homeHero={tweaks.homeHero}/>;
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
      case 'agent-packages': return <AgentPackagesScreen {...common}/>;
      case 'agent-dashboard': return <AgentDashboardScreen {...common} agentLayout={tweaks.agentLayout}/>;
      case 'agent-team': return <AgentTeamScreen {...common}/>;
      case 'agent-referral': return <AgentReferralScreen {...common}/>;
      case 'agent-history': return <AgentHistoryScreen {...common}/>;
      case 'wallet': return <WalletScreen {...common}/>;
      case 'shipping': return <ShippingScreen {...common} {...params}/>;
      default: return <HomeScreen {...common} homeHero={tweaks.homeHero}/>;
    }
  };

  const showBottomNav = auth && ['home', 'products', 'tuvi', 'orders', 'profile'].includes(nav.current.name);
  const onTabChange = (k) => { setTab(k); nav.reset(k); };

  return (
    <>
      <IOSDevice width={402} height={874}>
        <div style={{ position: 'absolute', inset: 0, background: '#fff', overflow: 'hidden', zIndex: 5 }}>
          {renderScreen()}
          {showBottomNav && <BottomNav active={tab} onChange={onTabChange} brand={brand}/>}
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
        <TweakSection label="Style trang chủ">
          <TweakRadio
            label="Hero banner"
            value={tweaks.homeHero}
            onChange={(v) => setTweak('homeHero', v)}
            options={[
              { value: 'gradient', label: 'Gradient' },
              { value: 'mesh', label: 'Mesh' },
              { value: 'minimal', label: 'Minimal' },
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
