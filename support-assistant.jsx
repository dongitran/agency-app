// support-assistant.jsx — floating support launcher and bottom-sheet support flows

const SUPPORT_FAQS = [
  { q: 'Không nhận được mã OTP?', a: 'Kiểm tra lại số điện thoại/email, chờ 60 giây rồi gửi lại. Nếu vẫn lỗi, mở chat để CSKH kiểm tra.' },
  { q: 'Không đăng nhập được?', a: 'Đảm bảo mật khẩu gồm đúng 6 số. Nếu quên mật khẩu, dùng mục Quên mật khẩu ở màn hình đăng nhập.' },
  { q: 'Không tạo được tài khoản?', a: 'Bạn cần chọn đúng số điện thoại hoặc email, nhập OTP sở hữu tài khoản, tạo mật khẩu và đồng ý điều khoản.' },
];

function SupportAssistant({ brand, bottomOffset = 24 }) {
  const b = getBrand(brand);
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState('menu');
  const [draft, setDraft] = React.useState('');
  const [messages, setMessages] = React.useState([
    { from: 'agent', text: 'Agency xin chào, mình có thể hỗ trợ bạn đăng nhập, tạo tài khoản hoặc chọn SIM.' },
  ]);

  const openMenu = () => {
    setView('menu');
    setOpen(true);
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((items) => [
      ...items,
      { from: 'user', text },
      { from: 'agent', text: 'Mình đã nhận thông tin. Chuyên viên sẽ phản hồi trong ít phút.' },
    ]);
    setDraft('');
  };

  return (
    <>
      <button aria-label="Mở hỗ trợ" onClick={openMenu} className="tap" style={{
        position: 'absolute', right: 18, bottom: bottomOffset, zIndex: 72,
        width: 58, height: 58, borderRadius: 22, border: '1px solid rgba(255,255,255,0.9)',
        background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})`,
        boxShadow: `0 16px 34px -14px ${b.grad[0]}cc, 0 8px 20px rgba(15,23,42,0.18)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
      }}>
        <SupportAgentSvg brand={brand}/>
        <span style={{ position: 'absolute', top: 7, right: 8, width: 9, height: 9, borderRadius: 9, background: '#22C55E', border: '2px solid #fff' }} />
      </button>

      <SupportSheet open={open} view={view} onClose={() => setOpen(false)} onBack={view === 'menu' ? null : () => setView('menu')}>
        {view === 'menu' && <SupportMenu brand={brand} onChat={() => setView('chat')} onHelp={() => setView('help')} />}
        {view === 'chat' && <SupportChat brand={brand} draft={draft} messages={messages} onDraft={setDraft} onSend={sendMessage} />}
        {view === 'help' && <SupportHelp brand={brand} />}
      </SupportSheet>
    </>
  );
}

function SupportSheet({ open, view, onClose, onBack, children }) {
  if (!open) return null;
  const height = view === 'menu' ? '32%' : '44%';
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 95 }}>
      <div onClick={onClose} className="anim-fade" style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.34)' }} />
      <div className="anim-slide-up" style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height, minHeight: view === 'menu' ? 248 : 338,
        background: '#fff', borderRadius: '24px 24px 0 0', boxShadow: '0 -18px 44px rgba(15,23,42,0.18)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '10px 18px 8px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            <div style={{ width: 42, height: 4, borderRadius: 4, background: '#CBD5E1' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {onBack && <button aria-label="Quay lại hỗ trợ" onClick={onBack} className="tap" style={sheetIconButton}><Ic.Back s={18}/></button>}
            <div style={{ flex: 1, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>Hỗ trợ</div>
            <button aria-label="Đóng hỗ trợ" onClick={onClose} className="tap" style={sheetIconButton}><Ic.Close s={18}/></button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function SupportMenu({ brand, onChat, onHelp }) {
  return (
    <div style={{ padding: '16px 18px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SupportOption icon={<Ic.User s={22}/>} title="Liên hệ Chăm sóc khách hàng" desc="Chat trực tiếp với chuyên viên Agency" brand={brand} onClick={onChat}/>
      <SupportOption icon={<Ic.Book s={22}/>} title="Trung tâm trợ giúp" desc="Câu hỏi thường gặp khi đăng nhập và tạo tài khoản" brand={brand} onClick={onHelp}/>
    </div>
  );
}

function SupportOption({ icon, title, desc, brand, onClick }) {
  const b = getBrand(brand);
  return (
    <button onClick={onClick} className="tap" style={{
      border: '1px solid #E2E8F0', background: '#fff', borderRadius: 18, padding: 14,
      display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
    }}>
      <span style={{ width: 42, height: 42, borderRadius: 14, background: b.soft, color: b.solid, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{title}</span>
        <span style={{ display: 'block', fontSize: 12, color: '#64748B', marginTop: 3, lineHeight: 1.35 }}>{desc}</span>
      </span>
      <Ic.Chevron s={15} c="#94A3B8"/>
    </button>
  );
}

function SupportChat({ brand, messages, draft, onDraft, onSend }) {
  const b = getBrand(brand);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div className="scroll-area" style={{ flex: 1, overflow: 'auto', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start', maxWidth: '82%',
            padding: '10px 12px', borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            background: msg.from === 'user' ? b.solid : '#F1F5F9', color: msg.from === 'user' ? '#fff' : '#0F172A',
            fontSize: 12.5, lineHeight: 1.45, fontWeight: 600,
          }}>{msg.text}</div>
        ))}
      </div>
      <div style={{ padding: '10px 18px 18px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: 8 }}>
        <input aria-label="Nhập nội dung chat" value={draft} onChange={(e) => onDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }} placeholder="Nhập nội dung..." style={{ flex: 1, border: '1.5px solid #E2E8F0', borderRadius: 14, padding: '0 12px', fontSize: 13, outline: 'none' }}/>
        <button aria-label="Gửi chat" onClick={onSend} className="tap" style={{ width: 46, border: 'none', borderRadius: 14, background: b.solid, color: '#fff', fontWeight: 800 }}>Gửi</button>
      </div>
    </div>
  );
}

function SupportHelp({ brand }) {
  const b = getBrand(brand);
  return (
    <div className="scroll-area" style={{ padding: '14px 18px 24px', overflow: 'auto' }}>
      {SUPPORT_FAQS.map((item) => (
        <div key={item.q} style={{ padding: '13px 0', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: b.solid }}>{item.q}</div>
          <div style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.5, marginTop: 5 }}>{item.a}</div>
        </div>
      ))}
    </div>
  );
}

function SupportAgentSvg({ brand }) {
  const b = getBrand(brand);
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
      <circle cx="21" cy="21" r="19" fill="rgba(255,255,255,0.2)"/>
      <path d="M10 34c1.8-6 6-9 11-9s9.2 3 11 9" fill="#fff" opacity="0.95"/>
      <circle cx="21" cy="18" r="8" fill="#FDE68A"/>
      <path d="M12.5 18c0-6 3.5-10 8.5-10s8.5 4 8.5 10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
      <path d="M13 17.5h2.5v6H13a3 3 0 0 1 0-6zM26.5 17.5H29a3 3 0 0 1 0 6h-2.5z" fill={b.solid}/>
      <path d="M27 24c-1.1 2.4-3.1 3.6-6 3.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="21" cy="27.6" r="1.5" fill="#fff"/>
      <path d="M17 18.5h.1M25 18.5h.1" stroke="#0F172A" strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M18 22c1.8 1.3 4.2 1.3 6 0" fill="none" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

const sheetIconButton = {
  width: 34, height: 34, borderRadius: 12, border: 'none', background: '#F1F5F9',
  color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center',
};

Object.assign(window, { SupportAssistant });
