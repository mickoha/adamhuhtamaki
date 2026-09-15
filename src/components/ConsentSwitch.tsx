import { ANALYTICS_SWITCH_LABEL } from '@/data/cookies';

/**
 * The analytics toggle. One component, two mounts — the settings dialog and
 * the /evastekaytannot page — because a visitor who sees the same control in
 * two places must never see it in two states.
 *
 * It is a real checkbox at opacity 0 filling the label, with the track and
 * knob drawn beneath it (`.site-switch` in globals.css), so keyboard
 * operation, the switch role and the system's focus ring all come for free.
 */
interface Props {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
}

export default function ConsentSwitch({
  checked,
  onChange,
  label = ANALYTICS_SWITCH_LABEL,
}: Props) {
  return (
    <label className="site-switch">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        aria-label={label}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="knob" aria-hidden="true" />
    </label>
  );
}
