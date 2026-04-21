import { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { icon: "grid_view", label: "Dashboard", filled: true, active: true },
  { icon: "account_balance", label: "Investments", filled: false, active: false },
  { icon: "payments", label: "Loans", filled: false, active: false },
  { icon: "receipt_long", label: "Transactions", filled: false, active: false },
  { icon: "description", label: "Documents", filled: false, active: false },
];

const ACTIVITY = [
  {
    icon: "savings",
    bg: "bg-secondary-container",
    textColor: "text-on-secondary-container",
    title: "Interest Received",
    sub: "From 12 Active Loan Portfolios",
    amount: "+$142.30",
    amountColor: "text-secondary",
    time: "Today, 9:41 AM",
  },
  {
    icon: "payments",
    bg: "bg-primary-container",
    textColor: "text-on-primary-container",
    title: "Loan Payment Made",
    sub: "Loan #B001 (Scheduled)",
    amount: "-$520.00",
    amountColor: "text-on-surface",
    time: "Yesterday",
  },
  {
    icon: "add_business",
    bg: "bg-tertiary-fixed",
    textColor: "text-on-tertiary-fixed",
    title: "New Investment",
    sub: "Auto-invest: Green Energy Project",
    amount: "-$250.00",
    amountColor: "text-on-surface",
    time: "Apr 21, 2024",
  },
  {
    icon: "progress_activity",
    bg: "bg-surface-container-highest",
    textColor: "text-on-surface-variant",
    title: "Funding Progress",
    sub: "Tech Startup #T24 Reach 80%",
    amount: "80% Full",
    amountColor: "text-secondary",
    time: "Apr 20, 2024",
  },
];

const KYC_ITEMS = [
  "Identity Document",
  "Proof of Address",
  "Face Verification",
];

const TESTIMONIALS = [
  {
    text: "Loan@ has changed how I think about my spare capital. The hybrid view makes managing both ends of the ledger seamless.",
    name: "Sarah L., Portfolio Lead",
    style: "bg-white shadow-sm",
  },
  {
    text: "The transparency in loan grading gives me the confidence to lend to peers.",
    name: "Mark T., Small Biz Owner",
    style: "bg-surface-container-low",
  },
  {
    text: "Best rates I've found for my business expansion without the bank red tape.",
    name: "Elena R., Tech Founder",
    style: "bg-white shadow-sm border-l-2 border-primary",
  },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function Icon({ name, filled = false, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={
        filled ? { fontVariationSettings: "'FILL' 1" } : undefined
      }
    >
      {name}
    </span>
  );
}

// Mobile menu component
function MobileMenu({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Slide-out menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <span className="text-2xl font-extrabold tracking-tighter text-slate-900">Loan@</span>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Icon name="close" />
          </button>
        </div>
        
        <div className="px-6 py-4 mb-4">
          <h2 className="text-lg font-bold text-slate-900">Loan@</h2>
          <p className="text-xs text-tertiary">Premium P2P Lending</p>
        </div>
        
        <nav className="flex flex-col h-full p-4 space-y-2 text-sm">
          {NAV_LINKS.map(({ icon, label, filled, active }) => (
            <a
              key={label}
              href="#"
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 ${
                active
                  ? "bg-white text-sky-800 font-semibold shadow-sm ring-1 ring-slate-200"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Icon name={icon} filled={active && filled} />
              {label}
            </a>
          ))}
          
          <div className="mt-auto space-y-2 pb-20">
           
            <a className="flex items-center gap-3 text-slate-500 hover:bg-slate-100 transition-all px-4 py-3 rounded-lg" href="#">
              <Icon name="help_outline" /> Support
            </a>
            <a className="flex items-center gap-3 text-slate-500 hover:bg-slate-100 transition-all px-4 py-3 rounded-lg" href="#">
              <Icon name="logout" /> Sign Out
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white/85 backdrop-blur-xl text-sky-900 font-medium tracking-tight sticky top-0 z-50 border-b border-slate-200/20 flex justify-between items-center w-full px-4 sm:px-8 py-3">
        <div className="flex items-center gap-4">
          {/* Hamburger button - visible on mobile/tablet */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Icon name="menu" />
          </button>
          
          <span className="text-xl font-extrabold tracking-tighter text-slate-900">Loan@</span>
          
          <div className="hidden lg:flex items-center gap-6">
            <a className="text-sky-800 font-bold border-b-2 border-sky-800 pb-1" href="#">Hybrid</a>
            <a className="text-slate-500 hover:text-sky-700 transition-colors" href="#">Investor</a>
            <a className="text-slate-500 hover:text-sky-700 transition-colors" href="#">Borrower</a>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden sm:block">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              className="pl-10 pr-4 py-2 bg-surface-container-highest border-none rounded-lg text-sm focus:ring-1 focus:ring-primary w-48 md:w-64"
              placeholder="Search accounts..."
              type="text"
            />
          </div>
          <button className="p-2 hover:bg-slate-100 transition-colors rounded-full relative">
            <Icon name="notifications" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
          </button>
          <button className="p-2 hover:bg-slate-100 transition-colors rounded-full hidden sm:block">
            <Icon name="settings" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-container ring-1 ring-outline-variant/30 flex items-center justify-center text-on-primary-container text-xs font-bold">
            TL
          </div>
        </div>
      </nav>
      
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}

function SideNav() {
  return (
    <aside className="bg-slate-50 h-screen w-64 fixed left-0 top-0 hidden lg:flex flex-col border-r border-slate-200/20 pt-20">
      <div className="px-6 py-4 mb-4">
        <h2 className="text-lg font-bold text-slate-900">Loan@</h2>
        <p className="text-xs text-tertiary">Premium P2P Lending</p>
      </div>
      <nav className="flex flex-col h-full p-4 space-y-2 text-sm">
        {NAV_LINKS.map(({ icon, label, filled, active }) => (
          <a
            key={label}
            href="#"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 ${
              active
                ? "bg-white text-sky-800 font-semibold shadow-sm"
                : "text-slate-500 hover:bg-slate-200/50"
            }`}
          >
            <Icon name={icon} filled={active && filled} />
            {label}
          </a>
        ))}
        <div className="mt-auto space-y-2 pb-4">
          <a className="flex items-center gap-3 text-slate-500 hover:bg-slate-200/50 transition-all px-4 py-3 rounded-lg" href="#">
            <Icon name="help_outline" /> Support
          </a>
          <a className="flex items-center gap-3 text-slate-500 hover:bg-slate-200/50 transition-all px-4 py-3 rounded-lg" href="#">
            <Icon name="logout" /> Sign Out
          </a>
        </div>
      </nav>
    </aside>
  );
}

function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Investor */}
      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm ring-1 ring-outline-variant/10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs text-tertiary uppercase tracking-wider font-bold">As Investor</span>
          <Icon name="trending_up" className="text-secondary" />
        </div>
        <p className="text-3xl font-extrabold text-on-surface">$18,450</p>
        <p className="text-sm text-tertiary mb-6">Total Invested</p>
        <div className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold">
          +9.3% Avg. Annual Return
        </div>
      </div>

      {/* Borrower */}
      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm ring-1 ring-outline-variant/10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs text-tertiary uppercase tracking-wider font-bold">As Borrower</span>
          <Icon name="account_balance_wallet" className="text-primary" />
        </div>
        <p className="text-3xl font-extrabold text-on-surface">$12,000</p>
        <p className="text-sm text-tertiary mb-6">Total Borrowed</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-primary">8.5%</span>
          <span className="text-xs text-tertiary">Avg. Loan Rate</span>
        </div>
      </div>

      {/* Combined */}
      <div className="bg-primary text-on-primary p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs text-on-primary-container uppercase tracking-wider font-bold">Combined Snapshot</span>
          <Icon name="insights" />
        </div>
        <p className="text-3xl font-extrabold">+$6,450</p>
        <p className="text-sm opacity-80 mb-6">Net Worth (P2P)</p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="opacity-70">Investor: $450 available</span>
            <span className="font-bold">Next Action</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="opacity-70">Borrower: Due 4/25</span>
            <span className="font-bold">Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvestorSummary() {
  return (
    <div className="bg-surface-container-low rounded-xl p-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-on-surface">Investor Summary</h3>
          <a className="text-sm font-bold text-secondary flex items-center gap-1 hover:underline" href="#">
            Go to full Investor view <Icon name="arrow_forward" className="text-sm" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: "Portfolio", value: "23 Active Loans", style: "bg-white" },
            { label: "Principal", value: "$12,450", style: "bg-white" },
            { label: "Next Payment", value: "$410", sub: "on 04/25", style: "bg-white" },
            { label: "Alerts", value: "1 Late Loan", style: "bg-error-container text-on-error-container" },
          ].map(({ label, value, sub, style }) => (
            <div key={label} className={`p-4 rounded-lg ${style}`}>
              <p className="text-xs text-outline font-bold uppercase mb-1">{label}</p>
              <p className="text-lg font-extrabold">
                {value}{" "}
                {sub && <span className="text-xs font-normal text-tertiary">{sub}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BorrowerSummary() {
  const loans = [
    {
      id: "B001",
      title: "Loan #B001 (Business Exp.)",
      sub: "$520 monthly payment",
      iconBg: "bg-primary-fixed",
      iconColor: "text-primary",
      icon: "receipt",
      badgeStyle: "bg-secondary-container text-on-secondary-container",
      badge: "Active",
      opacity: "",
    },
    {
      id: "B002",
      title: "Loan #B002 (Home Improv.)",
      sub: "$14,500 total principal",
      iconBg: "bg-surface-container-highest",
      iconColor: "text-outline",
      icon: "home",
      badgeStyle: "bg-outline-variant/30 text-on-surface-variant",
      badge: "In Grace",
      opacity: "opacity-80",
    },
  ];

  return (
    <div className="bg-surface-container-low rounded-xl p-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-on-surface">Borrower Summary</h3>
          <a className="text-sm font-bold text-primary flex items-center gap-1 hover:underline" href="#">
            Go to full Borrower view <Icon name="arrow_forward" className="text-sm" />
          </a>
        </div>
        <div className="space-y-4">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm ${loan.opacity}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded ${loan.iconBg} flex items-center justify-center ${loan.iconColor}`}>
                  <Icon name={loan.icon} />
                </div>
                <div>
                  <p className="font-bold text-sm">{loan.title}</p>
                  <p className="text-xs text-tertiary">{loan.sub}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded font-bold ${loan.badgeStyle}`}>{loan.badge}</span>
            </div>
          ))}
          <div className="pt-2">
            <p className="text-sm font-bold text-on-surface flex items-center gap-2">
              <Icon name="calendar_today" filled className="text-primary" />
              Next automated payment: $520 on 04/25
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    {  icon: "account_balance", label: "Investor View ->", style: "bg-primary text-on-primary shadow-sm hover:opacity-90" },
    { icon: "payments", label: "Borrower view ->", style: "bg-secondary text-on-secondary shadow-sm hover:opacity-90" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 mb-12">
      {actions.map(({ icon, label, style }) => (
        <button key={label} className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${style}`}>
          <Icon name={icon} /> {label}
        </button>
      ))}
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-on-surface">Recent Activity</h3>
        <button className="text-sm text-primary font-bold hover:underline">View All</button>
      </div>
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-50 overflow-hidden">
        {ACTIVITY.map(({ icon, bg, textColor, title, sub, amount, amountColor, time }) => (
          <div key={title} className="p-5 flex items-center justify-between hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full ${bg} ${textColor} flex items-center justify-center`}>
                <Icon name={icon} />
              </div>
              <div>
                <p className="font-bold text-sm">{title}</p>
                <p className="text-xs text-tertiary">{sub}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-extrabold ${amountColor}`}>{amount}</p>
              <p className="text-xs text-outline">{time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="space-y-6">
      {/* KYC */}
      <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-outline-variant/10">
        <h3 className="text-lg font-bold text-on-surface mb-4">Account Verification (KYC)</h3>
        <div className="space-y-3">
          {KYC_ITEMS.map((item) => (
            <div key={item} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="check_circle" className="text-secondary text-lg" />
                <span className="text-sm text-tertiary">{item}</span>
              </div>
              <span className="text-[11px] font-bold text-secondary">Verified</span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-xl font-bold text-on-surface">Sanctuary Insights</h3>

      {/* Optimization tip */}
      <div className="bg-secondary/5 rounded-xl p-6 border-l-4 border-secondary">
        <div className="flex items-center gap-2 text-secondary font-bold mb-2">
          <Icon name="bolt" />
          <span className="text-sm uppercase tracking-wide">Optimization Tip</span>
        </div>
        <p className="text-sm text-tertiary leading-relaxed mb-4">
          You have <span className="font-bold text-on-surface">$450 idle cash</span>. Enabling Auto-Invest could increase your yield by approximately 1.2% this quarter.
        </p>
        <button className="text-xs font-extrabold text-secondary uppercase hover:underline">Activate Auto-Invest</button>
      </div>

      {/* Verification expiry */}
      <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm ring-1 ring-outline-variant/10">
        <div className="flex items-center gap-2 text-primary font-bold mb-4">
          <Icon name="verified" />
          <span className="text-sm uppercase tracking-wide">Verification</span>
        </div>
        <p className="text-sm text-tertiary leading-relaxed mb-4">
          Your income verification expires in <span className="text-error font-bold">12 days</span>. Update now to ensure uninterrupted borrowing capability.
        </p>
        <div className="w-full bg-surface-container rounded-full h-1.5 mb-2">
          <div className="bg-error h-1.5 rounded-full w-[80%]" />
        </div>
        <button className="w-full py-2 bg-primary-container text-on-primary-container rounded-lg text-xs font-bold mt-2">
          Update Credentials
        </button>
      </div>

      {/* Reminders */}
      <div className="bg-surface-container-high/30 p-6 rounded-xl">
        <h4 className="text-xs font-extrabold text-tertiary uppercase tracking-widest mb-4">Reminders</h4>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <Icon name="check_circle" className="text-sm mt-0.5 text-secondary" />
            <div>
              <p className="text-sm font-bold">Autopay Active</p>
              <p className="text-xs text-outline">Next: Apr 25, 2024</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Icon name="info" className="text-sm mt-0.5 text-primary" />
            <div>
              <p className="text-sm font-bold">Statement Ready</p>
              <p className="text-xs text-outline">March 2024 is available</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="mt-16 pt-12 border-t border-slate-100">
      <h3 className="text-xs text-outline uppercase tracking-[0.2em] mb-8 text-center">Community Sentiment</h3>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {TESTIMONIALS.map(({ text, name, style }) => (
          <div key={name} className={`break-inside-avoid p-6 rounded-xl ${style}`}>
            <p className="text-tertiary italic text-sm mb-4">"{text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-xs font-bold">
                {name[0]}
              </div>
              <span className="text-xs font-bold">{name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BottomNav() {
  const items = [
    { icon: "grid_view", label: "Home", active: true },
    { icon: "account_balance", label: "Invest", active: false },
    { icon: "payments", label: "Loans", active: false },
    { icon: "person", label: "Profile", active: false },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 flex justify-around items-center py-3 z-40">
      {items.map(({ icon, label, active }) => (
        <a
          key={label}
          href="#"
          className={`flex flex-col items-center gap-1 ${active ? "text-primary" : "text-slate-400"}`}
        >
          <Icon name={icon} filled={active} />
          <span className="text-[10px] font-bold">{label}</span>
        </a>
      ))}
    </nav>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HybridDashboard() {
  return (
    <div className="bg-surface text-on-surface min-h-screen font-body pb-16 md:pb-0">
      <TopNav />
      <SideNav />

      <main className="lg:ml-64 p-4 sm:p-8 min-h-screen">
        {/* Welcome */}
        <header className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-background tracking-tight">
            Welcome back, Taylor{" "}
            <span className="text-primary-container mx-2">●</span>{" "}
            <span className="font-medium text-sm sm:text-lg text-tertiary">Member since Mar 2022</span>
          </h1>
        </header>

        <SummaryCards />

        {/* Detail sections */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          <InvestorSummary />
          <BorrowerSummary />
        </div>

        <QuickActions />

        {/* Activity + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RecentActivity />
          <Sidebar />
        </div>

        <Testimonials />
      </main>

      <BottomNav />
    </div>
  );
}