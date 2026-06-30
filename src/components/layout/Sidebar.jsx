import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "../../lib/format";
import Icon from "../Icon";
import { nav } from "../../data/common";
import { useAuth } from "../../auth/AuthContext";

function Logo({ collapsed }) {
  return (
    <NavLink
      to="/"
      className={cn("block", collapsed ? "px-0" : "px-2")}
      aria-label="PipeTec IQ — Manufacturing Intelligence"
      title="PipeTec IQ — Manufacturing Intelligence"
    >
      {collapsed ? (
        // collapsed: crop to the ribbon mark only
        <span className="mx-auto grid h-11 w-11 place-items-center overflow-hidden rounded-2xl">
          <img
            src="/images/logo/New_logo.png"
            alt="PipeTec"
            className="h-11 max-w-none select-none"
            style={{ objectFit: "cover", objectPosition: "left center" }}
            draggable="false"
          />
        </span>
      ) : (
        <>
          <img
            src="/images/logo/New_logo.png"
            alt="PipeTec"
            className="w-[100px] select-none"
            draggable="false"
          />
          <div className="mt-1.5 pl-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            IQ · Manufacturing Intelligence
          </div>
        </>
      )}
    </NavLink>
  );
}

function Item({ item, disabled, collapsed, onClick }) {
  const inner = (active) => (
    <>
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-xl transition-colors",
          active
            ? "bg-brand-500 text-white"
            : "text-ink-soft group-hover:bg-brand-50 group-hover:text-brand-600",
        )}
      >
        <Icon name={item.icon} size={18} />
      </span>
      {!collapsed && (
        <>
          <span className="flex-1 whitespace-nowrap">{item.label}</span>
          {item.badge && (
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap",
                active
                  ? "bg-brand-100 text-brand-700"
                  : "bg-surface-soft text-ink-faint",
              )}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        title={collapsed ? item.label : undefined}
        className={cn(
          "group flex w-full items-center gap-3 rounded-2xl py-1.5 text-left text-sm font-medium text-ink-soft transition-colors hover:text-ink",
          collapsed ? "justify-center px-1.5" : "px-2.5",
        )}
      >
        {inner(false)}
      </button>
    );
  }

  if (disabled) {
    return (
      <div
        title={collapsed ? item.label : undefined}
        className={cn(
          "group flex cursor-not-allowed items-center gap-3 rounded-2xl py-1.5 text-sm font-medium text-ink-faint/70",
          collapsed ? "justify-center px-1.5" : "px-2.5",
        )}
      >
        {inner(false)}
      </div>
    );
  }

  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center gap-3 rounded-2xl py-1.5 text-sm font-medium transition-colors",
          collapsed ? "justify-center px-1.5" : "px-2.5",
          isActive ? "bg-brand-50/70 text-ink" : "text-ink-soft hover:text-ink",
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={cn(
              "absolute left-0 top-1/2 w-[5px] -translate-y-1/2 rounded-r-full bg-brand-600 transition-all duration-300 ease-in-out",
              isActive ? "h-8 opacity-100" : "h-0 opacity-0",
            )}
          />
          {inner(isActive)}
        </>
      )}
    </NavLink>
  );
}

function GroupLabel({ children, collapsed }) {
  if (collapsed) {
    return <div className="mx-auto my-3 h-px w-8 bg-line" />;
  }
  return (
    <div className="px-3 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
      {children}
    </div>
  );
}

export default function Sidebar({ collapsed = false, onToggle }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={cn(
        "relative z-20 flex h-full shrink-0 flex-col border-r border-line bg-surface py-5 transition-[width] duration-300 ease-in-out",
        collapsed ? "w-[88px] px-4" : "w-[268px] px-4",
      )}
    >
      <Logo collapsed={collapsed} />

      {/* collapse / expand toggle — sits on the right edge */}
      <button
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand" : "Collapse"}
        className="absolute -right-3 top-9 z-10 grid size-6 place-items-center rounded-full border border-line bg-surface text-ink-soft shadow-sm transition hover:border-brand-200 hover:text-brand-600"
      >
        <Icon name={collapsed ? "chevronRight" : "chevronLeft"} size={15} strokeWidth={2.2} />
      </button>

      <nav className="mt-4 flex-1 overflow-y-auto overflow-x-hidden pr-1">
        <GroupLabel collapsed={collapsed}>Menu</GroupLabel>
        <div className="space-y-1">
          {nav.menu.map((item) => (
            <Item key={item.id} item={item} collapsed={collapsed} />
          ))}
        </div>

        <GroupLabel collapsed={collapsed}>General</GroupLabel>
        <div className="space-y-1">
          {nav.general.map((item) =>
            item.id === "logout" ? (
              <Item key={item.id} item={item} collapsed={collapsed} onClick={handleLogout} />
            ) : (
              <Item key={item.id} item={item} disabled collapsed={collapsed} />
            ),
          )}
        </div>
      </nav>

      {/* promo card pinned to bottom (Donezo pattern) */}
      {collapsed ? (
        <button
          title="Ask PipeTec IQ Copilot"
          className="mx-auto mt-4 grid size-12 place-items-center rounded-2xl bg-brand-800 bg-wave text-white shadow-[0_10px_22px_-10px_rgba(15,61,40,0.6)] transition hover:scale-105"
        >
          <Icon name="sparkles" size={20} strokeWidth={2} />
        </button>
      ) : (
        <div className="relative mt-4 overflow-hidden rounded-3xl bg-brand-800 bg-wave p-4 text-white">
          <span className="grid size-9 place-items-center rounded-xl bg-white/15">
            <Icon name="sparkles" size={18} strokeWidth={2} />
          </span>
          <div className="mt-3 text-sm font-semibold leading-snug">
            Ask PipeTec IQ Copilot
          </div>
          <p className="mt-1 text-xs text-white/70">
            Get an instant AI brief on plant health & risk.
          </p>
          <button className="mt-3 w-full rounded-xl bg-white py-2 text-xs font-semibold text-brand-700 transition hover:bg-brand-50">
            Open Copilot
          </button>
        </div>
      )}
    </aside>
  );
}
