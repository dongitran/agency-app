// ui.jsx — shared UI primitives & color tokens

// Brand palettes — each entry: gradient + solid + accent + softBg
const BRANDS = {
  blue:   { name: 'Indigo',  grad: ['#2563EB', '#7C3AED'], solid: '#2563EB', soft: '#EEF2FF', text: '#1E3A8A', accent2: '#06B6D4' },
  teal:   { name: 'Teal',    grad: ['#0EA5E9', '#10B981'], solid: '#0EA5E9', soft: '#ECFEFF', text: '#0F4C5C', accent2: '#22D3EE' },
  red:    { name: 'Ruby',    grad: ['#E11D48', '#F97316'], solid: '#E11D48', soft: '#FEF2F2', text: '#7F1D1D', accent2: '#F59E0B' },
  violet: { name: 'Violet',  grad: ['#7C3AED', '#EC4899'], solid: '#7C3AED', soft: '#F5F3FF', text: '#4C1D95', accent2: '#A855F7' },
};

const getBrand = (key) => BRANDS[key] || BRANDS.blue;

// Format VND
const vnd = (n) => new Intl.NumberFormat('vi-VN').format(Math.round(n)) + 'đ';
const vndShort = (n) => {
  if (n >= 1e9) return (n/1e9).toFixed(1).replace(/\.0$/,'') + 'tỷ';
  if (n >= 1e6) return (n/1e6).toFixed(1).replace(/\.0$/,'') + 'tr';
  if (n >= 1e3) return (n/1e3).toFixed(0) + 'k';
  return String(n);
};

// Button primary — uses brand gradient
function PrimaryButton({ children, onClick, disabled, fullWidth, size='lg', brand, style={} }) {
  const b = getBrand(brand);
  const heights = { sm: 36, md: 44, lg: 52 };
  return (
    <button className="tap" disabled={disabled} onClick={onClick} style={{
      height: heights[size], padding: '0 22px',
      width: fullWidth ? '100%' : 'auto',
      borderRadius: 16, border: 'none', color: '#fff',
      fontSize: size==='lg' ? 16 : 14, fontWeight: 700,
      background: disabled ? '#CBD5E1' : `linear-gradient(135deg, ${b.grad[0]} 0%, ${b.grad[1]} 100%)`,
      boxShadow: disabled ? 'none' : `0 8px 20px -8px ${b.grad[0]}99, 0 2px 0 0 rgba(255,255,255,0.18) inset`,
      letterSpacing: -0.1, opacity: disabled ? 0.7 : 1,
      ...style,
    }}>{children}</button>
  );
}

function GhostButton({ children, onClick, brand, fullWidth, style={} }) {
  const b = getBrand(brand);
  return (
    <button className="tap" onClick={onClick} style={{
      height: 48, padding: '0 18px', width: fullWidth ? '100%' : 'auto',
      borderRadius: 14, border: `1.5px solid ${b.solid}33`, color: b.solid,
      background: '#fff', fontSize: 15, fontWeight: 600, ...style,
    }}>{children}</button>
  );
}

// Pill/chip
function Chip({ children, active, onClick, brand, style={} }) {
  const b = getBrand(brand);
  return (
    <button className="tap" onClick={onClick} style={{
      height: 34, padding: '0 14px', borderRadius: 999, border: 'none',
      background: active ? b.solid : '#F1F5F9',
      color: active ? '#fff' : '#475569',
      fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
      ...style,
    }}>{children}</button>
  );
}

// Bottom-aligned action bar (fixed inside phone)
function ActionBar({ children }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      padding: '14px 18px calc(28px + env(safe-area-inset-bottom))',
      background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 30%)',
      display: 'flex', gap: 10, alignItems: 'center', zIndex: 5,
    }}>{children}</div>
  );
}

// Header — back + title + trailing
function ScreenHeader({ title, onBack, trailing, subtitle, transparent=false, dark=false }) {
  return (
    <div style={{
      background: transparent ? 'transparent' : '#fff',
      borderBottom: transparent ? 'none' : '1px solid #F1F5F9',
      position: 'sticky', top: 0, zIndex: 10,
      color: dark ? '#fff' : '#0F172A',
    }}>
      <IOSStatusBar dark={dark}/>
      <div style={{
        padding: '6px 16px 12px', display: 'flex', alignItems: 'center', gap: 12,
      }}>
        {onBack && (
          <button className="tap" onClick={onBack} style={{
            width: 38, height: 38, borderRadius: 12, border: 'none',
            background: dark ? 'rgba(255,255,255,0.14)' : '#F1F5F9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: dark ? '#fff' : '#0F172A',
          }}><Ic.Back /></button>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.2, lineHeight: 1.2 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: dark ? 'rgba(255,255,255,0.7)' : '#64748B', marginTop: 2 }}>{subtitle}</div>}
        </div>
        {trailing}
      </div>
    </div>
  );
}

// Card
function Card({ children, style={}, onClick }) {
  return (
    <div className={onClick ? 'tap' : ''} onClick={onClick} style={{
      background: '#fff', borderRadius: 20,
      boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 8px 24px -16px rgba(15,23,42,0.12)',
      ...style,
    }}>{children}</div>
  );
}

// Section heading
function SectionHead({ title, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 18px 10px' }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', letterSpacing: -0.2 }}>{title}</div>
      {action && <button onClick={onAction} className="tap" style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#64748B', padding: 0 }}>{action}</button>}
    </div>
  );
}

// Input
function Input({ value, onChange, placeholder, type='text', icon, error, suffix }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        height: 52, padding: '0 14px',
        background: '#F8FAFC', border: `1.5px solid ${error ? '#EF4444' : focus ? '#2563EB' : '#E2E8F0'}`,
        borderRadius: 14, transition: 'border-color .15s',
      }}>
        {icon && <span style={{ color: '#94A3B8', display: 'flex' }}>{icon}</span>}
        <input
          type={type} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: 'none', background: 'transparent', outline: 'none',
            fontSize: 15, color: '#0F172A', minWidth: 0,
          }}
        />
        {suffix}
      </div>
      {error && <div style={{ fontSize: 12, color: '#EF4444', marginTop: 6, paddingLeft: 4 }}>{error}</div>}
    </div>
  );
}

// Badge
function Badge({ children, color='blue', style={} }) {
  const palettes = {
    blue:   { bg: '#DBEAFE', fg: '#1D4ED8' },
    green:  { bg: '#DCFCE7', fg: '#15803D' },
    amber:  { bg: '#FEF3C7', fg: '#B45309' },
    red:    { bg: '#FEE2E2', fg: '#B91C1C' },
    purple: { bg: '#EDE9FE', fg: '#6D28D9' },
    slate:  { bg: '#F1F5F9', fg: '#475569' },
    teal:   { bg: '#CCFBF1', fg: '#0F766E' },
  };
  const p = palettes[color] || palettes.blue;
  return <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '3px 9px', borderRadius: 999,
    background: p.bg, color: p.fg, fontSize: 11, fontWeight: 700,
    letterSpacing: 0.1, ...style,
  }}>{children}</span>;
}

// Avatar
function Avatar({ name, size=40, color, src }) {
  const initial = (name||'?').split(' ').slice(-1)[0][0].toUpperCase();
  const colors = ['#2563EB','#7C3AED','#EC4899','#F59E0B','#10B981','#0EA5E9','#EF4444'];
  const c = color || colors[initial.charCodeAt(0) % colors.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: size/2,
      background: src ? `url(${src}) center/cover` : `linear-gradient(135deg, ${c}, ${c}dd)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size*0.4, flexShrink: 0,
    }}>{!src && initial}</div>
  );
}

// Toast
function Toast({ message, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(() => onDone(), 2600);
    return () => clearTimeout(t);
  }, [message]);
  if (!message) return null;
  return (
    <div className="toast" style={{
      position: 'absolute', top: 80, left: '50%',
      background: '#0F172A', color: '#fff', padding: '11px 18px',
      borderRadius: 999, fontSize: 13, fontWeight: 600,
      zIndex: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      maxWidth: '85%', textAlign: 'center',
    }}>{message}</div>
  );
}

// Sheet (bottom)
function Sheet({ open, onClose, children, title, maxHeight = '85%' }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
    }}>
      <div onClick={onClose} className="anim-fade" style={{
        position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.5)',
      }} />
      <div className="anim-slide-up scroll-area" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#fff', borderRadius: '24px 24px 0 0',
        maxHeight, overflow: 'auto', WebkitOverflowScrolling: 'touch',
        paddingBottom: 'calc(28px + env(safe-area-inset-bottom))',
      }}>
        <div style={{ paddingTop: 10, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 44, height: 4, borderRadius: 2, background: '#CBD5E1' }} />
        </div>
        {title && <div style={{ fontSize: 17, fontWeight: 700, padding: '16px 20px 6px', color: '#0F172A' }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

// Mini sparkline (svg)
function Spark({ data, color = '#2563EB', height = 40, width = 110 }) {
  const min = Math.min(...data), max = Math.max(...data);
  const r = max - min || 1;
  const stepX = width / (data.length - 1);
  const pts = data.map((v, i) => [i*stepX, height - ((v-min)/r)*height*0.85 - 4]);
  const d = pts.map((p,i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const fill = d + ` L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height}>
      <defs>
        <linearGradient id={`g${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.3"/>
          <stop offset="1" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#g${color.replace('#','')})`}/>
      <path d={d} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

Object.assign(window, {
  BRANDS, getBrand, vnd, vndShort,
  PrimaryButton, GhostButton, Chip, ActionBar, ScreenHeader, Card, SectionHead,
  Input, Badge, Avatar, Toast, Sheet, Spark,
});
